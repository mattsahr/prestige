<style>
    .turn-dashboard {
        width: 100%;
        background: rgb(20,60,90);
        background: radial-gradient(
            circle, 
            rgba(30, 70, 100, 1) 0%, 
            rgba( 0, 40,  70, 1) 64%, 
            rgba( 0, 30,  60, 1) 100%
        );
        position: relative;
        color: rgba(220, 220, 220);
        overflow: hidden;
        height: 266px;
        transition: height 400ms;
        border-radius: 4px 4px 0 0;
        z-index: 10;
    }

    .turn-dashboard.closed {
        height: 46px;
        border-radius: 2px 2px 0 0;
    }

    .column {
        margin: 0 auto;
        padding: 12px 0 24px 0;
        padding-right: min(2vmin, 12px);
        padding-left: min(2vmin, 12px);
        max-width: 612px;
        position: relative;
    }

    .meta-controls {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 32px;
    }

    .meta-left {
        display: flex;
        position: relative;
    }

    .navigator {
        display: flex;
        width: 64px;
        height: 40px;
        padding: 2px 0 10px 0;
        margin-right: -0.2vmin;
        margin-bottom: -20px;
    }

    .closed .navigator {
        margin-top: -6px;
    }

    .roll-mini-summary {
        opacity: 0;
        transition: opacity 400ms;
        position: absolute;
        display: flex;
        margin: 0 -290px 0 0;
        right: 0;
        pointer-events: none;
    }

    .roll-mini-summary .era-label {
        font-size: 14px;
        color: rgb(220, 220, 220);
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 150px;
        padding: 2px 0 0 10px;
    }

    .number {
        font-size: 16px;
        line-height: 1;
        height: 24px;
        width: 24px;
        border-radius: 1px;
        padding: 4px 0 0 1px;
        color: rgb(230, 230, 230);
        font-weight: bold;
        text-align: center;
    }

    .number.parks { background-color: rgb(0 150 0); }
    .number.commerce { background-color: rgb(60 80 180); }
    .number.residential { background-color: rgb(180 0 10); }
    .number.culture { background-color: rgb(160 0 220); }
    .number.industry { background-color: rgb(190 170 100); }

    .closed .roll-mini-summary {
        opacity: 1;
    }

    .title {
        display: flex;
    }

    .info-bug {
        height: 34px;
        width: 34px;
        color: rgb(30, 90, 130);
        padding: 8px;
        margin: -6px 0 -6px 0;
        cursor: pointer;
    }

    .info-bug:hover {
        color: rgb(90, 230, 255);
    }

    .icon {
        color: rgb(230, 230, 230);
        font-size: 12px;
        cursor: pointer;
    }

    .icon:hover {
        color: rgb(255, 255, 255);
    }

    .icon.disabled {
        opacity: 0.3;
        cursor: default;
    }

    .toggle-icon {
        color: rgb(230, 230, 230);
        cursor: pointer;
        height: 32px;
        width: 36px;
        padding: 4px 0 4px 4px;
        margin: -4px 6px 0 -10px;
    }

    .toggle-icon:hover {
        color: rgb(255, 255, 255);
    }

    .icon.disabled:hover {
        color: rgb(230, 230, 230);
    }

    .turn-tracker {
        color: rgb(230, 180, 0);
        text-transform: uppercase;
        user-select: none;
        display: flex;
        align-items: center;
        margin: -8px 0 0 0;
    }

    .turn-label {
        margin: 0 6px 0 12px;
        opacity: 0.5;
        font-size: 0.8em;
        color: rgb(220, 220, 220);
    }

    .round-label {
        margin: 0 2px 0 0;
        opacity: 0.5;
        font-size: 0.8em;
        color: rgb(220, 220, 220);
    }

    .main-info {
        overflow: hidden;
        height: 96px;
    }

    .era {
        width: 100%;
        display: flex;
        font-weight: bold;
        transition: opacity 400ms;
    }

    .comment {
        height: 66px;
        overflow: hidden;
        transition: opacity 400ms;
        padding: 6px 0 0 0;
        font-size: 0.85em;
    }

    .closed .era {
        opacity: 0;
    }
    .closed .comment {
        opacity: 0;
    }

    
    @media all and (max-width: 549px), (max-height: 549px) {
       .turn-dashboard.closed {
            height: 80px;
        }
        .closed .roll-mini-summary {
            right: inherit;
            margin: 0 0 0 0;
            bottom: -24px;
            left: 8px;
        }

    }

</style>

