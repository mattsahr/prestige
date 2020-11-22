import _cloneDeep from 'lodash/cloneDeep';
import { writable } from 'svelte/store';
import { ERA_META } from '../utility/constants';
import { getTargetPlayerId } from '../utility/helpers';

const createDashboardStore = () => {

    const { subscribe, set, update } = writable({
        open: false,
        turnTargets: {},
        audioVolume: 0.8
    });

    let UX;
    subscribe(ux => UX = ux);

    const audioCache = {};

    const open = () => {
        const updated = _cloneDeep(UX);
        updated.open = true;
        set(updated);
    };

    const close = () => {
        const updated = _cloneDeep(UX);
        updated.open = false;
        set(updated);
    };

    const toggleOpenClosed = () => {
        const updated = _cloneDeep(UX);
        updated.open = !updated.open;
        set(updated);
    };

    const setTurnTarget = (turnNo, targetPlayerId) => {
        const updated = _cloneDeep(UX);
        updated.turnTargets = {
            ...updated.turnTargets,
            [turnNo]: targetPlayerId
        };
        set(updated);
    };

    const notifyTurn = (() => {
        const shouldGetTarget = gameState => {
            const latestTurn = gameState.turns.played[gameState.turns.played.length - 1];
            const eraID = latestTurn.split('__')[0];
            const era = ERA_META.find(next => next.era_id === eraID);
            return era.targetPlayer;
        };
        
        const getCurrentTarget = gameState => {

            return getTargetPlayerId(
                gameState.boards, 
                gameState.scores, 
                gameState.___localPlayerId
            );
        };

        const didTurnAdvance = (gameState, UX, option) =>
            (option === 'turnAdvanced') || 
            (gameState.turns.played.length > UX.turnCount);

        const getCurrentTurnIndex = gameState =>
            (gameState.turns.played.length - 1);

        return (gameState, option) => {
            const willTarget = shouldGetTarget(gameState);
            const turnAdvanced = didTurnAdvance(gameState, UX, option);

            console.log('dashboard notify willTarget', willTarget, '  advanced', turnAdvanced);

            if (willTarget || turnAdvanced) {
                const updated = _cloneDeep(UX);

                if (turnAdvanced) {
                    updated.open = true;
                }

                if (willTarget) {
                    updated.turnTargets = {
                        ...updated.turnTargets,
                        [getCurrentTurnIndex(gameState)]: getCurrentTarget(gameState)
                    };
                }

                set(updated);

            }
        };

    })(); 

    const registerAudio = audioFile => {
        audioCache.baseFile = audioFile;
    };

    const testAudio = () => {
        if (audioCache.baseFile) {
            audioCache.baseFile.play();
        }
    };

    let audioTestTimer = null;

    const setAudioVolume = (volume, option) => {
        const updated = _cloneDeep(UX);
        updated.audioVolume = volume || 0;
        set(updated);

        clearTimeout(audioTestTimer);

        if (option !== 'silent') {
            audioTestTimer = setTimeout(testAudio, 100);
        }

    };

    return {
        close,
        notifyTurn,
        open,
        registerAudio,
        setAudioVolume,
        testAudio,
        setTurnTarget,
        toggleOpenClosed,

        subscribe,
        set,
        update
    };
};

const dashboardUX = createDashboardStore();

export default dashboardUX;
