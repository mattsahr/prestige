import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';
import { derived, get, writable } from 'svelte/store';
import { 
    DUMMY_ID, 
    NETWORK, 
    PLOT_TYPE, 
    SPACER, 
    ZERO_SCORE, 
    STARTING_SCORE 
} from '../utility/constants';
import modalUXStore from './modal-ux-store';
import dashboardUXStore from './dashboard-ux-store';
import { 
    composeBaseGameState, 
    boardState, 
    composeLocalId, 
    composeNewBoard, 
    getLocalHash,
    getRandomGoals,
    preGameTurnZero,
    updateTurns
} from '../utility/helpers';
import { calculateScore } from '../utility/scores';
import { get as storeGet } from 'svelte/store';
import network from '../utility/network';

export const modalUX = modalUXStore;
export const dashboardUX = dashboardUXStore;

const createGameStore = () => {
    const { subscribe, set, update } = writable({});
    const gameState = composeBaseGameState();
    set(gameState);

    const updateGame = () => {
        const updated = _cloneDeep(gameState);
        set(updated);
        // update(() => updated);
    };

    const fromNetwork = {
        roster: { 
            exited: data => { console.log('STORE >> fromNetwork.roster.exited', data); },
            found: (rosterName, rosterData) => { 
                gameState.networkRosterState = _cloneDeep(rosterData);
                gameState.rosterName = rosterName;
                updateGame();
                sendToNetwork.roster.actuallyJoin(rosterData);
            },
            joined: data => { console.log('STORE >> fromNetwork.roster.joined', data); },
            notFound: (rosterName, data) => { 
                console.log('STORE >> fromNetwork.roster.notFound', rosterName, data); 

                const modalux = _cloneDeep(storeGet(modalUX));
                modalux.createGame = {
                    show: true,
                    rosterName
                };
                modalux.initPlayer = { show: false };

                console.log('newUX!', modalux);

                modalUX.set(modalux);
            },
            update: (() => {

                const checkSelfKickedOut = networkRosterState => {
                    if (!gameState.joined) {
                        // can't be kicked out til you've joined.
                        return false;
                    }
                    const localPlayer = PLAYER.getLocal();
                    const kickedOut = !networkRosterState.players.includes(localPlayer._id);
                    if (kickedOut) {
                        globalReset();
                        return true;
                    }

                    return false;
                };

                const removeOrphans = networkPlayers => {

                    const localPlayer = PLAYER.getLocal();
                    const toRemove = {};

                    for (const player of gameState.players) {
                        if (!networkPlayers.includes(player._id)) {
                            network.player.remove(player._id, localPlayer);
                            network.board.remove(player._id, localPlayer);
                            toRemove[player._id] = true;
                        }
                    }
                    gameState.players = gameState.players.filter(player => !toRemove[player._id]);
                    gameState.boards = gameState.boards.filter(board => !toRemove[board._id]);
                };

                const addNewPlayers = networkPlayers => {
                    const localPlayer = PLAYER.getLocal();

                    console.log('gameStore roster addNewPlayers', networkPlayers);
                    
                    const playersToAdd =  networkPlayers
                        .filter(playerId => !(
                            gameState.players.find(player => player._id === playerId))
                        );


                    for (const playerId of playersToAdd) {
                        network.player.watch(playerId);
                        network.board.watch(playerId);
                        network.player.ping(playerId, localPlayer);
                        network.board.ping(playerId, localPlayer);
                    }

                };

                const confirmJoined = (networkRosterState) => {
                    const { players } = networkRosterState;
                    const localPlayer = PLAYER.getLocal();
                    if (players.includes(localPlayer._id)) {
                        gameState.joined = true;
                    } else {
                        sendToNetwork.roster.actuallyJoin(networkRosterState);
                    }
                };

                const checkRoster = networkRosterState => {
                    if (gameState.rosterName !== networkRosterState.name) {
                        console.log('>>>>> -------------- <<<<<');
                        console.error('ROSTERNAME MISMATCH');
                        console.log('networkRosterState', networkRosterState);
                        console.log('gameState', gameState);
                        console.log('>>>>> -------------- <<<<<');
                    }
                    return gameState.rosterName === networkRosterState.name;
                };

                const checkTurnAdvanced = networkRosterState => {
                    const localTurns = gameState.turns 
                        ? gameState.turns.played.length
                        : 0;
                    const networkTurns = networkRosterState.turns.played.length;

                    return networkTurns > localTurns;
                };

                return (networkRosterState) => {

                    if (!checkRoster(networkRosterState)) {
                        return;
                    }

                    if (checkSelfKickedOut(networkRosterState)) {
                        return;
                    }
                    const turnAdvanced = checkTurnAdvanced(networkRosterState);

                    console.log('ROSTER UPDATE advanced?', turnAdvanced);
                    console.log('networkRosterState', networkRosterState);
                    console.log('gameState', gameState);

                    gameState.networkRosterState = _cloneDeep(networkRosterState);
                    gameState.rosterName = networkRosterState.name;
                    gameState.rosterAdminId = networkRosterState.admin;
                    gameState.turns = _cloneDeep(networkRosterState.turns);
                    gameState.goals = _cloneDeep(networkRosterState.goals);

                    confirmJoined(networkRosterState);
                    removeOrphans(networkRosterState.players);
                    addNewPlayers(networkRosterState.players);

                    modalUX.closeRosterModals();
                    updateGame();

                    if (turnAdvanced) {
                        // modalUX.notifyTurn(gameState.turns);
                        console.log('turnAdvanced, dashboard.notify (gameState)', gameState);
                        dashboardUX.notifyTurn(gameState, 'turnAdvanced');
                    }
                };
            })()
        },

        board: {
            update: (boardId, board) => { 
                const priorBoard = gameState.boards.find(next => next._id === board._id);
                if (priorBoard) {
                    if (_isEqual(priorBoard.state, board.state) && 
                        priorBoard.bonus === board.bonus
                    ) {
                        return;
                    }
                    priorBoard.state = board.state;
                    priorBoard.bonus = board.bonus;
                } else {
                    gameState.boards.push(board);
                }

                SCORE.update(board._id);

                if (!priorBoard) {
                    dashboardUX.notifyTurn(gameState);
                }
                updateGame();
            }
        },

        player: {
            found: data => { console.log('STORE >> fromNetwork.player.found', data); },
            notFound: data => { console.log('STORE >> fromNetwork.player.notFound', data); },
            update: playerData => { 
                if (!playerData) {
                    return;
                }

                const index = gameState.players.findIndex(player => player._id === playerData._id);

                /*
                console.log('STORE >> fromNetwork.player.update', 'index [' + index + ']',
                    playerData.name
                 );
                */

                if (index === -1) {
                    gameState.players.push(playerData);
                } else {
                    gameState.players[index] = playerData;
                }
                updateGame();
            }
        }
    };

    network.connectStore(fromNetwork);

    const sendToNetwork = {

        board: {
            update: board => {
                const localPlayer = PLAYER.getLocal();
                network.board.update(board, localPlayer);
            },
            watchStop: boardId => {
                const localPlayer = PLAYER.getLocal();
                network.board.watchStop(boardId, localPlayer);
            },
            watchAndPing: boardId => {
                const localPlayer = PLAYER.getLocal();
                network.board.watch(boardId);
                setTimeout(() => {
                    network.board.ping(boardId, localPlayer);
                }, 100);
            }
        },

        roster: {
            pingToJoin: newRosterName => {
                const localPlayer = PLAYER.getLocal();
                network.roster.watchStop(gameState.rosterName);
                network.roster.ping(newRosterName, localPlayer);
            },
            update: rosterData => {
                const localPlayer = PLAYER.getLocal();
                network.roster.update(rosterData, localPlayer);
                console.log('STORE sendToNetwork roster update!', rosterData.name, rosterData);
            },
            actuallyJoin: (rosterData) => {
                const localPlayer = PLAYER.getLocal();
                if (rosterData.banned && rosterData.banned.includes(localPlayer._id)) {
                    // not allowed to join

                    console.error('TODO -- > MESSAGE ABOUT BEING BANNED FROM A GAME');
                    return;
                }

                if (!rosterData.players.includes(localPlayer._id)) {
                    rosterData.players.push(localPlayer._id);
                }
                network.roster.update(rosterData, localPlayer);
            },
            removePlayer: (rosterData, playerToRemove) => {
                console.error('sendToNetwork.roster.removePlayer() NOT IN USE');
                console.log('roster', rosterData, '  attempted to remove', playerToRemove);
                // const localPlayer = PLAYER.getLocal();
                // network.roster.update(roster, localPlayer); 
            },

            resetAllBoards: gameState => {
                for (const board of gameState.boards) {
                    network.board.update({
                        _id: board._id,
                        bonus: 0,
                        state: composeNewBoard()
                    });
                }                
            },
            create: rosterData => {
                const localPlayer = PLAYER.getLocal();
                network.roster.update(rosterData, localPlayer);
            },
            watchStop: rosterName => {
                const localPlayer = PLAYER.getLocal();
                network.roster.watchStop(rosterName, localPlayer);
            }
        },

        player: {
            update: newPlayer => {
                const localPlayer = PLAYER.getLocal();
                network.player.update(newPlayer, localPlayer);
            },
            removeLocal: oldPlayer => { 
                const localPlayer = PLAYER.getLocal();
                network.player.remove(oldPlayer._id, localPlayer); 
                network.board.remove(oldPlayer._id, localPlayer);
            },
            remove: player => {
                console.error('sendToNetwork.player.remove() NOT IN USE');
                console.log('Attemtped to remove:', player);
                // sendToNetwork.roster();
                // const localPlayer = PLAYER.getLocal();
                // network.player.remove(oldPlayer._id, localPlayer); 
                // network.board.remove(oldPlayer._id, localPlayer);
            },
            watchStop: playerId => {
                const localPlayer = PLAYER.getLocal();
                network.player.watchStop(playerId, localPlayer);
            }
        }

    };

    const globalReset = () => {

        console.log('GLOBAL RESET!!!');

        sendToNetwork.roster.watchStop(gameState.rosterName);
        for (const _id of gameState.players.map(player => player._id)) {
            if (_id !== gameState.___localPlayerId) {
                sendToNetwork.player.watchStop(_id);
                sendToNetwork.board.watchStop('_id');
            }
        }

        const exitedGame = gameState.rosterName;

        const newBoard = composeNewBoard(gameState.___localPlayerId);
        sendToNetwork.board.update(newBoard);

        gameState.boards = [ composeNewBoard(gameState.___localPlayerId) ];
        gameState.players = [ 
            gameState.players.find(player => player._id === gameState.___localPlayerId )
        ];
        gameState.scores = { [gameState.___localPlayerId]:  _cloneDeep(STARTING_SCORE) };
        gameState.rosterName = '';
        gameState.rosterAdminId = '';
        gameState.turns = { played: [ preGameTurnZero ] };
        gameState.goals = getRandomGoals();
        gameState.networkRosterState = null;
        gameState.joined = false;
        updateGame();
        modalUX.alertExit(exitedGame);

        console.log('RESET GAME STATE', gameState);
    };


    const BOARD = {
        remove: id => {
            gameState.boards = gameState.boards.filter(board => board._id !== id);
        },
        getLocal: () => { 
            return gameState.boards
                .find(board => board._id === gameState.___localPlayerId);
        },
        postJoinUpdate: () => {
            setTimeout(() => {
                const localBoard = BOARD.getLocal();
                console.log('postJoinUpdate', localBoard._id, localBoard);
                sendToNetwork.board.update(localBoard);
            }, 1500);
        },
        update: (playerId, plotId, plotType, option) => {
            console.log('updateBoard', plotId, plotType);

            const board = gameState.boards.find(board => board._id === playerId);
            board.state = boardState.update(board.state, plotId, plotType);

            SCORE.update(playerId);

            updateGame();

            if (option !== NETWORK.FROM_NETWORK) {
                sendToNetwork.board.update(board);
            }
        },
        updateBonus: (num, option) => {
            const id = gameState.___localPlayerId;
            const board = gameState.boards.find(board => board._id === id);
            board.bonus = num;

            SCORE.update(id);
            updateGame();

            if (option !== NETWORK.FROM_NETWORK) {
                sendToNetwork.board.update(board);
            }
        }
    };

    const ROSTER = {
        resetAll: option => {
            // for (const key of Object.keys(gameState.scores)) {
            //     gameState.scores[key] = {...ZERO_SCORE};
            // }

            // for (const board of gameState.boards) {
            //     delete board.state;
            // }


            // updateGame();


            console.group('resetAll');
            console.log(gameState);
            console.groupEnd();

            modalUX.closeRosterModals();

            if (option !== NETWORK.FROM_NETWORK) {

                const rosterData = _cloneDeep(gameState.networkRosterState);
                gameState.turns = rosterData.turns = updateTurns(); // NEW DECK, FROM ZERO

                sendToNetwork.roster.resetAllBoards(gameState);
                sendToNetwork.roster.update(rosterData);
            }

        },
        join: rosterName => {
            if (gameState.rosterName !== rosterName) {
                gameState.rosterName = rosterName;
                gameState.rosterJoined = false;

                const localPlayer = PLAYER.getLocal();
                sendToNetwork.player.update(localPlayer);

                sendToNetwork.roster.pingToJoin(rosterName);
            }
        },
        create: rosterName => {
            const localPlayer = PLAYER.getLocal();
            const localBoard = BOARD.getLocal();
            const newRoster = {
                name: rosterName,
                players: [ gameState.___localPlayerId ],
                admin: gameState.___localPlayerId,
                goals: gameState.goals,
                turns: updateTurns()
            };

            sendToNetwork.roster.update(newRoster);
            sendToNetwork.board.update(localBoard);
            sendToNetwork.player.update(localPlayer);

            gameState.rosterName = rosterName;
            gameState.rosterJoined = true;
            updateGame();
        },
        advanceTurn: () => {
            const rosterData = _cloneDeep(gameState.networkRosterState);
            rosterData.turns = updateTurns(rosterData.turns);
            sendToNetwork.roster.update(rosterData);
        }
    };

    const PLAYER = {
        updateLocal: (() => {

            const getLocalPlayerByHash = () => gameState.players
                .find(player => player._id.split(SPACER)[1] === getLocalHash());

            const noChange = (playerName, cityName, rosterName) => {
                const currentLocalPlayer = getLocalPlayerByHash();

                return currentLocalPlayer && 
                    currentLocalPlayer.name === playerName && 
                    currentLocalPlayer.city === cityName && 
                    gameState.rosterName === rosterName;
            };

            const removeLocalPlayer = oldPlayer => {
                // const oldPlayer = _cloneDeep(player);
                sendToNetwork.player.removeLocal(oldPlayer);
                BOARD.remove(oldPlayer._id);

                SCORE.remove(oldPlayer._id);            
            };

            return (playerName, cityName, rosterName) => {

                /*
                console.group('STORE >> PLAYER.updateLocal');
                console.log('playerName', playerName);
                console.log('cityName', cityName);
                console.log('rosterName', rosterName);
                console.groupEnd();
                */

                if (noChange(playerName, cityName, rosterName)) {
                    return;
                }

                const currentLocalPlayer = getLocalPlayerByHash();
                let player;

                const playerChanged = currentLocalPlayer && 
                    currentLocalPlayer.name !== currentLocalPlayer.name;

                if (playerChanged) {
                    player = _cloneDeep(currentLocalPlayer);
                    removeLocalPlayer(currentLocalPlayer);
                    player.name = playerName;
                    player._id = composeLocalId(playerName);
                    player.city = cityName;
                } else {
                    player = {
                        name: playerName,
                        _id: composeLocalId(playerName),
                        city: cityName
                    };
                    sendToNetwork.player.update(player);
                    gameState.players.push(player);
                }

                gameState.___localPlayerId = player._id;

                let board = gameState.boards.find(board => board._id === player._id);

                if (!board) {
                    board = composeNewBoard(player._id);
                    gameState.boards.push(board);
                    sendToNetwork.board.watchAndPing(board._id);
                    BOARD.postJoinUpdate();

                    // THIS OPTION NUKES THE BOARD BACK TO BASELINE
                    // sendToNetwork.board.update(board);
                }

                gameState.scores[player._id] = calculateScore(board);

                ROSTER.join(rosterName);


                updateGame();

                console.groupCollapsed('addPlayer');
                console.log('playerId', player._id);
                console.log('playerName', playerName);
                console.log('board', gameState.boards.find(board => board._id === player._id));
                console.log('gameState', gameState);
                console.groupEnd();
            };
        })(),
        getLocal: () => gameState.players
            .find(player => player._id === gameState.___localPlayerId),
        remove: (playerToRemove) => {
            BOARD.remove(playerToRemove._id);
            SCORE.remove(playerToRemove._id);
            gameState.players = gameState.players
                .filter(nextPlayer => nextPlayer._id !== playerToRemove._id);

            updateGame();


            const rosterUpdate = _cloneDeep(gameState.networkRosterState);
            rosterUpdate.players = rosterUpdate.players
                .filter(playerId => playerId !== playerToRemove._id);

            console.log('networkRosterState', gameState.networkRosterState);
            console.log('gameState', gameState);
            console.log('updated players [' + rosterUpdate.players.length +']  ', 
                rosterUpdate.players.map(playerId => playerId.split('_')[0]).join(', ')
            );

            sendToNetwork.roster.update(rosterUpdate);
        }
    };

    const SCORE = {
        remove: id => {
            delete gameState.scores[id];
        },
        update: id => {
            const board = gameState.boards.find(board => board._id === id);
            gameState.scores[id] = calculateScore(board);
        }
    };

    const GOALS = {
        generateRandom: () => {
            const { goalCodes } = getRandomGoals();
            gameState.goals = goalCodes;
            updateGame();
        }
    };

    const get = { 
        self: () => gameState.___localPlayerId,
        scores: () => _cloneDeep(gameState.scores),
        score: playerId => playerId ? {...gameState.scores[playerId]} : {...STARTING_SCORE},
        player: playerId => gameState.players.find(player => player._id === playerId),
        board: playerId => playerId 
            ? _cloneDeep(gameState.boards.find(board => board._id === playerId).state)
            : boardState.composeNew(),
        turns: () => gameState.turns
    };

    return {
        roster: ROSTER, // create, reset
        board: BOARD, // update, updateBonus
        player: PLAYER, // update
        score: SCORE,
        goals: GOALS,

        get,
        set,
        subscribe,
        update
    };
};

