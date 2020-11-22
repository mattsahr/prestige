<style>

    .turn-state {
        min-height: 200px;
        padding: 4px 32px 16px 30px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        /*      
        background: #b4f0c8;
        background: radial-gradient(circle, #b4f0c8 0%, #a0dcb4 67%, #78c8a0 100%);
        */
        background: rgb(20,60,90);
        background: radial-gradient(
            circle, 
            rgba(30, 70, 100, 1) 0%, 
            rgba( 0, 40,  70, 1) 64%, 
            rgba( 0, 30,  60, 1) 100%
        );
        color: rgba(220, 220, 220);
    }

    .close-me {
        position: absolute;
        z-index: 10;
        top: -10px;
        right: -9px;
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
        padding: 28px 0 20px 0;
        width: 100%;
        margin: 0 0 24px 0;
        border: solid rgba(255, 255, 255, 0.1);
        border-width: 0 0 1px 0;
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

    .dice-inset {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 2px;
        border-radius: 3px;
    }

    .dice-inset > div {
        transform: scale(0.9);
    }


</style>

<script>
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import { modalUX, turns } from '../../store/store';
    import { hydrateTurns, dummyTurn } from '../../utility/helpers';
    import Dice from '../Dice.svelte';
    import { onMount } from 'svelte';
    import OpponentTargetLink from './OpponentTargetLink.svelte';

    export let handleClosePanel = () => false;

    let increment = 0;

    /*
    const DOM = {
        wrapper: null
    };
    */

    $: era = $modalUX.turnState.era;
    $: rolls = $modalUX.turnState.rolls;
    $: turnCount = $modalUX.turnState.turnCount;
    $: localTurns = $turns ? hydrateTurns($turns.played) : dummyTurn;
    $: currentIndex = localTurns.length - 1;
    $: currentView = localTurns[currentIndex];

    const getWrapClass = () => {
        console.log('TURNS', turns);
        console.log('$TURNS', $turns);
        return 'turn-state';
    };

    const ping = () => {
        increment++;
    };

    onMount(ping);

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


    {#if era.targetPlayer}
        <div class="message">
            <OpponentTargetLink closeParent={handleClosePanel} />
        </div>
    {/if}

    <div class="dice-inset">
        <div>
            <Dice
                currentTurn={currentIndex} 
                diceRolls={currentView.dice} 
                rules={currentView.rules} />
        </div>
    </div>

</div>
