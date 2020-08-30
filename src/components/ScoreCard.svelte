<style>

    .main-score-card {
        width: 100%;
        display: flex;
        cursor: default;
        width: calc(100%);
        margin: 0 auto;
        border: solid rgb(140, 190, 220);
        border-width: 4px 0 4px 0;
        border-radius: 0;
        position: relative;
        z-index: 20;
    }

    .score-panel {
        position: relative;
        display: flex;
        align-items: center;
        width: 24%;
        height: 54px;
        font-size: min(17px, calc(2.3vmin + 8px));
        flex-wrap: wrap;
        border: solid 1px rgb(220, 220, 220);
        border-width: 0 1px 0 0;
        padding: 2px 0 4px 0;
        background-color: rgb(252, 252, 250);
    }

    .overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
    }

    .score-panel:first-of-type {
        border-left-width: 1px;
    }

    .label {
        width: 99%;
        font-size: 0.7em;
        min-width: 40px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-transform: uppercase;
        letter-spacing: -0.05em;
        text-align: right;
        opacity: 0.5;
        padding: 0;
        padding-right: min(8px, 1.4vw);
        color: rgb(60, 60, 60);
    }

    .number {
        width: 99%;
        opacity: 0.3;
        color: red;
        text-align: right;
        padding: 0;
        padding-right: min(8px, 1.4vw);        
        font-size: 1.3em;
        height: 11vw;
        max-height: 36px;
    }

    .active .label, .bonus .label, .total .label,
    .active .number, .bonus .number, .total .number {
        opacity: 1;
        color: rgb(60, 60, 60);
    }

    input {
        width: 99%;
        height: 11vw;
        max-height: 36px;
        text-align: right;
        padding: 0;
        font-size: 1.3em;
        border-width: 0;
    }

    input:focus {
        outline: none !important; 
    }

</style>

<script>
    import { onMount } from 'svelte';
    import { gStore, modalUX } from '../store/store.js';
    import { shouldScore } from '../utility/scores.js';
    import { getRandomGoals, hydrateGoals, updateTurns, hydrateTurns } from '../utility/helpers';
    import tippy from "sveltejs-tippy";

    const tippyProps = {
        content: 'Highest score does not count for total.',
        placement: "bottom",
        delay: [600, 200],
        theme: 'light',
        animation: 'shift-away'
    };

    export let board = null;
    export let opponent = false;
    export let bonus = 0;

    $: score = gStore.get.score(board && board._id);

    const handleBonus = () => {
        console.log('handleBonus!', bonus, score);
        gStore.board.updateBonus(bonus);
    };

    const getWrapperClass = () => opponent ? 'opponent-score-card' : 'main-score-card';

    $: scoreCulture = shouldScore('culture', score);
    $: scoreHappiness = shouldScore('happiness', score);
    $: scoreWealth = shouldScore('wealth', score);

    $: classCulture = 'score-panel culture' + (scoreCulture ? ' active' : '');
    $: classHappiness = 'score-panel happiness' + (scoreHappiness ? ' active' : '');
    $: classWealth = 'score-panel wealth' + (scoreWealth ? ' active' : '');


    const createLoggers = () => {
        if (window) {

            window.I =  window.I || {};
            window.I.log = () => { 
                console.log('------- modalUX ---------');
                console.log($modalUX);
                console.log('------- GSTORE ---------');
                console.log($gStore); 
                console.log('    ');
                if (window.I.dice) {
                    console.log('----- DICE -------');
                    window.I.dice();
                }
            };

            window.I.goals = () => {
                const { goalObjects, goalCodes } = getRandomGoals();
                console.groupCollapsed('GOALS');
                console.log(
                    'GOAL TYPES!  ',
                    goalObjects
                        .map(goal => goal.bonusGroup)
                        .filter(goal => goal)
                        .join(', ')
                );
                console.log('Goal Codes!', goalCodes);
                console.log('original', goalObjects.map(goal => goal.title));
                console.log('hydrated', hydrateGoals(goalCodes).map(goal => goal.title));
                console.groupEnd();
                return goalObjects;
            };

            window.I.turns = () => {
                const tests = {};

                console.groupCollapsed('TURNS');

                for (let i = 0; i < 28; i++) {
                    const prior = i === 0 ? undefined : tests['turn_' + (i - 1)];
                    const test = tests['turn_' + i] = updateTurns(prior);

                    console.log('------------[  ' + i + '  ]------------');
                    console.log('sideboard ' + i +'  | ', test.sideboard);
                    console.log('deck      ' + i +'  | ', test.deck);
                    console.log('played    ' + i +'  | ', test.played);
                }

                const hydrated = hydrateTurns(tests.turn_5);

                console.log('------------[  Hydrated  ]------------');
                console.log(hydrated);
                console.groupEnd();
            };

        }
    };

    onMount(createLoggers);

</script>


<div class={getWrapperClass()}>
    <div class={classCulture} >
        {#if !scoreCulture}<div class="overlay" use:tippy={tippyProps}/>{/if} 
        <div class="number">{score.culture}</div>
        <div class="label">Culture</div>
    </div>
    <div class={classHappiness} >
        {#if !scoreHappiness}<div class="overlay" use:tippy={tippyProps}/>{/if} 
        <div class="number">{score.happiness}</div>
        <div class="label">Happiness</div>
    </div>
    <div class={classWealth}>
        {#if !scoreWealth}<div class="overlay" use:tippy={tippyProps}/>{/if} 
        <div class="number">{Math.floor(score.wealth)}</div>
        <div class="label">Wealth</div>
    </div>
    
    <div class="score-panel bonus">
        {#if opponent}
            <div class="number">{score.bonus}</div>
        {:else}
            <input type=number on:change={handleBonus} bind:value={bonus} min=0 >
        {/if}
        <div class="label">Bonus</div>
    </div>
    <div class="score-panel total">
        <div class="number">{score.total}</div>
        <div class="label">Total</div>
    </div>
</div>