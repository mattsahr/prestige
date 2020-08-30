<style>

    .panel-title {
        width: 100%;
        margin: 0 0 12px 0;
        display: flex;
        justify-content: left;
        background: rgba(70, 30, 0, 0.6);
        border-radius: 4px;
        padding: 12px 8px 8px 20px;
    }

    .panel-title .label {
        font-size: 14px;
        color: rgb(230, 230, 230);
        text-transform: uppercase;
        padding: 0 0 4px 21px;
        font-weight: bold;
        letter-spacing: 0.01em;
        text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
        line-height: min(24px, 5vw);
    }

    h1 {
        font-family: 'Lalezar';
        color: rgb(230, 230, 230);
        font-size: min(24px, 5vw);
        line-height: min(24px, 5vw);
        padding: 0 0 0 12px;
        margin: 0;
    }

    .sub-title {
        font-size: 14px;
        color: rgb(230, 230, 230);
        text-transform: uppercase;
        padding: 4px 0 6px 20px;
        font-weight: bold;
        letter-spacing: 0.04em;
        text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);        
    }

    /* ----- MODAL SECTION -------------- */

    .modal-wrap {
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

    .goals-section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }
    .goal-wrap {
        width: calc(50% - 10px);
        background: rgb(240, 240, 240);
        padding: 4px;
        border-radius: 4px;
        margin: 0 0 10px 0;
    }

    .title { 
        font-weight: bold; 
    }
    .objective { 
        padding: 2px 0 14px 0;
        border: solid rgb(250, 170, 110);
        border-width: 0 0 1px 0;
    }
    .reward-points {
        padding: 10px 0 14px 0;

    }
    .reward-effects {
        padding: 10px 0 14px 0;
    }

    .reward-points + .reward-effects {
        border: solid rgb(250, 170, 110);
        border-width: 1px 0 0 0;
    }

    .action-buttons {
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 20px 0 0 0;
    }

    .action-buttons button  {
        background: rgb(250, 190, 80);
        margin: 20px 0 0 8px;
        display: flex;
        align-items: center;
    }

    .reshuffle-icon,
    .go-icon {
        width: 30px;
        height: 30px;
        color: rgb(250, 230, 150);
        margin: -2px -4px 0 6px;
    }

    .go-icon {
        margin-right: -10px;
        margin-top: 0;
    }

</style>


<script>
    import { onMount } from 'svelte';
    import { ExpansionPanel  } from 'svelte-mui/src';
    import GoArrowRight from 'svelte-icons/go/GoArrowRight.svelte';
    import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';
    import { goals, gStore, modalUX } from '../store/store';
    import { hydrateGoals } from '../utility/helpers';

    export let main = false;
    export let modal = false;
    let group = '';

    const wrapClass = main 
        ? 'goal-panel main-wrap' 
        : modal 
            ? 'goal-panel modal-wrap'
            : 'goal-panel other-wrap';

    const getRandomGoals = () => gStore.goals.generateRandom();

    const handleCreateGame = () => {
        gStore.roster.create($modalUX.chooseGoals.rosterName);

    };

    $: goalsObject = hydrateGoals($goals);

    const init = () => {
        if (!$goals) {
            gStore.goals.generateRandom();
        }
        console.log('rosterName?', $modalUX.chooseGoals.rosterName);
    };

    onMount(init);

</script>

<div class={wrapClass}>
    {#if modal}
        <div class="panel-title">
            <div class="label">New Game:</div>
            <h1>{$modalUX.chooseGoals.rosterName}</h1>
        </div>
        <div class="sub-title">Goals</div>
    {/if}

    {#if goalsObject && goalsObject.length}
        <div class="goals-section">
            {#each goalsObject as goal}
            <ExpansionPanel name={goal.title} bind:group >
                <div class="objective">{@html goal.objective}</div>
                {#if goal.rewardPoints}
                    <div class="reward-points">{@html goal.rewardPoints}</div>
                {/if}
                {#if goal.rewardEffects}
                    <div class="reward-effects">{@html goal.rewardEffects}</div>
                {/if}
            </ExpansionPanel>
            {/each}
        </div>
    {/if}

    {#if modal}
        <div class="action-buttons">
            <button class="generate-random" on:click={getRandomGoals}>
                ReShuffle Goals
                <span class="reshuffle-icon"><MdRefresh /></span>
            </button>
            <button class="accept" on:click={handleCreateGame}>
                Accept
                <span class="go-icon"><GoArrowRight /></span>
            </button>
        </div>
    {/if}
</div>
