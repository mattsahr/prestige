<style>
    .player-info {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        padding: 0;
        color: rgb(240, 240, 240);
        z-index: 100;
        user-select: none;
    }

    .player-info:hover {
        background: rgb(0, 0, 0, 0.2);
    }

    .player-info.featured-opponent {
        position: relative;
        height: 80px;
        width: 100%;
        border-bottom: solid 1px rgb(120, 160, 140);
        /* background: rgb(10, 56, 70);  */

        border-radius: 6px 6px 0 0;

        background: rgb(30,80,90);
        background: radial-gradient(
            circle, 
            rgba(30,80,90,1) 0%, 
            rgba(16,64,80,1) 51%, 
            rgba(10,56,70,1) 100%);

        z-index: 10;
    }

    .player-info.tab-featured {
        background-color: rgb(0, 160, 100, 0.3);
    }

    .main {
        display: flex;
        justify-content: space-between;
        height: 58px;
        flex-wrap: nowrap;
        width: 100%;
        margin: 0;
        padding: 14px 22px 0 22px;
        border-radius: 4px 4px 0 0;
        pointer-events: fill;
    }

    .main:hover {
        background-color: rgb(20, 60, 90);
        border: solid rgb(90, 170, 210);
        border-width: 2px 2px 1px 2px;
        padding: 12px 20px 0 20px;
    }

    .featured-opponent .main {
        height: 52px;
        padding: 10px 22px 0 22px;
        pointer-events: none;
    }

    .featured-opponent .main:hover {
        background-color: inherit;
        border: inherit;
        border-width: inherit;
        padding: inherit;
    }

    .names {
        overflow: hidden;
    }

    .player-name, .city-name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 13px;
        line-height: 1.3;
        margin: 0 0 -3px 0;
    }

    .city-name {
        font-weight: bold;
        font-size: 18px;
    }

    .score {
        display: flex;
        padding: 0 22px 0 0;
        padding-top: 0.3vmin;
        justify-content: center;
    }

    .featured-opponent .score {
        padding: 0 22px 0 20px;
    }

    .sub-score {
        width: 25%;
        font-size: 12px;
        opacity: 0.7;
        text-align: right;
        padding: 0 6px 0 0;
        line-height: 1.2;
        text-shadow: 1px 1px 3px black;
        max-width: 110px;
    }

    .sub-score .label {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .sub-score .number {
        font-size: 1.2em;
    }

    .featured-opponent .sub-score {
        display: flex;
        flex-direction: row-reverse;
    }

    .featured-opponent .sub-score .number {
        padding: 0 0 0 8px;
    }

    .sub-score.total {
        opacity: 1;
        padding: 0;
    }

    .sub-score.total .number {
        font-size: 2em;
        letter-spacing: 0.1em;
        line-height: 1.4;
    }

    .minified.player-info {
        padding-left: 14px;
        padding-right: 14px;
/*        width: 21vmin;
        min-width: 140px;
        max-width: 200px;
*/    }

    .minified .main {
        height: 34px;
        margin: 0;
        padding: 4px 0 0 2px;
        border-radius: 0;
        pointer-events: none;
    }

    .minified .main:hover {
        background-color: inherit;
        border: none;
        padding: 4px 0 0 2px;
        margin: 0;
    }

    .minified .city-name {
        font-size: 14px;
    }

    .minified .sub-score.total .number {
        font-size: 1.2em;
    }

</style>

<script>
    import { opponentsUX } from '../store/store';

    export let player = {};
    export let score = {};
    export let playerClass = '';
    export let featuredOpponent = false;
    export let tabFeatured = false;


    const stopEvent = e => { 
        if (e) { 
            e.stopImmediatePropagation(); 
            e.stopPropagation(); 
            e.preventDefault();
        }
    };

    const handleClick = e => {
        stopEvent(e);

        if (playerClass === 'show-boards') {
            e.stopPropagation();
            console.log('show-boards!', player);
            console.log('target', e.target);
            const div = e.target.closest('.player-info');
            console.log('square', div);
            const rect = div.getBoundingClientRect();
            console.log('rect', rect);

            opponentsUX.feature.show({
                _id: player._id,
                source: {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                }
            });

            setTimeout(opponentsUX.toggleShowOpponents, 160);
        }
    };

    $: playerInfoClass = 'player-info' + 
        (playerClass ? ' ' + playerClass : '') +
        (featuredOpponent ? ' featured-opponent' : '') + 
        (tabFeatured ? ' tab-featured' : '');

</script>

<div class={playerInfoClass} data-player-id={player._id} on:click={handleClick}>
    <div class="main">
        <div class="names">
            <div class="city-name">{player.city}</div>
            <div class="player-name">{player.name}</div>
            </div>
        <div class="sub-score total">
            <div class="number">{score.total}</div>
        </div>
    </div>
    <div class="score">
        <div class="sub-score culture">
            <div class="number">{score.culture}</div>
            <div class="label">Culture</div>
        </div>
        <div class="sub-score happiness">
            <div class="number">{score.happiness}</div>
            <div class="label">Happy</div>
        </div>
        <div class="sub-score wealth">
            <div class="number">{Math.floor(score.wealth)}</div>
            <div class="label">Wealth</div>
        </div>
        <div class="sub-score bonus">
            <div class="number">{score.bonus}</div>
            <div class="label">Bonus</div>
        </div>
    </div>
</div>