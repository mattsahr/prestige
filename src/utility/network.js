import { 
    DUMMY_ID,
    NETWORK
} from './constants';
import { 
    composeLocalId,
    initHelpers, 
    serializeBoardState, 
    hydrateBoardState 
} from './helpers';

const network = (() => {
    let FB = null;
    let globalData = null;
    let sendToGameStore = null;

    const init = (sourceFB, sourceData) => {

        if (!sourceFB) {
            console.error('FIREBASE IS DOWN?', sourceFB, sourceDatata);
        }

        FB = sourceFB;
        globalData = sourceData;
        initHelpers(sourceFB, sourceData);
    };

    const player = {
        watchers: {},
        watch: playerId => { if (!playerId || playerId === DUMMY_ID) { return; }
            player.watchers[playerId] = FB.collection('player').doc(playerId)
                .onSnapshot(player => {
                    sendToGameStore.player.update(player.data());
                });
        },
        watchStop: playerId => {
            if (player.watchers[playerId]) { 
                player.watchers[playerId](); 
                delete player.watchers[playerId];
            }
        },
        ping: (playerId, localPlayer) => {
            if (!playerId || playerId === DUMMY_ID || localPlayer._id === DUMMY_ID) { return; }
            FB.collection('player').doc(playerId).get().then(playerDoc => {
                if (playerDoc.exists) {
                    sendToGameStore.player.update(playerDoc.data());
                }
            });
        },
        remove: (playerId, localPlayer) => {  
            if (!playerId || playerId === DUMMY_ID || localPlayer._id === DUMMY_ID) { return; }
            player.watchStop(playerId);
            // NO!  JUST REMOVE FROM ROSTER  -- FB.collection('player').doc(playerId).delete();
        },
        update: (updatedPlayer, localPlayer) => { 
            if (!updatedPlayer || updatedPlayer._id === DUMMY_ID || localPlayer._id === DUMMY_ID) { return; }
            player.watch(updatedPlayer._id);
            FB.collection('player').doc(updatedPlayer._id).set(updatedPlayer);
        }
    };

    const roster = {
        watchers: {},

        watch: rosterName => {
            if (roster.watchers[rosterName]) {
                return;
            }
            roster.watchers[rosterName] = FB.collection('roster').doc(rosterName)
                .onSnapshot(roster => {
                    console.log('WATCH roster', roster.data());
                    sendToGameStore.roster.update(roster.data());
                });
        },

        watchStop: rosterName => {
            if (roster.watchers[rosterName]) {
                roster.watchers[rosterName]();
                delete roster.watchers[rosterName];
            }
        },

        ping: (rosterName, localPlayer) => { if (localPlayer._id === DUMMY_ID) { return; }
            console.log('NETWORK >> attempt to join game: ', rosterName);
            console.log('is dummy?', (localPlayer._id === DUMMY_ID), localPlayer);

            FB.collection('roster').doc(rosterName).get().then(rosterDoc => {
                if (rosterDoc.exists) {
                    console.log('ping got roster', rosterName, rosterDoc.data());
                    sendToGameStore.roster.found(rosterName, rosterDoc.data());
                    // return rosterDoc.data();

                } else {
                    sendToGameStore.roster.notFound(rosterName, rosterDoc);
                    console.log('GAME NOT FOUND', rosterDoc);
                    // return NETWORK.GAME_NOT_FOUND;
                }

            });
        },
        remove: (rosterName, localPlayer) => {  if (localPlayer._id === DUMMY_ID) { return; }
            roster.watchStop(rosterName);
            FB.collection('roster').doc(rosterName).delete();
        },
        update: (updatedRoster, localPlayer) => { if (localPlayer._id === DUMMY_ID) { return; }
            console.log('NETWORK roster.update', updatedRoster);
            roster.watch(updatedRoster.name);
            FB.collection('roster').doc(updatedRoster.name)
                .set(updatedRoster);
        }
    };

    const board = {

        watchers: {},

        watch: boardId => {
            if (boardId === DUMMY_ID) { return; }
            if (board.watchers[boardId]) {
                return;
            }
            console.log('BOARD WATCH', boardId);
            if (!boardId) {
                console.error('NO BOARD ID');
            }

            board.watchers[boardId] = FB.collection('board').doc(boardId)
                .onSnapshot(boardDoc => {
                    const { _id, state, bonus } = boardDoc.data();
                    const hydrated = hydrateBoardState(state);

                    sendToGameStore.board.update(
                        _id, 
                        { _id, bonus, state: hydrated }
                    );
                });
        },
        watchStop: boardId => {
            if (board.watchers[boardId]) { 
                board.watchers[boardId](); 
                delete board.watchers[boardId];
            }
        },
        ping: (boardId, localPlayer) => {
            if (boardId === DUMMY_ID || localPlayer._id === DUMMY_ID) { return; }
            FB.collection('board').doc(boardId).get().then(boardDoc => {
                if (boardDoc.exists) {
                    const { _id, state, bonus } = boardDoc.data();
                    const hydrated = hydrateBoardState(state);

                    sendToGameStore.board.update(
                        _id, 
                        { _id, bonus, state: hydrated }
                    );
                }
            });
        },
        remove: boardId => {
            if (boardId === DUMMY_ID) { return; }
            board.watchStop(boardId);
            FB.collection('board').doc(boardId).delete().then(() => {
                console.log("FB - Board successfully deleted!");
            }).catch(error => {
                console.error("FB - Error removing document: ", error);
            });
        },
        update: updatedBoard => {
            if (updatedBoard._id === DUMMY_ID) { return; }
            board.watch(updatedBoard._id);
            const serialized = serializeBoardState(updatedBoard.state);

            FB.collection('board').doc(updatedBoard._id)
                .set({ ...updatedBoard, state: serialized })
                .then(() => {
                    console.log('board updated!', updatedBoard._id);
                }).catch(error => {
                    console.error('Error making board', error, updatedBoard);
                });

            /*        
            const original = JSON.parse(JSON.stringify(board.state));
            const serialized = serializeBoardState(board.state);
            const hydrated = hydrateBoardState(serialized);

            console.group('Board States');
            console.log('board', board);
            console.log('original', original);
            console.log('serialized', serialized);
            console.log('hydrated', hydrated);
            console.log('EQUAL?', (_isEqual(original, hydrated))  );
            console.groupEnd();
            */

        }
    };

    const connectStore = storeGetFromNetwork => { sendToGameStore = storeGetFromNetwork; };

    return { 
        board,
        connectStore,
        roster,
        init,
        player
    };
})();

export default network;
