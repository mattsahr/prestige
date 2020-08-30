<style>
    .main-board {
        padding-top: calc(48px + 1.8vmin);
        width: calc(100vmin - 48px);
        max-width: 860px;
        margin: 0 auto 60px auto;
    }

    @media all and (max-width: 419px), (max-height: 419px) {
        .main-board {
            padding-top: 48px;
            width: 96vmin;
        }        
    }

</style>


<script>
    import { localBoard, localPlayerId } from '../store/store.js';
    import TurnDashboard from './TurnDashboard.svelte';
    import ScoreCard from './ScoreCard.svelte';
    import GameBoard from './GameBoard.svelte';
    import TerrainChooser from './TerrainChooser.svelte';


/*
    import { Swipe, SwipeItem } from "../lib/svelte-swipe"; 

    let size = 'small';

    const toggleSize = () => { 
      size = size === 'small' ? 'big' : 'small'; 
      console.log('size!', size);
    };

    $: currentWidth = size === 'small' ? 120 : 240;
    $: currentClass = size === 'small' ? 'demo' : 'demo2';


    <div class="swipe-holder">
        <div class="test-button" on:click={toggleSize}>Toggle</div>

        {#each [size] as count (size)} <!-- HACK TO RE-RENDER ON SIZE CHANGE -->

            <Swipe itemWidth={currentWidth} tick={0} shouldUpdate={shouldUpdate} >
                <SwipeItem><div class={currentClass} style="background:rgb(255, 0, 0)">A</div></SwipeItem>

                <SwipeItem><div class={currentClass} style="background:rgb(0, 0, 255)">B</div></SwipeItem>

                <SwipeItem><div class={currentClass} style="background:rgb(0, 255, 0)">C</div></SwipeItem>

                <SwipeItem><div class={currentClass} style="background:rgb(255, 210, 0)">D</div></SwipeItem>
            </Swipe>

        {/each}  <!-- END -- HACK TO RE-RENDER ON SIZE CHANGE -->

    </div>
*/

</script>

<div class="main-board">
    <TurnDashboard />
    <ScoreCard board={$localBoard} />
    <GameBoard board={$localBoard} inactive={!$localPlayerId} />
    <TerrainChooser />

</div>
