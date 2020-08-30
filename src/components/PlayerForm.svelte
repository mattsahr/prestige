<style>

    .app-title {
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

    /* ----- HEADER SECTION -------------- */

    .header-controls-wrap {
        width: calc(100vmin - 48px);
        max-width: 860px;
        height: 66px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }

    .header-controls-wrap .name {
        display: none;
    }

    .header-controls-wrap .input-section {
        width: calc(28% - 14px);
    }

    .header-controls-wrap .input-section.city-name {
        width: calc(40% - 14px);
    }

    .header-controls-wrap input {
        background: rgba(255, 255, 255, 0.05);
        color: rgb(80, 130, 160);
    }

    .header-controls-wrap .focused input {
        background: rgba(255, 255, 255, 0.1);
        color: rgb(200, 230, 250);
    }

    .header-controls-wrap .focused .title {
        color: rgb(70, 130, 150);
    }

    .header-controls-wrap .input-section { transition: width 300ms; }
    .header-controls-wrap .input-section.focused { width: 20%; }
    .header-controls-wrap .input-section.focused.player-name.player-focused { width: 58%; }
    .header-controls-wrap .input-section.focused.player-name.player-focused { width: 58%; }
    .header-controls-wrap .input-section.focused.city-name.city-focused { width: 58%; }
    .header-controls-wrap .input-section.focused.game-name.game-focused { width: 58%; }


    .header-icon {
        padding: 2px 10px;
        margin: 25px -4px 0 12px;
        opacity: 0.7;
        width: 52px;
        height: 40px;
        color: rgb(255,255,255);
        cursor: pointer;
    }

    .header-icon:hover {
        opacity: 1;
    }

    /* ----- MODAL SECTION -------------- */

    .modal-controls-wrap {
        display: flex;
        flex-wrap: wrap;
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

    .modal-controls-wrap .focused .title {
        color: rgb(70, 40, 40);
    }

    .modal-controls-wrap input {
        background: rgb(230, 230, 230, 0.8);
        color: rgb(70, 40, 0);
        box-shadow: 2px 4px 11px rgba(100, 60, 0, 0.3);
    }

    .modal-controls-wrap .focused input {
        background: rgba(240, 240, 240, 0.9);
        color: rgb(30, 10, 0);
    }

    .go-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .go-button button  {
        background: rgb(250, 190, 80);
        margin: 20px 0 0 8px;
    }

    /* ------------ RESPONSIVE --------------- */

    @media all and (max-width: 419px), (max-height: 419px) {
        .header-controls-wrap {
            width: 96vmin;
        }

        .header-controls-wrap .input-section { transition: width 300ms; }
        .header-controls-wrap .input-section.focused { width: 8%; }
        .header-controls-wrap .input-section.focused.player-name.player-focused { width: 84% };
        .header-controls-wrap .input-section.focused.player-name.player-focused { width: 84% };
        .header-controls-wrap .input-section.focused.city-name.city-focused { width: 84% };
        .header-controls-wrap .input-section.focused.game-name.game-focused { width: 84% };

        .header-controls-wrap .input-section.focused .title { opacity: 0; }
        .header-controls-wrap .input-section.focused.player-name.player-focused .title { opacity: 1; }
        .header-controls-wrap .input-section.focused.player-name.player-focused .title { opacity: 1; }
        .header-controls-wrap .input-section.focused.city-name.city-focused .title { opacity: 1; }
        .header-controls-wrap .input-section.focused.game-name.game-focused .title { opacity: 1; }

    }
    

</style>

<script>
    import { createEventDispatcher } from 'svelte';
    import IoIosOptions from 'svelte-icons/io/IoIosOptions.svelte';
    import { 
        adminUX, 
        gStore, 
        localPlayerName, 
        localCityName, 
        rosterName 
    } from '../store/store.js';
    import { DEFAULT_CITY_NAME, DEFAULT_PLAYER_NAME } from '../utility/constants';

    const focusDispatch = createEventDispatcher();

    export let header = false;
    export let modal = false;
    export let playerName = '';
    export let currentRosterName = '';
    export let cityName = '';
    export let focused = '';


    if (header) {
        localPlayerName.subscribe(nextName => {
            if (nextName !== DEFAULT_PLAYER_NAME && nextName !== playerName) {
                playerName = nextName;
            }
        });

        localCityName.subscribe(nextCityName => {
             if (nextCityName !== DEFAULT_CITY_NAME && nextCityName !== cityName) {
                cityName = nextCityName;
            }
        });

        rosterName.subscribe(nextRosterName => {
             if (nextRosterName !== currentRosterName) {
                currentRosterName = nextRosterName;
            }
        });

    }

    let fullWidth = 420;

    $: inputSectionClass = 'input-section' + (focused ? ' focused ' + focused : '');
    $: ready = playerName && playerName.length > 1 &&
        currentRosterName && currentRosterName.length > 1 &&
        cityName && cityName.length > 1;

    const dispatch = createEventDispatcher();
    const handlePlayOffline = () => dispatch('playOffline');
    const deFocus = () => { 
        focused = false; 
        focusDispatch('focusToggle', 'unfocused');
    };

    const handlePlayerName = () => {
        deFocus();
        console.log('playerName!', playerName, cityName, currentRosterName);
        if (header && playerName && cityName && currentRosterName) { 
            gStore.player.updateLocal(playerName, cityName, currentRosterName); 
        }
    };

    const handleCityName = () => {
        deFocus();
        console.log('cityName!', playerName, cityName, currentRosterName);
        if (header && playerName && cityName && currentRosterName) { 
           gStore.player.updateLocal(playerName, cityName, currentRosterName); 
        }
    };

    const handleRosterName = () => {
        deFocus();
        console.log('currentRosterName!', playerName, cityName, currentRosterName);
        if (header && playerName && cityName && currentRosterName) { 
           gStore.player.updateLocal(playerName, cityName, currentRosterName); 
        }
    };

    const handleGameInit = () => {
        console.log('game Init!', playerName, cityName, currentRosterName);
        if (playerName && cityName && currentRosterName) { 
            gStore.player.updateLocal(playerName, cityName, currentRosterName);
        }
    };

    const handleFocus = target => () => {
        focused = target;
        focusDispatch('focusToggle', 'focused');
    };

    const handleMenuClick = () => {
        console.log('menu button clicked!');
        adminUX.toggleDrawer();
    };

    const wrapClass = header 
        ? 'header-controls-wrap' 
        : modal 
            ? 'modal-controls-wrap'
            : 'player-form-wrap';

    const noOp = () => {};
    const handleKeydown = modal => !modal ? noOp : event => {
        if (event.keyCode === 13 && 
            event.target.nodeName === 'INPUT' &&
            event.target.getAttribute('data') === 'return-proceed'
        ){
            handleGameInit();
        }
    };

</script>

<svelte:window on:keydown={handleKeydown(modal)}/>

<div class={wrapClass} bind:clientWidth={fullWidth}>

    {#if modal}
        <div class="app-title">
            <h1>Prestige Cities</h1>
        </div>
    {/if}

    <div class={inputSectionClass + ' player-name'}>
        <div class="title">Player <span class="name">Name</span></div>
        <input bind:value={playerName}
            on:blur={handlePlayerName} on:focus={handleFocus('player-focused')} />
    </div>

    <div class={inputSectionClass + ' city-name'}>
        <div class="title">City <span class="name">Name</span></div>
        <input bind:value={cityName}
            on:blur={handleCityName} on:focus={handleFocus('city-focused')} />
    </div>

    <div class={inputSectionClass + ' game-name'}>
        <div class="title">Game <span class="name">Name</span></div>
        <input bind:value={currentRosterName} data="return-proceed"
            on:blur={handleRosterName} 
            on:focus={handleFocus('game-focused')} />
    </div>

    {#if header}
    <div class="header-icon" on:click={handleMenuClick}>
        <IoIosOptions />
    </div>
    {:else}
        <div class="go-button">
            <button disabled={!ready} on:click={handleGameInit}>Join Game</button>
            <button on:click={handlePlayOffline}>Play Offline</button>
        </div>
    {/if}

</div>
