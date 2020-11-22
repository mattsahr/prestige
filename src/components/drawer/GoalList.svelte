<style>
    .goal-panel {
        margin: -8px 0 0 0;
    }

    .title { 
        font-weight: bold;
        margin: 8px -10px 0 -14px;
        padding: 10px 10px 16px 14px;
        border-top: solid 2px rgb(230, 120, 0);
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

</style>


<script>
    import { ExpansionPanel  } from 'svelte-mui/src';
    import { goals } from '../../store/store';
    import { hydrateGoals } from '../../utility/helpers';

    $: goalsObject = hydrateGoals($goals);

</script>


{#if goalsObject && goalsObject.length}
    <ExpansionPanel dense name="Bonus Goals" class="bonus-panel">
        <div class="goal-panel">
            {#each goalsObject as goal}
                <div class="goals-section">
                    <div class="title">{goal.title}</div>
                    <div class="objective">{@html goal.objective}</div>
                    {#if goal.rewardPoints}
                        <div class="reward-points">{@html goal.rewardPoints}</div>
                    {/if}
                    {#if goal.rewardEffects}
                        <div class="reward-effects">{@html goal.rewardEffects}</div>
                    {/if}
                </div>
            {/each}
        </div>
    </ExpansionPanel>
{/if}
