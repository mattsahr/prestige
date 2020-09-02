import _cloneDeep from 'lodash/cloneDeep';
import _memoize from 'lodash/memoize';

import { 
    DEFAULT_CITY_NAME,
    DEFAULT_PLAYER_NAME,
    DICE_ORDER,
    DUMMY_CHAR, 
    DUMMY_ID, 
    ERA_META,
    GOAL_SETS,
    PLOT_TYPE,
    PRE_GAME_ZERO_ERA, 
    SHORT_TYPES, 
    SPACER, 
    STARTING_SCORE 
} from './constants';

let FB = null;
let globalData = null;
const dummyArray = [];

export const getLocalHash = () => globalData ? globalData.localPlayerHashId : '';
export const composeLocalId = name => name + SPACER + getLocalHash();

export const serializeBoardState = board => {
    const boardState = board.state || board;
    if (!Array.isArray(boardState)) {
        console.error('serializeBoardState NO BOARD STATE FOUND', board);
    }
    const serialized = [];
    for (const row of boardState) {
        let rowString = '';
        for (const column of row) {
            rowString += SHORT_TYPES[column.plotType];
            rowString += DUMMY_CHAR; // DUMMY CHARACTER, FUTURE PROOFING?
        }
        serialized.push(rowString);
    }
    return JSON.stringify(serialized);
};

export const getRowColumn = id => {
    return { 
        row: Number(id.split('row_')[1].split('_column_')[0]),
        column: Number(id.split('row_')[1].split('_column_')[1])
    };
};

export const getPlotId = (row, column) => 'row_' + row + '_column_' + column;

export const hydrateBoardState = stateString => {
    const boardState = [];
    const state = JSON.parse(stateString);
    for (let rowIndex = 0; rowIndex < state.length; rowIndex++) {

        const fullRow = [];
        const rowString = state[rowIndex];
        const row = rowString.split('');

        let columnIndex = 0;
        while(row.length) {
            const plotType = row.shift();
            const dummyChar = row.shift();
            fullRow.push({
                plotType: SHORT_TYPES[plotType],
                _id: getPlotId(rowIndex, columnIndex)
            });
            columnIndex++;
        }

        boardState.push(fullRow);
    }

    return boardState;
};

export const boardState = (() => {
    const ROWS = 9;
    const COLUMNS = 8;

    const standardStartingPlots = {
        row_1_column_1: PLOT_TYPE.RESIDENTIAL,
        row_1_column_2: PLOT_TYPE.INDUSTRY,
        row_1_column_5: PLOT_TYPE.INDUSTRY,
        row_1_column_6: PLOT_TYPE.RESIDENTIAL,

        row_7_column_1: PLOT_TYPE.RESIDENTIAL,
        row_7_column_2: PLOT_TYPE.INDUSTRY,
        row_7_column_5: PLOT_TYPE.INDUSTRY,
        row_7_column_6: PLOT_TYPE.RESIDENTIAL
    };

    const locatePlot = (board, id) => {
        const { row, column } = getRowColumn(id);
        return board[row][column];
    };

    const composePlot = (row, column) => ({ 
        plotType: standardStartingPlots[getPlotId(row, column)] || PLOT_TYPE.EMPTY,
        _id: getPlotId(row, column)
    });

    const addRow = (rowIndex, board) => {
        const row = board[rowIndex] = [];
        for (let i = 0; i < COLUMNS; i++) {
            row[i] = composePlot(rowIndex, i);
        } 
    };

    const composeNew = () => {
        const board = [];
        for (let i = 0; i < ROWS; i++) {
            addRow(i, board);
        }
        return board;
    };

    const update = (board, plotId, plotType) => {
        if (!board) {
            console.error('boardState update: NO BOARD SUPPLIED');
            return;
        }

        const plot = locatePlot(board, plotId);
        plot.plotType = plotType;
        return _cloneDeep(board);
    };

    return { 
        composeNew,
        update
    };

})();

