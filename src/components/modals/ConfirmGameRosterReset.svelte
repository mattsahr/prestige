 <style>
    .player-name {
        margin: 0 4px;
        font-size: 1.2em;
        font-weight: bold;
    }
</style>

<script>
    import { gStore, modalUX, rosterName } from '../../store/store';

    export let handleCloseGameResetter = () => false;

    const actuallyResetGameRoster = () => {
        // gStore.roster.resetAll();

        // modalUX.showConfirmGameRosterReset();


        // modalUX.set({
        //     ...$modalUX,
        //     confirmGameRosterReset: {
        //         show: false
        //     }
        // }); 

        modalUX.chooseGoals($rosterName, 'resetCurrentGame');

    };

</script>


<div class="modal-standard">
    <div class="message">
        Reset the game for 
        <span class="player-name">ALL PLAYERS</span>?
    </div>
    <div class="button-section">
        <button class="warning" on:click={actuallyResetGameRoster}>Confirm</button>
        <button on:click={handleCloseGameResetter}>Cancel</button>
    </div>
</div>