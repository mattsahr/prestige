<style>
    .go-to-target-board {
        cursor: pointer;
        border-radius: 4px;
        background-color: rgba(0, 20, 50, 0.7);
        transition: background-color 600ms;
        background-image: url(/images/textures/black-lozenge.png);
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
        padding: 1.5vmin 3vmin;
        border: solid 1px rgba(0, 0, 0, 0.4);
        color: rgb(240,250,250);
        letter-spacing: 0.05em;
        margin: 1vmin 0;
    }

    .go-to-target-board:hover {
        background-color: rgba(0, 150, 90, 0.6);
    }

    .city,
    .player {
        display: flex;
        width: 100%;
        font-weight: bold;
        justify-content: space-between;
        padding: 0 6px 6px 6px;
        text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
    }

    .city .label,
    .player .label {
        font-weight: normal;
        font-size: 0.7em;
        margin: 0 12px 0 0;
        text-transform: uppercase;
        line-height: 2.2;
    }

    .city {
        font-size: 17px;
        margin: 0 6px 0 0;
    }

    .player {
        font-size: 14px;
    }

    .button {
        background: rgb(204,207,208);
        background: radial-gradient(circle, rgba(204,207,208,1) 0%, rgba(132,147,130,1) 100%);
        box-shadow: 4px 4px 12px rgba(30, 40, 50, 0.8);
        cursor: pointer;
        transition: box-shadow 300ms;
        border-radius: 4px;
        padding: 14px 16px;
        margin: 8px;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0;
        color: rgb(30, 40, 50);
    }

    .go-to-target-board:hover .button {
        box-shadow: 5px 5px 16px rgb(2, 57, 60);
    }


</style>

<script>
    import { onMount } from 'svelte';
    import { boards, scores, localBoard, opponentsUX, players } from '../../store/store.js';
    import { sortBoards } from '../../utility/helpers';

    export let closeParent = () => false;

    const dummyPlayer = { city: '', name: '' };

    const getTargetOpponent = (sortedBoards, localBoard) => {

        const localPlayerIndex = sortedBoards.findIndex(next => next._id === localBoard._id);

        if (localPlayerIndex === 0) {
            return sortedBoards[sortedBoards.length - 1];
        }

        return sortedBoards[localPlayerIndex - 1];
    };

    const featureOpponent = (targetBoard) => {
        opponentsUX.feature.show({
            _id: targetBoard._id
        });
    };

    const getTargetPlayer = (players, opponentBoard) => {
        console.log('getTargetPlayer', players, opponentBoard);
        const targetPlayer = players.find(player => player._id === opponentBoard._id) || dummyPlayer;
        console.log('result player', targetPlayer);
        return targetPlayer;
    };

    $: sortedBoards = [...$boards].sort(sortBoards($scores)).reverse();
    $: targetOpponentBoard = getTargetOpponent(sortedBoards, $localBoard);
    $: targetPlayer = getTargetPlayer($players, targetOpponentBoard);

    const featureTargeted = (option) => {
        featureOpponent(targetOpponentBoard);
        if (option !== 'noClose') {
            closeParent();  
        }
    };


</script>

<div class="go-to-target-board" on:click={featureTargeted}>
    <div class="city">
        <div class="label">City:</div>
        <div class="value">{targetPlayer.city}</div>
    </div>
    <div class="player">
        <div class="label">Player:</div>
        <div class="value">{targetPlayer.name}</div>
    </div>
    <div class="button">
        Open Target Board
    </div>
</div>

