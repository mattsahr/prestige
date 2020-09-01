<script>
    import { modalUX } from '../../store/store';
    import Modal from './Modal.svelte';
    import PlayerForm from '../PlayerForm.svelte';
    import GoalPanel from '../GoalPanel.svelte';
    import CreateGameDialog from '../CreateGameDialog.svelte';
    import ConfirmRemovePlayer from './ConfirmRemovePlayer.svelte';

    $: showIntro = $modalUX.initPlayer.show;
    $: exitedGame = $modalUX.initPlayer.exitedGame || '';
    $: showCreateGame = $modalUX.createGame.show;
    $: createGameName = $modalUX.createGame.rosterName;
    $: warnNameChange = $modalUX.warnNameChange.show;
    $: confirmPlayerRemove = $modalUX.confirmPlayerRemove.show;
    $: chooseGoals = $modalUX.chooseGoals.show;

    const handlePlayOffline = () => {
        modalUX.set({
            ...$modalUX,
            initPlayer: {
                show: false
            },
            createGame: {
                ...$modalUX.createGame,
                show: false
            }
        });
    };

    const handleCloseRosterWarning = () => {
        modalUX.set({
            ...$modalUX,
            warnNameChange: {
                show: false
            }
        });
    };

    const handleClosePlayerRemover = () => {
        modalUX.set({
            ...$modalUX,
            confirmPlayerRemove: {
                ...$modalUX.confirmPlayerRemove,
                show: false
            }
        });
    };

    const handleCloseGoalChooser = () => {
        modalUX.set({
            ...$modalUX,
            chooseGoals: {
                show: false
            }
        });
    };

</script>

{#if showIntro}
    <Modal >
        <PlayerForm exitedGame={exitedGame} modal on:playOffline={handlePlayOffline} />
    </Modal>
{/if}

{#if showCreateGame}
    <Modal >
        <CreateGameDialog createGameName={createGameName} on:playOffline={handlePlayOffline} />
    </Modal>
{/if}


{#if warnNameChange}
    <Modal on:close={handleCloseRosterWarning}>
        <div>
            Watch it mister, your details are logged etc.  
            Do you want to leave this game?
        </div>
    </Modal>
{/if}


{#if confirmPlayerRemove}
    <Modal on:close={handleClosePlayerRemover}>
        <ConfirmRemovePlayer handleClosePlayerRemover={handleClosePlayerRemover} />
    </Modal>
{/if}

{#if chooseGoals}
    <Modal>
        <GoalPanel modal={true} handleCloseGoalChooser={handleCloseGoalChooser} />
    </Modal>
{/if}