export const gStore = createGameStore();

export const localPlayerId = derived(
    gStore,
    gStore => gStore.___localPlayerId
);

export const localPlayerName = derived(
    gStore,
    gStore => gStore.players.find(player => player._id === gStore.___localPlayerId).name
);

export const localCityName = derived(
    gStore,
    gStore => gStore.players.find(player => player._id === gStore.___localPlayerId).city
);

export const rosterName = derived(
    gStore,
    gStore => gStore.rosterName
);

export const localPlayerIsAdmin = derived (
    gStore,
    gStore => (gStore.rosterAdminId === gStore.___localPlayerId)
);

export const localBoard = (() => {

    const dummyBoard = {
        _id: DUMMY_ID,
        state: gStore.get.board()
    };

    return derived(
        gStore,
        gStore => gStore.___localPlayerId 
            ? gStore.boards.find(board => board._id === gStore.___localPlayerId)
            : dummyBoard
    );

})(); 

export const boards = derived(
    gStore,
    gStore => gStore.boards
);

export const players = derived(
    gStore,
    gStore => gStore.players
);

export const scores = derived(
    gStore,
    gStore => gStore.scores
);

export const goals = derived(
    gStore,
    gStore => gStore.goals
);

export const localBonus = derived(
    gStore,
    gStore => gStore.scores[gStore.___localPlayerId].localBonus
);

