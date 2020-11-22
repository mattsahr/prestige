<script>
    import { modalUX } from '../../store/store';
    import Modal from './Modal.svelte';
    import PlayerForm from '../PlayerForm.svelte';
    import GoalPanel from './GoalPanel.svelte';
    import CreateGameDialog from './CreateGameDialog.svelte';
    import ConfirmRemovePlayer from './ConfirmRemovePlayer.svelte';
    import ConfirmGameRosterReset from './ConfirmGameRosterReset.svelte';
    import TurnOverview from './TurnOverview.svelte';
    import TurnState from './TurnState.svelte';
    import Rules from './RulesPage.svelte';

    $: showIntro = $modalUX.initPlayer.show;
    $: exitedGame = $modalUX.initPlayer.exitedGame || '';
    $: showCreateGame = $modalUX.createGame.show;
    $: createGameName = $modalUX.createGame.rosterName;
    $: warnNameChange = $modalUX.warnNameChange.show;
    $: confirmPlayerRemove = $modalUX.confirmPlayerRemove.show;
    $: confirmGameRosterReset = $modalUX.confirmGameRosterReset.show;
    $: chooseGoals = $modalUX.chooseGoals.show;
    $: viewTurns = $modalUX.viewTurns.show;
    $: viewRules = $modalUX.viewRules.show;
    $: viewTurnState = $modalUX.turnState.show;

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

    const handleCloseGameResetter = () => {
        modalUX.set({
            ...$modalUX,
            confirmGameRosterReset: {
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

    const handleCloseTurnViewer = () => {
        modalUX.set({
            ...$modalUX,
            viewTurns: {
                show: false
            }
        });
    };

    const handleCloseRulesViewer = () => {
        modalUX.set({
            ...$modalUX,
            viewRules: {
                show: false
            }
        });
    };

    const handleCloseTurnState = () => {
        modalUX.set({
            ...$modalUX,
            turnState: {
                 ...$modalUX.turnState,
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

{#if confirmGameRosterReset}
    <Modal on:close={handleCloseGameResetter}>
        <ConfirmGameRosterReset handleCloseGameResetter={handleCloseGameResetter} />
    </Modal>
{/if}

{#if chooseGoals}
    <Modal>
        <GoalPanel modal={true} handleCloseGoalChooser={handleCloseGoalChooser} />
    </Modal>
{/if}

{#if viewTurns}
    <Modal modalClass="wide" on:close={handleCloseTurnViewer}>
        <TurnOverview modal={true} handleClosePanel={handleCloseTurnViewer} />
    </Modal>
{/if}

{#if viewRules}
    <Modal modalClass="wide" on:close={handleCloseRulesViewer}>
        <Rules modal={true} handleClosePanel={handleCloseRulesViewer} />
    </Modal>
{/if}

{#if viewRules}
    <Modal modalClass="wide" on:close={handleCloseRulesViewer}>
        <Rules modal={true} handleClosePanel={handleCloseRulesViewer} />
    </Modal>
{/if}

{#if viewTurnState}
    <Modal on:close={handleCloseTurnState}>
        <TurnState handleClosePanel={handleCloseTurnState} />
    </Modal>
{/if}
