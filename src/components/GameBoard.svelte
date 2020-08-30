<style>

    .main-board-wrapper {
        width: 100%;
        margin: 0;
        border-radius: 2px;
        padding: 0;
        box-sizing: border-box;
        margin: 0 auto;
        z-index: 30;
        position: relative;
        }

    .main-board-wrapper.inactive {
        pointer-events: none;
        background: rgb(220, 220, 220);
        border: solid 1px rgb(200,200, 200);
    }

    .main-board-wrapper.inactive > div {
        opacity: 0.4;
    }

    .main-board-wrapper .game-board {
        background-color: rgb(254, 254, 252);
        height: calc(50vmin + 72px);
    }

    .main-board-wrapper .row {
        height: 11.11%;
    }

    .main-board-wrapper.featured-opponent .game-board {
        background-color: rgb(218, 255, 255);
        height: calc(50vmin);
    }

    .main-board-wrapper .plot {
        height: 100%;
        max-height: inherit;
    }

    .row {
        display: flex;
        box-sizing: border-box;
    }

    .plot {
        width: 12.5%;
        height: max(32px, calc(10.9vmin - 27px));
        max-height: 70px;
        font-size: 9px;
        cursor: pointer;
        box-sizing: border-box;
        border: solid 1px;
        border-top-color: rgb(254, 254, 252);
        border-right-color: rgb(230, 230, 230);
        border-bottom-color: rgb(230, 230, 230);
        border-left-color: rgb(254, 254, 252);
    }

    .plot:first-of-type { 
        border-left-color: rgb(230, 230, 230);
    }

    .featured-opponent .plot {
        border-top-color: rgb(214, 254, 252);
        border-right-color: rgb(190, 230, 230);
        border-bottom-color: rgb(190, 230, 230);
        border-left-color: rgb(214, 254, 252);        
    }

    .plot.border_T { border-top-color: rgb(100, 100, 100) !important; }
    .plot.border_R { border-right-color: rgb(100, 100, 100) !important; }
    .plot.border_B { border-bottom-color: rgb(100, 100, 100) !important; }
    .plot.border_L { border-left-color: rgb(100, 100, 100) !important; }
    .plot.border_R_T { 
        border-right-color: rgb(100, 100, 100) !important; 
        border-top-color: rgb(100, 100, 100) !important; 
    }
    .plot.border_L_T { 
        border-left-color: rgb(100, 100, 100) !important; 
        border-top-color: rgb(100, 100, 100) !important; 
    }
    .plot.border_R_B { 
        border-right-color: rgb(100, 100, 100) !important;  
        border-bottom-color: rgb(100, 100, 100) !important; 
    }
    .plot.border_L_B { 
        border-left-color: rgb(100, 100, 100) !important; 
        border-bottom-color: rgb(100, 100, 100) !important; 
    }

    .opponent-board-wrapper {
        width: 42vmin;
        min-width: 280px;
        margin: 0 auto;
        max-width: 600px;
        border-radius: 2px;
        padding: 4px;
        box-sizing: border-box;
        opacity: 0.2;
        transform-origin: bottom center;
        transition: transform 500ms;
        transform: scale(1) translate(0, 56px);
    }

    .opponent-board-wrapper.minified {
        transform: scale(0.5);
    }

   .opponent-board-wrapper .plot {
        width: 12.5%;
        height: 3.5vmin;
        max-height: 40px;
        min-height: 30px;
    }

</style>

<script>
    import { currentTerrain, gStore } from '../store/store.js';
    import { PLOT_TYPE } from '../utility/constants';
    // const types = Object.keys(PLOT_TYPE);

    export let board = null;
    export let opponent = false;
    export let inactive = false;
    export let boardClass = '';
    export let gridHeight = 0;
    export let featuredOpponent = false;
    // export let activePlotType;

    const handlePlotClick = e => {
        const plotId = e.target.getAttribute('data-plot-id');
        const currentType = e.target.getAttribute('data-plot-type');
        const next = currentType === $currentTerrain
            ? PLOT_TYPE.EMPTY
            : $currentTerrain;

        // const next = (index >= types.length - 1) ? types[0] : types[index + 1];

        /*
        console.group('handlePlotClick');
        console.log('plotId', plotId);
        console.log('currentPlayerId', board._id);
        console.log('types', types);
        console.log('currentType', currentType);
        console.log('next', next);
        console.groupEnd();
        */

        gStore.board.update(board._id, plotId, next);
    };

    const borderStyle = {
        row_2_column_2: ' border_L_T',
        row_2_column_3: ' border_T',
        row_2_column_4: ' border_T',
        row_2_column_5: ' border_R_T',

        row_3_column_5: ' border_R',
        row_4_column_5: ' border_R',
        row_5_column_5: ' border_R',

        row_6_column_2: ' border_L_B',
        row_6_column_3: ' border_B',
        row_6_column_4: ' border_B',
        row_6_column_5: ' border_R_B',

        row_3_column_2: ' border_L',
        row_4_column_2: ' border_L',
        row_5_column_2: ' border_L'
    };

    const getPlotClass = (id, plotType) => 'plot ' + plotType + (borderStyle[id] || '');

    $: wrapperClass = 
        (opponent ? 'opponent-board-wrapper' : 'main-board-wrapper') + 
        (featuredOpponent ? ' featured-opponent' : '') +
        (inactive ? ' inactive' : '') + 
        (boardClass ? ' ' + boardClass : '');

    $: boardStyle = gridHeight ? ('height: ' + gridHeight + 'px;') : '';

</script>

<div class={wrapperClass} style={boardStyle}>

    {#if board}
        <div class="game-board">
            {#each board.state as row}
                <div class="row">
                    {#each row as { _id, plotType }}
                        <div class={getPlotClass(_id, plotType)} 
                            data-plot-type={plotType} data-plot-id={_id}
                            on:click={handlePlotClick} ></div>
                    {/each}
                </div>
            {/each}
        </div>
    {/if}

</div>
