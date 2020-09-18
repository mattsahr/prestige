<style>
    .drawer-button {
        display: flex;
        align-items: flex-start;
        width: 100%;
        min-height: 50px;
        cursor: pointer;
        background: none;
        color: inherit;
        font-size: 16px;
        line-height: 1;
        border: 2px solid transparent;
        outline: none;
        margin: 0;
        padding: 11px 22px 10px 22px;
        border-top: 1px solid rgb(220, 220, 220);
        text-align: left;
        outline: none;

        position: relative;
        box-sizing: border-box;
        background: var(--bg-color, #fbfbfb);
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 
            0px 1px 1px 0px rgba(0, 0, 0, 0.14), 
            0px 1px 3px 0px var(--border, #dfdfdf);
    }
    .title {
        flex: 1;
        line-height: 24px
    }

    .turn-icon {
        position: relative;
        color: rgb(240, 220, 0);
        height: 26px;
        width: 38px;
        margin: 0 -12px -20px 0;
    }

    .drawer-button:hover {
        background: rgb(255, 255, 255);
    }


</style>

<script>
    import FaDice from 'svelte-icons/fa/FaDice.svelte';
    import { modalUX } from '../../store/store.js';

    export let handleDrawerClose = () => false;

    const handleTurnStateClick = () => {
        if ($modalUX.turnState.era) {
            modalUX.showTurnState();
            handleDrawerClose();
        }
    };

</script>


<div class="drawer-button" on:click={handleTurnStateClick}>
    <div class="title">Latest Turn</div>
    <div class="turn-icon">
        <FaDice />
    </div>
</div>