export const currentTerrain = writable(PLOT_TYPE.PARKS);

const createTurnStore = () => {

    const {subscribe, set, update } = writable({
        played: [ preGameTurnZero ]
    });

    let TURNS;

    gStore.subscribe(gameState => { 
        if (!_isEqual(TURNS, gameState.turns)) {
            TURNS = gameState.turns;
            set(TURNS);
        }
    });

    return {
        subscribe,
        set,
        update
    };
};

export const turns = createTurnStore();



const createOpponentsStore = () => {
    const {subscribe, set, update } = writable({
        showBoards: false,
        featuredBoard: null,
        showFeatured: false
    });

    let UX;
    subscribe(ux => UX = ux);

    const toggleShowOpponents = () => {
        const updated = _cloneDeep(UX);
        updated.showBoards = !updated.showBoards;
        if (updated.showBoards) {
            updated.showFeatured = false;
        }
        set(updated);
    };

    const feature = {
        clearSource: () => {
            const updated = _cloneDeep(UX);
            if (updated.featuredBoard && updated.featuredBoard.source) {
                delete updated.featuredBoard.source;
            }
            set(updated);
        },
        close: () => {
            const updated = _cloneDeep(UX);
            updated.showFeatured = false;
            set(updated);
        },
        show: featuredBoard => {
            const updated = _cloneDeep(UX);
            updated.featuredBoard = featuredBoard;
            updated.showFeatured = true;
            set(updated);
        }
    };

    const get = {
        boards: () => get(boards),
        players: () => get(players),
        scores: () => get(scores),
        showBoards: () => UX.showBoards
    };

    return {
        feature,
        toggleShowOpponents,
        get,

        subscribe,
        set,
        update
    };
};

export const opponentsUX = createOpponentsStore();


const creatAdminStore = () => {
    const {subscribe, set, update } = writable({
        showDrawer: false,
        theme: 'Default'
    });

    let UX;
    subscribe(ux => UX = ux);

    const toggleDrawer = () => {
        const updated = _cloneDeep(UX);
        updated.showDrawer = !updated.showDrawer;
        set(updated);        
    };

    const updateTheme = theme => {
        const updated = _cloneDeep(UX);
        updated.theme = theme;
        set(updated);
    };

    return {
        toggleDrawer,
        updateTheme,

        subscribe,
        set,
        update
    };
};

export const adminUX = creatAdminStore();