export const composeNewBoard = id => ({
    _id: id,
    state: boardState.composeNew(),
    bonus: 0
});

export const composeBaseGameState = () => ({
    rosterName: undefined,
    rosterJoined: false,
    ___localPlayerId: DUMMY_ID,
    networkRosterState: {},
    scores: {
        [DUMMY_ID]: _cloneDeep(STARTING_SCORE)
    },
    players: [{name: DEFAULT_PLAYER_NAME, city: DEFAULT_CITY_NAME, _id: DUMMY_ID}],
    boards: [{ _id: DUMMY_ID, state: boardState.composeNew()}]
});

export const initHelpers = (sourceFB, sourceGlobalData) => {
    FB = sourceFB;
    globalData = sourceGlobalData;
};


export  const sortBoards = scores => (A, B) => {
    if (!A || !B || !A._id || !B._id || !scores[A._id] || !scores[B._id]) {
        return 0;
    } 

    if (scores[A._id].total <  scores[B._id].total)  {
        return -1;
    }
    if (scores[A._id].total > scores[B._id].total)  {
        return 1;
    }
    if (scores[A._id].population < scores[B._id].population)  {
        return -1;
    }
    if (scores[A._id].population > scores[B._id].population)  {
        return 1;
    }
    return 0;
};

const randomInt = (min, max) => {  
    const Min = Math.ceil(min); 
    const Max = Math.floor(max); 
    return Math.floor(Math.random() * (Max - Min + 1)) + Min; 
};

export const dummyTurn = [
    {
        ...ERA_META[0],
        dice: { COMMERCE: 2, CULTURE: 4, INDUSTRY: 5, PARKS: 1, RESIDENTIAL: 3 }
    }
];

const hydrateTurnsBase = (() => {

    const hydrateTurn = (turnString, index) => {
        const [ era_id, rollString ] = turnString.split(SPACER);
        const era = ERA_META.find(next => next.era_id === era_id);

        const hydrated = { 
            ..._cloneDeep(era),
            turn: index,
            dice: {}
        };
        const rolls = rollString.split('');

        for (let i = 0; i < rolls.length; i++) {
            hydrated.dice[DICE_ORDER[i]] = Number(rolls[i]);
        }

        return hydrated;
    };

    return turnOrder => {
        const turns = turnOrder.played || turnOrder;

        return turns.map(hydrateTurn);
    };
})();

const turnChangeResolver = turns => (turns && turns.length) || 0;

export const hydrateTurns = _memoize(hydrateTurnsBase, turnChangeResolver);

export const preGameTurnZero = ERA_META[0].era_id + SPACER + '24513';

