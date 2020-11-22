import _cloneDeep from 'lodash/cloneDeep';
import { writable } from 'svelte/store';
import { DICE_ORDER,  ERA_META, SPACER } from '../utility/constants';

const createModalStore = () => {
    const {subscribe, set, update } = writable({
        // GAME CREATION MODALS
        initPlayer: { show: true },
        createGame: {
            show: false,
            rosterName: ''
        },
        chooseGoals: { show: false },

        // OTHER MODALS
        warnNameChange: { show: false },
        exitGame: { show: false },
        confirmPlayerRemove: { show: false },
        confirmGameRosterReset: { show: false },
        viewTurns: { show: false },
        viewRules: { show: false },
        turnState: { show: false }
    });

    let UX;
    subscribe(ux => UX = ux);

    const alertExit = exitedGame => {
        const updated = _cloneDeep(UX);
        updated.initPlayer = { 
            show: true,
            exitedGame
        };
        set(updated);
    };

    const closeRosterModals = () => {
        const updated = _cloneDeep(UX);
        updated.initPlayer.show = false;
        updated.createGame.show = false;
        updated.chooseGoals.show = false;
        updated.confirmGameRosterReset.show = false;
        set(updated);
    };

    const showConfirmPlayerRemove = (_id, name) => {
        const updated = _cloneDeep(UX);
        updated.confirmPlayerRemove = {
            show: true,
            _id: _id,
            name: name
        };
        set(updated);
    };

    const showConfirmGameRosterReset = () => {
        const updated = _cloneDeep(UX);
        updated.confirmGameRosterReset = {
            show: true
        };
        set(updated);
    };

    const chooseGoals = (rosterName, option) => {
        const updated = _cloneDeep(UX);
        updated.initPlayer.show = false;
        updated.createGame.show = false;
        updated.confirmGameRosterReset.show = false;

        updated.chooseGoals.show = true;

        if (option  === 'resetCurrentGame') {
            updated.chooseGoals.resetCurrentGame = true;
        }
        if (rosterName) {
            updated.chooseGoals.rosterName = rosterName;
        }

        set(updated);
    };

    const showTurnOverview = () => {
        const updated = _cloneDeep(UX);
        updated.viewTurns.show = true;
        set(updated);
    };

    const showRules = () => {
        const updated = _cloneDeep(UX);
        updated.viewRules.show = true;
        set(updated);
    };

    const getLatestTurn = turns => {
        const [turnId, rollString] = turns.played[turns.played.length - 1].split(SPACER);

        const era = ERA_META.find(next => next.era_id === turnId);
        const rolls = {};

        rollString.split('').forEach((roll, index) => {
            rolls[DICE_ORDER[index]] = roll;
        });

        const turnCount = turns.played.length - 1;
        const show = true; // era.showDescription;
        return { era, rolls, show, turnCount };
    };

    const notifyTurn = turns => {
        const updated = _cloneDeep(UX);
        updated.turnState = { ...getLatestTurn(turns) };
        set(updated);
    };

    const showTurnState = () => {
        const updated = _cloneDeep(UX);
        updated.turnState = { ...updated.turnState, show: true };
        set(updated);        
    };

    const closeTurnState = () => {
        const updated = _cloneDeep(UX);
        updated.turnState = { ...updated.turnState, show: false };
        set(updated);        
    };


    return {
        closeRosterModals,
        showConfirmPlayerRemove,
        showConfirmGameRosterReset,
        chooseGoals,
        alertExit,
        showTurnOverview,
        showRules,

        notifyTurn,
        showTurnState,
        closeTurnState,

        subscribe,
        set,
        update
    };
};

const modalUX = createModalStore();

export default modalUX;
