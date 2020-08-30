<style>
    header {
        background: rgb(0, 40, 70);
        width: 100%;
        margin: 0 0 6px 0;
        transform: translate(0, -18px);
        transition: transform 300ms ease-out;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 100;
    }

    header:hover {
        transform: translate(0, 0);
    }

    header.focused {
        transform: translate(0, 0);
    }

</style>

<script>
    import PlayerForm from './PlayerForm.svelte';

    let focused = false;

    $: headerClass = focused ? 'focused' : '';

    const toggleFocus = status => {
        console.log('header toggleFocus!', status.detail);
        focused = status.detail === 'focused';
    };

</script>


<header class={headerClass}>
    <PlayerForm header on:focusToggle={toggleFocus} />
</header>