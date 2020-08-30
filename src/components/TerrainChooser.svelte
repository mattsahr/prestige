<style>

    .terrain-chooser {
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 2vmin 0 2vmin;
        background-color: rgb(254, 254, 252);
        border: solid rgb(140, 190, 220);
        border-width: 4px 0 0 0;
        cursor: default;
        border-radius: 0 0 4px 4px;
        position: relative;
        z-index: 40;
    }

    .terrain-chooser.featured-opponent {
        background-color: rgb(218, 255, 255);
        border: solid  rgb(10, 56, 70);
        border-width: 4px 0 4px;
        border-radius: 0 0 8px 8px;
        z-index: 40;
    }

    .terrain {
        width: 14.25%;
        max-width: 60px;
        border: none;
        padding: 8px 4px 4px 4px;
        margin: 6px 0 4px 0;
        box-sizing: border-box;
    }

    .terrain .pane {
        width: 100%;
        height: 6vmin;
        max-height: 54px;
        border: none;
        opacity: 0.3;
        cursor: pointer;
        margin: 0 0 4px 0;
    }

    .label {
        font-size: min(12px, calc(1.2vw + 6px));
        text-transform: uppercase;
        letter-spacing: 0;
        text-align: center;
        color: rgb(210, 210, 210);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .featured-opponent .label {
        color: rgb(150, 210, 210);
    }

    .terrain:hover .pane {
        opacity: 1;
    }

    .terrain.EMPTY:hover .pane {
        opacity: 1;
        border: solid 1px rgb(200, 200, 200);
        margin: -1px -1px 3px -1px;
    }


    .terrain:hover .label,
    .featured-opponent .terrain:hover .label {
        color: rgb(60, 60, 60);
    }

    .terrain.active {
        margin: 0;
        border: solid rgb(0, 255, 0);
        border-width: 6px 0 4px 0;
    }
    .terrain.active .pane {
        border: solid 1px rgb(120, 130, 160);
        margin: -1px -1px 5px -1px;
        opacity: 1;
    }

    .terrain.EMPTY.active .pane {
        border: solid 1px rgb(200, 200, 200);
    }

    .terrain.active .label {
        color: rgb(60, 60, 60);
    }

    .featured-opponent .terrain.active .label {
        color: rgb(20, 60, 60);
    }

</style>

<script>
    import { PLOT_TYPE } from '../utility/constants';
    import { currentTerrain } from '../store/store';

    // import { createEventDispatcher } from 'svelte';
    // const dispatch = createEventDispatcher();
    // const choose = () => dispatch('choose');

    const { 
        BLIGHT,
        COMMERCE,
        CULTURE,
        EMPTY,
        INDUSTRY,
        MOUNTAIN,
        PARKS,
        RESIDENTIAL
    } = PLOT_TYPE;

    export let featuredOpponent = false;

    $: blightClass = 'terrain ' + BLIGHT + ($currentTerrain ===BLIGHT ? ' active' : '');
    $: commerceClass = 'terrain ' + COMMERCE + ($currentTerrain === COMMERCE ? ' active' : '');
    $: cultureClass = 'terrain ' + CULTURE + ($currentTerrain === CULTURE ? ' active' : '');
    $: emptyClass = 'terrain ' + EMPTY + ($currentTerrain === EMPTY ? ' active' : '');
    $: industryClass = 'terrain ' + INDUSTRY + ($currentTerrain === INDUSTRY ? ' active' : '');
    $: parksClass = 'terrain ' + PARKS + ($currentTerrain === PARKS ? ' active' : '');
    $: residentialClass = 'terrain ' + RESIDENTIAL + ($currentTerrain === RESIDENTIAL ? ' active' : '');
    $: terrainClass = 'terrain-chooser' + (featuredOpponent ? ' featured-opponent' : '');

    const handleChoice = e => {
        const choice = e.currentTarget.getAttribute('data');
        console.log('CHOOOSE!', choice);
        console.log('CurrentTerrain', currentTerrain, $currentTerrain);
        currentTerrain.set(choice);
    };

</script>

<div class={terrainClass}>

    <div class={emptyClass} data={EMPTY} on:click={handleChoice}>
        <div class="pane" />
        <div class="label">Empty</div>
    </div>

    <div class={commerceClass} data={COMMERCE} on:click={handleChoice}>
        <div class="pane" />
        <div class="label">Commerce</div>
    </div>

    <div class={cultureClass} data={CULTURE} on:click={handleChoice}>
        <div class="pane" />
        <div class="label">Culture</div>
    </div>
    <div class={industryClass} data={INDUSTRY} on:click={handleChoice}>
        <div class="pane" />
        <div class="label">Industry</div>
    </div>
    <div class={parksClass} data={PARKS} on:click={handleChoice}>
        <div class="pane" />
        <div class="label">Parks</div>
    </div>
    <div class={residentialClass} data={RESIDENTIAL} on:click={handleChoice}>
        <div class="pane" />
        <div class="label">Residential</div>
    </div>

    <div class={blightClass} data={BLIGHT} on:click={handleChoice}>
        <div class="pane" />
        <div class="label">Blight</div>
    </div>
</div>