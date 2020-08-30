<style>
    .goal-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        height: 60px;
        border: solid rgb(240, 230, 210);
        border-width: 0 0 1px 0;
    }

    .goal-row:first-of-type {
        border-top-width: 1px;
    }
</style>


<script>
    import { ExpansionPanel  } from 'svelte-mui/src';
    import { goals } from '../../store/store';
    import { hydrateGoals } from '../../utility/helpers';

    export let handleDrawerClose = () => false;

    $: goalsObject = hydrateGoals($goals);

</script>


{#if goalsObject && goalsObject.length}
    <ExpansionPanel name="Bonus Goals">

        {#each goalsObject as goal}
            <div class="goal-row">{goal.title}</div>
        {/each}

    </ExpansionPanel>
{/if}
