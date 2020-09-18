<style>

    .turn-state {
        min-height: 200px;
        padding: 0 10px 10px 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        background: #b4f0c8;
        background: radial-gradient(circle, #b4f0c8 0%, #a0dcb4 67%, #78c8a0 100%);
    }

    .close-me {
        position: absolute;
        z-index: 10;
        top: -14px;
        right: -12px;
        opacity: 1;
        color: rgb(80, 150, 150);
        cursor: pointer;
        width: 36px;
        height: 32px;
        overflow: hidden;
        border: solid 1px rgba(255, 255, 255, 1);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 13px;
    }

    .close-me .inner {
        padding: 0;
        width: 32px;
        height: 36px;
    }

    .close-me:hover {
        color: rgb(0, 70, 80);
        opacity: 1;
    }

    .header {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.01em;
        text-align: center;
        text-transform: uppercase;
        padding: 4px 0 6px 0;

    }

    .header span {
        margin: 0 2px;
    }

    .header span.turn-count {
        font-size: 0.85em;
    }

    .message {
        margin: 4px 0 8px;
    }


</style>

<script>
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import { modalUX, turns } from '../../store/store';
    import _cloneDeep from 'lodash/cloneDeep';

    export let handleClosePanel = () => false;

    $: era = $modalUX.turnState.era;
    $: rolls = $modalUX.turnState.rolls;
    $: turnCount = $modalUX.turnState.turnCount;

    const getWrapClass = () => {
        console.log('TURNS', turns);
        console.log('$TURNS', $turns);
        return 'turn-state';
    };


</script>


<div class={getWrapClass()}>
    <div class="close-me" on:click={handleClosePanel}><div class="inner"><MdClose /></div></div>
    <div class="header">
        <span class="turn-count">Turn {turnCount}:</span>
        <span>{era.era}</span>
    </div>
    <div class="message">{@html era.description}</div>
    {#if era.description2}
        <div class="message">{@html era.description2}</div>
    {/if}
</div>
