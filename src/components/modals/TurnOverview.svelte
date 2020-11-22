<style>

    .turn-overview {
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
        padding: 4px 0 6px 0;
    }

    .turn-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .turn {
        width: 48%;
        max-width: 130px;
        margin: 0 0 16px 0;
        border-radius: 4px;
        padding: 4px 4px 8px 4px;
        font-size: 13px;
        line-height: 20px;
        box-shadow: 2px 2px 6px rgba(0, 70, 60, 0.4);
        position: relative;
        border: solid 3px transparent;
    }

    .turn.played, .turn.imminent.played {
        background-color: rgb(170, 220, 190);
        opacity: 0.9;
        box-shadow: 2px 2px 4px rgba(0, 20, 10, 0.1);
    }

    .turn.imminent.unplayed  {
        border-color: rgb(250, 160, 30);
    }


    .turn.unplayed {
        background: rgb(245, 245, 245);
    }

    .era-name {
        font-weight: bold;
        font-size: 1.1em;
        line-height: 18px;
        background: rgba(205, 215, 210, 0.5);
        padding: 8px 7px 6px 7px;
        margin: -7px -7px 6px -7px;
    }

    .turn.played .era-name {
        background: rgba(210, 240, 230, 0.3);
    }

    .turn.imminent.unplayed .era-name {
        background: rgba(200, 140, 80, 0.2);
    }

    .turn .hovering {
        display: none;
        position: absolute;
        z-index: 10;
        bottom: 0px;
        left: 0;
        right: 0;
        text-align: center;
        opacity: 1;
        letter-spacing: 0.02em;        
    }

    .turn.imminent.unplayed:hover .hovering {
        display: block;
        color: rgb(190, 100, 0);
        font-size: 17px;
        background: rgba(255, 255, 255, 0.9);
        padding: 12px 0 4px 0;
    }

    .turn.played:hover .hovering {
        display: block;
        font-size: 29px;
        font-weight: bold;
        text-align: center;
        opacity: 0.8;
        color: rgb(220, 240, 230);
        letter-spacing: 1px;
        padding: 0 0 4px 0;
    }

    @media all and (max-width: 452px) {
        .turn {
            max-width: 220px;
        }
    }

</style>

<script>
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import { gStore, modalUX, turns } from '../../store/store';
    import { ERA_META, PRE_GAME_ZERO_ERA } from '../../utility/constants';
    import _cloneDeep from 'lodash/cloneDeep';

    export let handleClosePanel = () => false;
    export let modal = false;

    const sortByEra = (A, B) => {
        if (A.era < B.era) { return -1; }
        return 1;
    };

    const expansions = gStore.expansions || [];
    const eras = _cloneDeep(ERA_META)
        .filter(era => era.era_id !== PRE_GAME_ZERO_ERA)
        .filter(era => era.expansion ? expansions.includes(era.expansion) : true)
        .sort(sortByEra);

    const composeTurnPanels = (turns, eraSource) => {
        const { priorUnplayed } = turns;
        // const eras = _cloneDeep(eraSource);
        const delivery = [];


        for (const era of eraSource) {
            if (priorUnplayed.includes(era.era_id)) {
                delivery.push({ ...era, imminent: true });
            } else {
                delivery.push(era);
            }
        }

        return delivery;
    };

    $: turnPanels = composeTurnPanels($turns, eras);
    $: fullDeck = [ ...$turns.deck, ...$turns.sideboard ];

    const getWrapClass = () => {
        console.log('TURNS', turns);
        console.log('$TURNS', $turns);
        return modal ? 'turn-overview' : 'sidebar turn-overview' ;
    };

    const getTurnClass = era => {
        return 'turn' + 
            (era.imminent ? ' imminent' : '') + 
            (fullDeck.includes(era.era_id) ? ' unplayed' : ' played');
    };

    const hoverMessage = era => {
        if (!fullDeck.includes(era.era_id)) {
            return 'PLAYED';
        }

        if (era.imminent) {
            return 'Guaranteed by turn ' + ((Math.floor(($turns.played.length - 1) / 12) * 12) + 12);
        }

        return '';
    };

</script>


<div class={getWrapClass()}>
    <div class="close-me" on:click={handleClosePanel}><div class="inner"><MdClose /></div></div>
    <div class="header">Turns Upcoming</div>
    <div class="turn-container">
        {#each turnPanels as turn}
            <div class={getTurnClass(turn)}>
                <div class="era-name">{turn.era}</div>
                <div class="era-description">{@html turn.description}</div>
                <div class="hovering">{hoverMessage(turn)}</div>
            </div>
        {/each}
    </div>
</div>
