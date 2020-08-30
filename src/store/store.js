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
import { 
    composeBaseGameState, 
    boardState, 
    composeLocalId, 
    composeNewBoard, 
    getLocalHash,
    getRandomGoals
} from '../utility/helpers';
import { calculateScore } from '../utility/scores';
import { get as storeGet } from 'svelte/store';
import network from '../utility/network';

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

                const removeOrphans = networkPlayers => {

                    const localPlayer = player.getLocal();
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
                    const localPlayer = player.getLocal();

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
                    const localPlayer = player.getLocal();
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

                return (networkRosterState) => {

                    console.log('gameStore fromNetwork update roster', networkRosterState);

                    if (!checkRoster(networkRosterState)) {
                        return;
                    }
                    gameState.networkRosterState = _cloneDeep(networkRosterState);
                    gameState.rosterName = networkRosterState.name;
                    gameState.rosterAdminId = networkRosterState.admin;
                    confirmJoined(networkRosterState);
                    removeOrphans(networkRosterState.players);
                    addNewPlayers(networkRosterState.players);

                    modalUX.closeRosterModals();
                    updateGame();
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

                score.update(board._id);
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
                const localPlayer = player.getLocal();
                network.board.update(board, localPlayer);
            }
        },

        roster: {
            pingToJoin: newRosterName => {
                const localPlayer = player.getLocal();
                network.roster.watchStop(gameState.rosterName);
                network.roster.ping(newRosterName, localPlayer);
            },
            update: rosterData => {
                const localPlayer = player.getLocal();
                network.roster.update(rosterData, localPlayer);
                console.log('STORE sendToNetwork roster update!', rosterData.name, rosterData);
            },
            actuallyJoin: (rosterData) => {
                const localPlayer = player.getLocal();
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
                console.error('SEND TO NETWORK -- UNFINISHED', playerToRemove);
                // const localPlayer = player.getLocal();
                // network.roster.update(roster, localPlayer); 
            },

            resetAllBoads: gameState => {
                for (const board of gameState.boards) {
                    network.board.update({
                        _id: board._id,
                        bonus: 0,
                        state: boardState.composeNewBoard()
                    });
                }                
            },
            create: rosterData => {
                const localPlayer = player.getLocal();
                network.roster.update(rosterData, localPlayer);
            }
        },

        player: {
            update: newPlayer => {
                const localPlayer = player.getLocal();
                network.player.update(newPlayer, localPlayer);
            },
            removeLocal: oldPlayer => { 
                const localPlayer = player.getLocal();
                network.player.remove(oldPlayer._id, localPlayer); 
                network.board.remove(oldPlayer._id, localPlayer);
            },
            remove: player => {
                sendToNetwork.roster()
                const localPlayer = player.getLocal();
                network.player.remove(oldPlayer._id, localPlayer); 
                // network.board.remove(oldPlayer._id, localPlayer);
            }
        }

    };


    const board = {
        remove: id => {
            gameState.boards = gameState.boards.filter(board => board._id !== id);
        },
        getLocal: () => { 
            return gameState.boards
                .find(board => board._id === gameState.___localPlayerId);
        },
        update: (playerId, plotId, plotType, option) => {
            console.log('updateBoard', plotId, plotType);

            const board = gameState.boards.find(board => board._id === playerId);
            board.state = boardState.update(board.state, plotId, plotType);

            score.update(playerId);

            updateGame();

            if (option !== NETWORK.FROM_NETWORK) {
                sendToNetwork.board.update(board);
            }
        },
        updateBonus: (num, option) => {
            const id = gameState.___localPlayerId;
            const board = gameState.boards.find(board => board._id === id);
            board.bonus = num;

            score.update(id);
            updateGame();

            if (option !== NETWORK.FROM_NETWORK) {
                sendToNetwork.board.update(board);
            }
        }
    };

    const roster = {
        reset: option => {
            for (const key of Object.keys(gameState.scores)) {
                gameState.scores[key] = {...ZERO_SCORE};
            }

            for (const board of gameState.boards) {
                delete board.state;
            }

            updateGame();

            if (option !== NETWORK.FROM_NETWORK) {
                sendToNetwork.roster.resetAllBoards(gameState);
            }
        },
        join: rosterName => {
            if (gameState.rosterName !== rosterName) {
                gameState.rosterName = rosterName;
                gameState.rosterJoined = false;

                const localPlayer = player.getLocal();
                sendToNetwork.player.update(localPlayer);

                sendToNetwork.roster.pingToJoin(rosterName);
            }
        },
        create: rosterName => {
            const localPlayer = player.getLocal();
            const localBoard = board.getLocal();
            const newRoster = {
                name: rosterName,
                players: [ gameState.___localPlayerId ],
                admin: gameState.___localPlayerId
            };
            sendToNetwork.roster.update(newRoster);
            sendToNetwork.board.update(localBoard);
            sendToNetwork.player.update(localPlayer);

            gameState.rosterName = rosterName;
            gameState.rosterJoined = true;
            updateGame();
        }
    };

    const player = {
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
                board.remove(oldPlayer._id);

                score.remove(oldPlayer._id);            
            };

            return (playerName, cityName, rosterName) => {

                /*
                console.group('STORE >> player.updateLocal');
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
                    sendToNetwork.board.update(board);
                }

                gameState.scores[player._id] = calculateScore(board);

                roster.join(rosterName);


                updateGame();

                console.group('addPlayer');
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
            board.remove(playerToRemove._id);
            score.remove(playerToRemove._id);
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

    const score = {
        remove: id => {
            delete gameState.scores[id];
        },
        update: id => {
            const board = gameState.boards.find(board => board._id === id);
            gameState.scores[id] = calculateScore(board);
        }
    };

    const goals = {
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
            : boardState.composeNew()
    };

    return {
        roster, // create, reset
        board, // update, updateBonus
        player, // update
        score,
        goals,

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

export const turns = derived(
    gStore,
    gStore => gStore.turns
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

const createModalStore = () => {
    const {subscribe, set, update } = writable({
        initPlayer: { show: false },
        createGame: {
            show: false,
            rosterName: ''
        },
        exitGame: { show: false },
        warnNameChange: { show: false },
        chooseGoals: { show: true },
        confirmPlayerRemove: { show: false }
    });

    let UX;
    subscribe(ux => UX = ux);

    const closeRosterModals = () => {
        const updated = _cloneDeep(UX);
        updated.initPlayer.show = false;
        updated.createGame.show = false;
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

    return {
        closeRosterModals,
        showConfirmPlayerRemove,

        subscribe,
        set,
        update
    };
};

export const modalUX = createModalStore();

const createOpponentsStore = () => {
    const {subscribe, set, update } = writable({
        showBoards: false,
        featureBoard: null,
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
            if (updated.featureBoard && updated.featureBoard.source) {
                delete updated.featureBoard.source;
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
        showDrawer: false
    });

    let UX;
    subscribe(ux => UX = ux);

    const toggleDrawer = () => {
        const updated = _cloneDeep(UX);
        updated.showDrawer = !updated.showDrawer;
        set(updated);        
    };

    return {
        toggleDrawer,

        subscribe,
        set,
        update
    };
};

export const adminUX = creatAdminStore();
