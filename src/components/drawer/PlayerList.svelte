<style>
    .player {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        height: 60px;
        border: solid rgb(240, 230, 210);
        border-width: 0 0 1px 0;
    }

    .player:first-of-type {
        border-top-width: 1px;
    }

    .player-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 2;
        padding: 0 10px 0 0;
    }

    .player-score {
        text-align: right;
        width: 56px;
        padding: 0 14px 0 0;
        margin-right: 6px;
        letter-spacing: 0.2em;
        background: rgb(240, 250, 240);
        height: 58px;
        line-height: 58px;
    }

    .button-group {
        margin-right: -20px;
    }

    button.view-button {
        width: 36px;
        height: 36px;
        background: none;
        color: rgb(200, 200, 200);
    }

    button.view-button:hover {
        color: rgb(60, 60, 60);
        background: rgb(240, 240, 240);
    }

    button.remove-button {
        width: 36px;
        height: 36px;
        background: none;
        color: rgb(200, 110, 0);
    }

    button.remove-button:hover {
        color: rgb(50, 20, 0);
        background-color: rgb(255, 190, 0);
    }

</style>

<script>
    import { ExpansionPanel  } from 'svelte-mui/src';
    import { DUMMY_ID } from '../../utility/constants';
    import { sortBoards } from '../../utility/helpers';
    import MdGridOn from 'svelte-icons/md/MdGridOn.svelte';
    import MdClose from 'svelte-icons/md/MdClose.svelte';

    import { 
        localBoard,
        modalUX,
        opponentsUX, 
        players, 
        scores
    } from '../../store/store.js';

    export let handleDrawerClose = () => false;

    const isOpponent = player => (!$localBoard || player._id !== $localBoard._id) && 
        player._id !== DUMMY_ID;

    const removePlayer = e => {
        const _id = e.currentTarget.getAttribute('data-player-id');
        const name = e.currentTarget.getAttribute('data-player-name');

        console.log('PlayerList >> removePlayer name', name, '  _id', _id);
        modalUX.showConfirmPlayerRemove(_id, name);
    };

    const viewPlayer = e => {
        const _id = e.currentTarget.getAttribute('data-player-id');
        const name = e.currentTarget.getAttribute('data-player-name');

        console.log('viewPlayer!', name);

        opponentsUX.feature.show({_id});
        handleDrawerClose();
    };

    const onchage = ({ detail }) => {
        console.log(detail.expanded ? 'open' : 'close', detail.name);
    };

    $: opponents = $players.filter(isOpponent).sort(sortBoards($scores)).reverse();

</script>

<ExpansionPanel name="Players" on:change={onchage}>

    {#each opponents as player}
        <div class="player">
            <div class="player-name">{player.name}</div>
            <div class="player-score">{$scores[player._id].total}</div>
            <div class="button-group">
                <button title="View"
                    data-player-name={player.name} data-player-id={player._id} 
                    on:click={viewPlayer}
                    class="view-button small-button"><MdGridOn /></button>
                <button  title="Remove"
                    data-player-name={player.name} data-player-id={player._id} 
                    on:click={removePlayer}
                    class="remove-button small-button"><MdClose /></button>
            </div>
        </div>
    {/each}

</ExpansionPanel>