<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import tippy from "sveltejs-tippy";
    import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
    import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
    import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte';
    import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte';
    import MdInfo from 'svelte-icons/md/MdInfo.svelte';
    import { hydrateTurns, dummyTurn } from '../utility/helpers';
    import { modalUX, turns, rosterName } from '../store/store';
    import Dice from './Dice.svelte';

    export let dashboardState = { open: false };
    const DOM = {
        wrapper: null
    };

    const toggleDashboard = () => {
        dashboardState.open = !dashboardState.open;
        console.log('toggle!', dashboardState);
    };

    const isTooBig = (number, rules) => (rules.max && (number > rules.max));
    const isTooSmall = (number, rules) => (rules.min && (number < rules.min));
    const inactive = (number, rules) => !rules.active;

    const goBack = () => currentIndex = currentIndex < 2 ? 0 : currentIndex - 1;
    const goForward = () => currentIndex = currentIndex >=  localTurns.length - 1 
        ? localTurns.length - 1 : currentIndex + 1;

    $: localTurns = $turns ? hydrateTurns($turns.played) : dummyTurn;
    $: currentIndex = localTurns.length - 1;
    $: currentView = localTurns[currentIndex];
    $: goBackIconClass = 'icon' + (currentIndex < 1 ? ' disabled' : '');
    $: goForwardIconClass = 'icon' + (currentIndex >= (localTurns.length - 1) ? ' disabled' : '');
    $: dasboardClass = 'turn-dashboard' + (dashboardState.open ? ' open' : ' closed');
    $: rollParks = getRoll('PARKS', currentView);
    $: rollCommerce = getRoll('COMMERCE', currentView);
    $: rollResidential = getRoll('RESIDENTIAL', currentView);
    $: rollCulture = getRoll('CULTURE', currentView);
    $: rollIndustry = getRoll('INDUSTRY', currentView);

    const getRoll = (type, currentView) => 
        !currentView || !currentView.dice || !currentView.rules ||
        inactive(currentView.dice[type], currentView.rules[type]) ||
        isTooBig(currentView.dice[type], currentView.rules[type]) ||
        isTooSmall(currentView.dice[type], currentView.rules[type])
            ? ''
            : currentView.dice[type];

    const createTooltipContent = htmlContent => { 
        const el = document.createElement('div');
        el.classList.add('tooltip-inner-content');
        el.innerHTML = htmlContent;
        return el;
    };

    const animatePhase3 = (() => {
        const phase3 = () => {
            DOM.wrapper.removeAttribute('style');
        };
        return () => { setTimeout(phase3, 500); };
    })();



    const animatePhase2 = (() => {
        const phase2 = () => {
            DOM.wrapper.style.transition = 'transform 500ms ease-out, height 400ms';
            DOM.wrapper.style.transform = 'scale(1)';

            DOM.turnNumber.style.transition = 'transform 1800ms ease-out';
            DOM.turnNumber.style.transform = 'scale(1)';

            animatePhase3();
        };
        return () => { setTimeout(phase2, 100); };
    })();

    const animateNewTurn = (() => {
        let turnCount = 0;
        const animate = () => {
            if (DOM.wrapper.classList.contains('open')) {
                return;
            }

            if (!DOM.turnNumber) { 
                DOM.turnNumber = DOM.wrapper.querySelector('.turn-number');
            }

            if (localTurns.length > turnCount) {
                turnCount =localTurns.length;
                console.log('animate in!', currentIndex, turnCount);

                DOM.wrapper.removeAttribute('style');
                DOM.wrapper.style.transform = 'scale(1.2)';
                DOM.wrapper.style.transition = 'transform 100ms, height 400ms';

                DOM.turnNumber.removeAttribute('style');
                DOM.turnNumber.style.transition = 'transform 100ms';
                DOM.turnNumber.style.transform = 'scale(3)';

                console.log('DOM.wrapper', DOM.wrapper);
                 animatePhase2();
            }
        };
        return () => { setTimeout(animate, 10); };
    })();

    const fadeIn = (node, {duration = 300}) => {
        animateNewTurn();
        return {
            duration,
            tick: t => { 
                if (t === 1) {
                    node.removeAttribute('style');
                } else {
                    node.style.opacity = t; 
                }
            }
        };
    };

   const createTooltip = description => ({
        content: ' ',
        placement: 'top',
        // trigger: 'click',
        onShow: instance => {
            instance.setProps({content: createTooltipContent(description)});
        },
        delay: [250, 250],
        theme: 'light',
        animation: 'shift-away'
    });

    const init = () => {
        if (window) {
            window.I =  window.I || {};
            window.I.turns = () => {
                console.log('  TURNS localTurns', localTurns);
                console.log('  TURNS currentIndex', currentIndex);
                console.log('  TURNS currentView', currentView);
            };
        }
        if (DOM.wrapper) { 
            DOM.turnNumber = DOM.wrapper.querySelector('.turn-number');
        }
    };

    const toggleTurnOverview = () => {
        modalUX.showTurnOverview();
    };

    onMount(init);

</script>

{#if $rosterName}
    <div class={dasboardClass} in:fade out:fade bind:this={DOM.wrapper}>
        <div class="column">

            <div class="meta-controls">

                <div class="meta-left">

                    <div class="toggle-icon" on:click={toggleDashboard}>
                        {#if dashboardState.open}<MdExpandLess />{:else}<MdExpandMore />{/if}
                    </div>

                    <div class="turn-tracker">
                        <span class="turn-label">Turn</span> 
                        <span class="turn-number">{currentView.turn}</span> 

                        {#each [currentIndex] as count (currentIndex)}
                            <div class="info-bug" 
                                use:tippy={createTooltip(currentView.description)}
                                on:click={toggleTurnOverview} >
                                <MdInfo />
                            </div>
                        {/each}

                    </div>

                    <div class="roll-mini-summary">
                        <div class="number parks">{rollParks}</div>
                        <div class="number commerce">{rollCommerce}</div>
                        <div class="number residential">{rollResidential}</div>
                        <div class="number culture">{rollCulture}</div>
                        <div class="number industry">{rollIndustry}</div>
                        <div class="era-label">{currentView.era}</div>
                    </div>

                </div>

                <div class="navigator">
                    <div class={goBackIconClass} on:click={goBack} ><MdChevronLeft /></div>
                    <div class={goForwardIconClass} on:click={goForward} ><MdChevronRight /></div>
                </div>

            </div>

            <div class="main-info">
                {#each [currentIndex] as count (currentIndex)}
                    <div class="era" in:fadeIn="{{ delay: 300, duration: 1200 }}"  out:fade>
                        <div class="title">
                            {currentView.era}
                        </div>
                    </div>
                    <div class="comment" in:fade="{{ delay: 300, duration: 1200 }}" out:fade>
                        {@html currentView.comment}
                    </div>
                {/each}
            </div>

            <Dice currentTurn={currentIndex} diceRolls={currentView.dice} rules={currentView.rules} />

        </div>
    </div>
{/if}