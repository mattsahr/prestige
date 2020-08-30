<style>
    .player-name {
        margin: 0 4px;
        font-size: 1.2em;
        font-weight: bold;
    }
</style>

<script>
    import { gStore, modalUX } from '../../store/store';

    export let handleClosePlayerRemover = () => false;

    /*
    const handleClosePlayerRemover = () => {
        modalUX.set({
            ...$modalUX,
            confirmPlayerRemove: {
                ...$modalUX.confirmPlayerRemove,
                show: false
            }
        });
    };
    */

    const actuallyRemovePlayer = () => {
        const player = gStore.get.player($modalUX.confirmPlayerRemove._id);
        gStore.player.remove(player);

        modalUX.set({
            ...$modalUX,
            confirmPlayerRemove: {
                show: false
            }
        });        
    };

</script>


<div class="modal-standard">
    <div class="message">
        Remove player 
        <span class="player-name">{$modalUX.confirmPlayerRemove.name}</span> 
        from the game?
    </div>
    <div class="button-section">
        <button class="warning" on:click={actuallyRemovePlayer}>Confirm</button>
        <button on:click={handleClosePlayerRemover}>Cancel</button>
    </div>
</div>