<style>

    .panel-title {
        width: 100%;
        margin: -14px 0 12px 0;
    }
    h1 {
        font-family: 'Lalezar';
        color: rgb(230, 230, 230);
        font-size: min(32px, 6vw);
        line-height: 1;
        padding: 0 0 0 12px;
        margin: 0;
        text-transform: uppercase;
        width: 100%;
    }

    /* ----- MODAL SECTION -------------- */

    .modal-wrap {
        display: flex;
        flex-wrap: wrap;
        background: rgb(200, 90, 0);
        background-image: url('../images/textures/back-pattern.png');
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
        justify-content: space-between;
        width: 100%;
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
        color: rgb(230, 210, 160);
        margin: 0 -4px 0 6px;
    }

    .go-icon {
        margin-right: -10px;
    }

</style>


<script>
    import { onMount } from 'svelte';
    import { ExpansionPanel  } from 'svelte-mui/src';
    import GoArrowRight from 'svelte-icons/go/GoArrowRight.svelte';
    import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';
    import { goals, gStore } from '../store/store';
    import { hydrateGoals } from '../utility/helpers';

    export let main = false;
    export let modal = false;
    let group = '';
    export let handleCloseGoalChooser = () => false;

    const wrapClass = main 
        ? 'goal-panel main-wrap' 
        : modal 
            ? 'goal-panel modal-wrap'
            : 'goal-panel other-wrap';

    const getRandomGoals = () => gStore.goals.generateRandom();

    $: goalsObject = hydrateGoals($goals);

    const init = () => {
        if (!$goals) {
            gStore.goals.generateRandom();
        }
    };

    onMount(init);

</script>

<div class={wrapClass}>
    {#if modal}
        <div class="panel-title">
            <h1>Bonus Goals</h1>
        </div>
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
                ReShuffle
                <span class="reshuffle-icon"><MdRefresh /></span>
            </button>
            <button class="accept">Accept
                <span class="go-icon"><GoArrowRight /></span>
            </button>
        </div>
    {/if}
</div>
