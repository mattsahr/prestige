<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(150, 190, 210, 0.8);
        background-image: url('../..//textures/billie-holiday.png');
         /* rgba(60, 66, 70, 0.9); */
        z-index: 1999;
    }

    .modal {
        position: absolute;
        left: 50%;
        top:48%;
        width: 96vw;
        max-width: 480px;
        max-height: 90vh;
        overflow: auto;
        transform: translate(-50%,-50%);
        padding: 12px;
        border-radius: 4px;
        background: white;
        z-index: 2001;
        box-shadow: 8px 20px 40px rgba(0, 0, 0, 0.5);
    }

</style>

<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

    let modal = {};
    export let zPlane = 0;

    const bgStyle = zPlane ? ('z-index: ' + zPlane) : '';
    const style = zPlane ? ('z-index:' + (zPlane + 2)) : '';

    const handle_keydown = e => {
        if (e.key === 'Escape') {
            close();
            return;
        }

        if (e.key === 'Tab') {
            // trap focus
            const nodes = modal.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            tabbable[index].focus();
            e.preventDefault();
        }
    };

    const previously_focused = typeof document !== 'undefined' && document.activeElement;

    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" in:fade out:fade on:click={close} style={bgStyle}></div>

<div class="modal" 
    role="dialog" 
    aria-modal="true" 
    bind:this={modal} 
    in:fade out:fade
    style={style}>
        <slot></slot>
</div>