export const updateTurns = (() => {

    const rollDice = era_id => {
        const { rules } = ERA_META.find(era => era.era_id === era_id);

        let turn = era_id + SPACER;
        for (let i = 0; i < 5; i++) {
            const { exact } = rules[DICE_ORDER[i]];
            if (exact) {
                turn += exact;
            } else {
                turn += randomInt(1, 6);
            }
        }
        return turn;
    };

    function realShuffle(array) {
        // SOURCE https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array#6274398

        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    const shuffle = (currentTurns = {}, includedExpansions = []) => {

        const played = currentTurns.played || [ preGameTurnZero ];
        const sideboard = currentTurns.sideboard || [];
        const oldDeck = currentTurns.deck || [];

        const newDeck = [ ...oldDeck, ...sideboard ];

        const sourceEras = ERA_META
            .filter(era => !era.expansion || includedExpansions.indexOf(era.expansion) !== -1)
            .map(era => era.era_id)
            .filter(era_id => era_id !== PRE_GAME_ZERO_ERA)
            .filter(era_id => newDeck.indexOf(era_id) === -1);
            
        while (newDeck.length < 12) {
            const nextIndex = randomInt(0, sourceEras.length - 1);
            const era_id = sourceEras.splice(nextIndex, 1)[0];
            newDeck.push(era_id);
        }

        realShuffle(newDeck);

        return {
            played,
            sideboard: sourceEras,
            deck: newDeck
        };
    };

    const advance = currentTurns => {
        if (!currentTurns) {
            return shuffle();
        }

        const { deck, played, sideboard } = currentTurns.deck.length === 0
            ? shuffle(currentTurns)
            : _cloneDeep(currentTurns);

        const nextIndex = randomInt(0, deck.length -1);
        const nextEraId = deck.splice(nextIndex, 1)[0];

        const nextTurn = rollDice(nextEraId);
        played.push(nextTurn);

        return {
            deck,
            played,
            sideboard 
        };
    };

    return advance;
})(); 
  

export const serializeGoals = goals => 
    goals.map(goal => goal.code).join(SPACER);

export const hydrateGoals = (() => {

    const findGoalByCode = (code, goalSet) => {
        for (const goal of goalSet) {
            if (goal.code === code) {
                return goal;
            }
        }
        return null;
    };

    return goalCodes => {
        if (!goalCodes) {
            return dummyArray;
        }
        const codes = goalCodes.split(SPACER);
        const delivery = [];

        for (const code of codes) {
            for (const goalSet of GOAL_SETS) {
                const goal = findGoalByCode(code, goalSet);
                if (goal) {
                    delivery.push(goal);
                }
            }   
        }

        return delivery;
    };

})(); 

export const getRandomGoals = (() => {

    const expansionOK = (goal, expansionSettings) => {
        if (!goal.expansion) {
            return true;
        }
        if (!expansionSettings) {
            return false;
        }

        /*
            expect an expansionSettings object like...
                {
                    BLIGHT: true,
                    MOUNTAINS: true,
                    SEASIDE: false
                }
        */

        return expansionSettings[goal.expansion];
    };

    return expansionSettings => {

        const groups = {};
        const delivery = [];

        for (const subset of GOAL_SETS) {
            let result = subset[randomInt(0, subset.length - 1)];
            while (groups[result.bonusGroup] || !expansionOK(result, expansionSettings)) {
                result = subset[randomInt(0, subset.length - 1)];
            }
            if (result.bonusGroup) {
                groups[result.bonusGroup] = true;
            }
            delivery.push(result);
       }

       return {
            goalObjects: delivery,
            goalCodes: serializeGoals(delivery)
        };

    };
})();



/* ======== DOM INTERACTION ============================= */

let docWidth = 0;
export const getDocWidth = () => docWidth;
let docHeight = 0;
export const getDocHeight = () => docHeight;

export const initWindow = () => {

    const EVENT_KEY = 'resizeend';
    const RESIZE_TIMER = 200;
    let resizeTimer;

    function callResizeEnd() {
        // window.CustomEvent is guaranteed to exist 
        // by a shim in /lib/global-space/resize-end.js
        const event = new window.CustomEvent(EVENT_KEY);
        window.dispatchEvent(event);
    }

    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(callResizeEnd, RESIZE_TIMER);
    }

    if (typeof window !== 'undefined') {
        window.addEventListener('resize', onResize);
    }

    const refreshDocDimensions = () => {
        const w = window;
        const d = document;
        const e = d.documentElement;
        const g = d.getElementsByTagName('body')[0];
        docWidth = w.innerWidth || e.clientWidth || g.clientWidth;
        docHeight = w.innerHeight || e.clientHeight || g.clientHeight;
    };

    window.addEventListener('resizeend', refreshDocDimensions);
    refreshDocDimensions();    
};


export const fireWindowEvent = eventName => {
    let event;
    
    if(document.createEvent){
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
        event.eventName = eventName;
        window.dispatchEvent(event);
    } else {
        event = document.createEventObject();
        event.eventName = eventName;
        event.eventType = eventName;
        window.fireEvent("on" + event.eventType, event);
    }
};