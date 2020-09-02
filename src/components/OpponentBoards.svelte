<style>
    .opponents-section {
        padding: 0;
        width: 100%;
        height: 42px;
    }

    .opponents-section.emtpy {
        opacity: 0;
    }

    .opponents-section.show-boards {
        height: 40vmin;
        min-height: 266px;
        max-height: 454px;        
    }

    .opponent {
        position: relative;
        margin: 0 3px 0 0;
        padding:0;
        height: 38px;
        overflow: hidden;
        width: 21vmin;
        min-width: 140px;
        max-width: 200px;
        cursor: pointer;
        transition: width 500ms ease, height 500ms ease;
    }

    .show-boards .opponent {
        transition: width 500ms ease, height 500ms ease;
        width: 42vmin;
        min-width: 280px;
        max-width: 600px;
        height: 40vmin;
        min-height: 266px;
        max-height: 434px;
        /* pointer-events:fill; */
    }

    .footer-control-column {
        padding-top: 52px;
        width: calc(100vmin - 48px);
        max-width: 860px;
        top: -36px;
        overflow: hidden;
        margin: 0 auto;
        position: relative;
        pointer-events: none;
    }

    .footer-control-tab {
        position: absolute;
        width: 100px;
        top: 0;
        border-radius: 8px 8px 0 0;
        background: rgb(0 30 56);
        color: rgb(200, 205,210);
        height: 56px;
        padding: 0 0 16px 0;
        right: 0px;
        pointer-events: fill;
        cursor: pointer;
        z-index: 100;
        transform: translate(0, -12px);
        transition: transform 400ms;
    }

    .footer-control-tab.feature-board-active {
        transform: translate(0, 0px);
    }

    .footer-control-tab:hover {
        color: rgb(255, 255, 255);
    }

    .show-boards .footer-control-tab {
        transform: translate(0, -32px);
        padding: 0px 0 4px 0;
        height: 42px;
        z-index: 10;
    }

</style>


<script>
    import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte';
    import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte';
    import { DUMMY_ID } from '../utility/constants';
    import { getDocHeight, getDocWidth, sortBoards } from '../utility/helpers';
    import { boards, players, scores, localBoard, opponentsUX } from '../store/store.js';
    import GameBoard from '../components/GameBoard.svelte';
    import PlayerInfo from '../components/PlayerInfo.svelte';
    import { Swipe, SwipeItem } from '../lib/svelte-swipe'; 

    const DUMMY_PLAYER = {
        name: 'ERROR: NO PLAYER',
        city: 'ERROR'
    };

    const isOpponent = board => (!$localBoard || board._id !== $localBoard._id) && 
        board._id !== DUMMY_ID;

    const getPlayer = id => $players.find(player => player._id === id) || DUMMY_PLAYER;
    const getBoardClass = id => $opponentsUX.featuredBoard === id ? 'featured ' : '';


    const clamp = (lowerBound, num, upperBound) => Math.max(
        lowerBound,
        Math.min(num, upperBound)
    );

    const featureNextBoard = (_id, source) => {
        opponentsUX.feature.show({
            _id: _id,
            source
            /*
            {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            }
            */
        });

    };

/*    const boardStatusUpdate = (() => {
        let showBoards = false;

        return () => {
            if ($opponentsUX.showBoards !== showBoards) {

                const currentWidth = $opponentsUX.showBoards 
                    ? clamp( 280, (0.42 * getDocWidth()), 400 )
                    : clamp( 140, (0.21 * getDocWidth()), 200 );
                updateSwipe(currentWidth);

                showBoards = $opponentsUX.showBoards;
            }

            return showBoards ? 'show-boards' : 'minified';
        };
    })();
*/  
    const getMin = () => Math.min(getDocWidth(), getDocHeight());
    const getFeaturedId = (opponentsUX) => {
        console.log('opponentsUX', opponentsUX);
        return false;
    };

    const sliderPadding = 6;
    $: opponents = $boards.filter(isOpponent).sort(sortBoards($scores)).reverse();
    $: wrapperClass = 'opponents-section' + 
        (opponents.length ? '' : ' empty') + (' count_' + opponents.length) +
        ($opponentsUX.showBoards ? ' show-boards' : '');
    $: boardStatus = $opponentsUX.showBoards ? 'show-boards' : 'minified';
    // $: boardStatus = boardStatusUpdate();
    $: currentWidth = (opponents.length && $opponentsUX.showBoards)
        ? clamp( 280, (0.42 * getMin()), 600 ) + sliderPadding
        : clamp( 140, (0.21 * getMin()), 200 ) + sliderPadding;
    $: tabClass = $opponentsUX.showFeatured  ? 'footer-control-tab feature-board-active' : 'footer-control-tab';
    $: currentFeaturedId = $opponentsUX.showFeatured && 
        $opponentsUX.featuredBoard && 
        $opponentsUX.featuredBoard._id;

</script>

<div class={wrapperClass} >
    {#if opponents.length}
        <div class={tabClass} on:click={opponentsUX.toggleShowOpponents}>
            {#if $opponentsUX.showBoards}<MdExpandMore />{:else}<MdExpandLess />{/if}
        </div>
        {#each [wrapperClass] as count (wrapperClass)} <!-- HACK TO RE-RENDER -->
            <Swipe featureNextBoard={featureNextBoard} itemWidth={currentWidth || 140} >
                {#each opponents as board}
                    <SwipeItem>
                        <div class="opponent">
                            <PlayerInfo 
                                tabFeatured={board._id === currentFeaturedId}
                                playerClass={getBoardClass(board._id) + boardStatus}
                                player={getPlayer(board._id)} 
                                score={$scores[board._id]} />
                            <GameBoard 
                                boardClass={getBoardClass(board._id) + boardStatus}
                                opponent={true} 
                                board={board} />
                        </div>
                    </SwipeItem>
                {/each}
            </Swipe>
        {/each}  <!-- END HACK TO RE-RENDER -->
    {/if}
</div>
