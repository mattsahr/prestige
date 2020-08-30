<style>
    .featured-opponent-wrap {
        position: fixed;
        z-index: 1200;
        top: 0;
        right: 0;
        bottom: 46px;
        left: 0;
        /* padding-bottom: 46px; */
        overflow: hidden;
    }

    .background {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(10, 80, 90);
        background-image: url(/images/textures/vichy.png);
        opacity: 0;
        transition: opacity 1100ms;
    }

    .frame {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .controls-wrap {
        z-index: 30;
        position: absolute;
        top: 0;
        width: 100%;
        background: rgba(0, 10, 20, 0.2);
    }

    .controls {
        height: 48px;
        margin: 0 auto;
        width: calc(100vmin - 48px);
        max-width: 380px;
        display: flex;
        justify-content: space-around;
    }

    .go-left, .go-right, .close-me {
        width: 40px;
        height: 48px;
        opacity: 0.9;
        color: rgb(220, 220, 220);
        cursor: pointer;
    }

    .go-left:hover, 
    .go-right:hover,
    .close-me:hover {
        color: rgb(250, 250, 250);
        opacity: 1;
    }

    .go-left, .go-right {
        flex-grow: 2;
    } 

    .close-me {
        padding: 5px 0 2px 0;
        flex-shrink: 2;
        margin: 0 0 0 120px;
    }

    .go-left.disabled, 
    .go-right.disabled {
        opacity: 0.25;
        cursor: default;
        pointer-events: none;
    }

    .go-left.disabled:hover, 
    .go-right.disabled:hover {
        color: rgb(220, 220, 220);
        opacity: 0.25;
    }

    .featured-opponent-block {
        position: absolute;
        width: calc(100vmin - 48px);
        max-width: 860px;
        margin: 0 auto;
        z-index: 20;
        transform-origin: 0px 0px;
        transition: opacity 100ms;
        opacity: 0;
    }

    @media all and (max-width: 419px), (max-height: 419px) {
        .featured-opponent-block {
            width: 98vmin;
        }
    }

</style>

<script>
    import { onMount } from 'svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
    import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
    import { DUMMY_ID } from '../utility/constants';
    import { boards, localBoard, players, scores, opponentsUX } from '../store/store';
    import { getDocHeight, getDocWidth, sortBoards } from '../utility/helpers';

    import PlayerInfo from './PlayerInfo.svelte';
    import GameBoard from './GameBoard.svelte';
    import TerrainChooser from './TerrainChooser.svelte';

    const DOM = {
        wrapper: null
    };
    const SIDE_SWIPE_SPEED = 280;

    const getMin = () => Math.min(getDocWidth(), getDocHeight());

    const isOpponent = board => (!$localBoard || board._id !== $localBoard._id) && 
        board._id !== DUMMY_ID;
    $: opponents = $boards.filter(isOpponent).sort(sortBoards($scores)).reverse();

    $: board = ($opponentsUX.featuredBoard && $opponentsUX.showFeatured) 
        ? $boards.find(next => next._id === $opponentsUX.featuredBoard._id) 
        : null;

    $: player = ($opponentsUX.featuredBoard && $opponentsUX.showFeatured) 
        ? $players.find(next => next._id === $opponentsUX.featuredBoard._id)
        : null;

    $: boardIndex = opponents.indexOf(board);
    $: goRightClass = 'go-right' + (boardIndex >= (opponents.length - 1) ? ' disabled' : '');
    $: goLeftClass = 'go-left' + (boardIndex === 0 ? ' disabled' : '');
    $: TOP_MARGIN = 48 + Math.min(0.02 * getMin());

    //             <ScoreCard board={board} featuredOpponent={true} />

    const handleGoLeft = (() => {

        const goLeft4 = (() => {
            const moveIn = () => {
                const left = (getDocWidth() / 2) - (DOM.blockDimensions.width / 2);
                DOM.block.style.transform = 
                    'translate(' + left + 'px, ' + TOP_MARGIN + 'px) scale(1,1)';
            };
            return () => { setTimeout(moveIn , 20); };
        })();

        const goLeft3 = (() => {
            const actuallyReplace = () => {
                opponentsUX.feature.show({
                    _id: opponents[boardIndex - 1]._id
                });
                DOM.block.style.transition = 'transform '+ SIDE_SWIPE_SPEED + 'ms ease-out';
                goLeft4();
            };
            return () => { setTimeout(actuallyReplace, 20); };
        })();

        const goLeft2 = (() => {
            const updateShown = () => {
                DOM.block.style.transition = '';
                DOM.block.style.transform = 
                    'translate(-' + getDocWidth() + 'px, ' + TOP_MARGIN + 'px) scale(1,1)';
                goLeft3();
            };
            return () => { setTimeout(updateShown, SIDE_SWIPE_SPEED); };
        })();

        return () => { 
            DOM.block.style.transition = 'transform '+ SIDE_SWIPE_SPEED + 'ms ease-in';
            DOM.block.style.transform = 
                'translate(' + getDocWidth() + 'px, ' + TOP_MARGIN + 'px) scale(1,1)';
            goLeft2();
        };
    })();


    const handleGoRight = (() => {

        const goRight4 = (() => {
            const moveIn = () => {
                const left = (getDocWidth() / 2) - (DOM.blockDimensions.width / 2);
                DOM.block.style.transform = 
                    'translate(' + left + 'px, ' + TOP_MARGIN + 'px) scale(1,1)';
            };
            return () => { setTimeout(moveIn , 20); };
        })();

        const goRight3 = (() => {
            const actuallyReplace = () => {
                opponentsUX.feature.show({
                    _id: opponents[boardIndex  + 1]._id
                });
                DOM.block.style.transition = 'transform '+ SIDE_SWIPE_SPEED + 'ms ease-out';
                goRight4();
            };
            return () => { setTimeout(actuallyReplace, 20); };
        })();

        const goRight2 = (() => {
            const shiftToOtherSide = () => {
                DOM.block.style.transition = '';
                DOM.block.style.transform = 
                    'translate(' + getDocWidth() + 'px, ' + TOP_MARGIN + 'px) scale(1,1)';
                goRight3();
            };
            return () => { setTimeout(shiftToOtherSide, SIDE_SWIPE_SPEED); };
        })();

        return () => { 
            DOM.block.style.transition = 'transform '+ SIDE_SWIPE_SPEED + 'ms ease-in';
            DOM.block.style.transform = 
                'translate(-' + getDocWidth() + 'px, ' + TOP_MARGIN + 'px) scale(1,1)';
            goRight2();
        };
    })();

    const closePhase2 = (() => {
        const close2 = () => {
            DOM.wrapper.removeAttribute('style');
            DOM.background.removeAttribute('style');
            DOM.block.removeAttribute('style');
            delete DOM.blockDimensions;
            opponentsUX.feature.close();
        };

        return () => { setTimeout(close2, 300); };
    })();

    const handleCloseClick = () => {
        DOM.wrapper.style.transition = 'opacity 300ms';
        DOM.wrapper.style.opacity = '0';
        closePhase2();
    };

    const initPhase2 = (() => {

        const phase2 = () => {
            const left = (getDocWidth() / 2) - (DOM.blockDimensions.width / 2);
            DOM.block.style.transition = 'transform 500ms';
            DOM.block.style.transform = 
                'translate(' + left + 'px, ' + TOP_MARGIN + 'px) scale(1,1)';

            opponentsUX.feature.clearSource();
        };

        return () => { setTimeout(phase2, 30); };
    })();



    const init = (() => {
        const animateEntry = () => {
            DOM.block = DOM.wrapper.querySelector('.featured-opponent-block');
            DOM.background = DOM.wrapper.querySelector('.background');

            const rect = DOM.block.getBoundingClientRect();
            DOM.blockDimensions = {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
            };

            const startBox = $opponentsUX.featuredBoard.source;
            if (startBox) {
                DOM.block.removeAttribute('style');
                const scaleX = (startBox.width / DOM.blockDimensions.width);
                const scaleY = (startBox.height / DOM.blockDimensions.height) * 1.2;
                DOM.block.style.transform = 
                    'translate(' + startBox.left + 'px, ' + startBox.top + 'px) ' + 
                    'scale(' + scaleX + ', ' + scaleY + ')'; 
            }

            DOM.background.style.opacity = 1;
            DOM.block.style.opacity = 1;

            initPhase2();
        };

        return () => { setTimeout(animateEntry, 20); };
    })();

    onMount(init);

</script>

<div class="featured-opponent-wrap" bind:this={DOM.wrapper}>

    <div class="background"></div>

    <div class="controls-wrap"><div class="controls">
        <div class={goLeftClass} on:click={handleGoLeft}><MdChevronLeft /></div>
        <div class={goRightClass} on:click={handleGoRight}><MdChevronRight /></div>
        <div class="close-me" on:click={handleCloseClick}><MdClose /></div>
    </div></div>


    <div class="frame">

        <div class="featured-opponent-block">
            <PlayerInfo player={player} score={$scores[board._id]} featuredOpponent={true} />
            <GameBoard board={board} inactive={false} featuredOpponent={true} />
            <TerrainChooser featuredOpponent={true} />
        </div>

    </div>

</div>
