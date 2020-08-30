<style>
    .game-title {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    h1 {
        font-family: 'Lalezar';
        color: rgb(120, 50, 10);
        font-size: min(36px, 8vw);
        line-height: 1;
        padding: 0 0 0 12px;
        margin: 0;
        text-shadow: 3px 3px 6px rgba(255, 255, 255, 0.15);
    }

    .input-section {
        padding: 0 4px;
    }

    .title {
        font-family: 'Lalezar';
        color: rgb(20, 80, 120);
        font-size: 14px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        line-height: 1;
        padding: 8px 0 2px 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    input {
        font-size: min(calc(20px), calc(3.8vw));
        padding: 2px 2px 0 0;
        padding-left: min(calc(10px), calc(2.6vw));
        width: 100%;
        border: 0;
        box-sizing: border-box;
        height: 34px;
        line-height: 1;
    }

    .focused input {
        border-radius: 3px;
    }

    input:focus {
        outline: none !important; 
    }

    input::placeholder {
        font-size: 0.9em;
        line-height: 1;
        opacity: 0.5;
    }

    .modal-controls-wrap {
        background: rgb(200, 90, 0);
        background-image: url('/images/textures/back-pattern.png');
        margin: -12px;
        border-radius: 4px;
        padding: 32px;
        padding-top: max(32px, 4vh);
        padding-right: min(48px, 5vw);
        padding-bottom: max(32px, 4vh);
        padding-left: min(48px, 5vw);
        box-sizing: border-box;
        border: solid rgb(240, 220, 210) 3px;
    }

    .modal-controls-wrap .input-section {
        width: 100%;
    }

    .modal-controls-wrap .title {
        color: rgb(110, 60, 20);
        padding: 20px 0 4px 10px;
        text-shadow: 0 0 10px rgba(250, 250, 250, 0.4);
    }

    .message {
        margin: 16px 0 10px 4px;
        padding: 16px 8px 8px 26px;
        background: rgba(50, 32, 16, 0.7);
        color: rgb(220, 220, 220);
        font-size: 14px;
        border: solid 1px rgb(40, 20, 0);
        border-radius: 4px;
    }

    .message span.game-name {
        font-size: 1.2em;
        font-weight: bold;
    }

    .modal-controls-wrap .focused .title {
        color: rgb(70, 40, 40);
    }

    .modal-controls-wrap input {
        background: rgb(230, 230, 230, 0.8);
        color: rgb(70, 40, 0);
    }

    .modal-controls-wrap .focused input {
        background: rgba(240, 240, 240, 0.9);
        color: rgb(30, 10, 0);
    }

    .action-buttons {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    .action-buttons button  {
        background: rgb(250, 190, 80);
        margin: 40px 0 0 0;
    }

    .action-buttons.midway button {
        margin: 20px 0 20px -26px;
    }

</style>


<script>
    import { createEventDispatcher } from 'svelte';
    import { gStore, modalUX } from '../store/store.js';

    const dispatch = createEventDispatcher();
    const handlePlayOffline = () => dispatch('playOffline');

    export let createGameName = '';
    export let rosterName = '';
    export let focused = false;

    $: inputSectionClass = 'input-section' + (focused ? ' focused ' + focused : '');
    $: ready = rosterName && rosterName.length > 1;
    $: localPlayer = gStore.player.getLocal();

    const handleGameInit = () => { 
        modalUX.chooseGoals(createGameName);
    };

    const handleGameJoin = () => { 
        console.log('handleGameJoin', rosterName);
        console.log('localPlayer!', localPlayer);
        gStore.player.updateLocal(localPlayer.name, localPlayer.city, rosterName);
    };

</script>

<div class="modal-controls-wrap">

    <div class="app-title">
        <h1>Cosmo·Polix</h1>
    </div>

    <div class="message">
        <div>The game <span class="game-name">"{createGameName}"</span> does not exist yet.</div>
        <div class="action-buttons midway">
            <button on:click={handleGameInit}>Start New Game</button>
        </div>
    </div>


    <div class={inputSectionClass}>
        <div class="title">Join another Game</div>
        <input bind:value={rosterName} placeholder="Game Name" />
    </div>

    <div class="action-buttons">
        <button disabled={!ready} on:click={handleGameJoin}>Join Game</button>
        <button on:click={handlePlayOffline}>Play Offline</button>
    </div>

</div>
