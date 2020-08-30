import { PLOT_TYPE, ZERO_SCORE } from './constants';
import _cloneDeep from 'lodash/cloneDeep';

const getRowColumn = id => {
    return { 
        row: Number(id.split('row_')[1].split('_column_')[0]),
        column: Number(id.split('row_')[1].split('_column_')[1])
    };
};

const getNeighbors = (() => {
    const add = {
        north: (row, column, board, batch) => {
            if (row < 1) { return; }
            batch.push(board[row - 1][column]);
        },
        east: (row, column, board, batch) => {
            if (column > 6) { return; }
            batch.push(board[row][column + 1]);
        },
        south: (row, column, board, batch) => {
            if (row > 7) { return; }
            batch.push(board[row + 1][column]);
        },
        west: (row, column, board, batch) => {
            if (column < 1) { return; }
            batch.push(board[row][column - 1]);
        }
    };

    return (plot, board) => {
        const neighbors = [];
        const { row, column } = getRowColumn(plot._id);

        add.north(row, column, board, neighbors);
        add.east(row, column, board, neighbors);
        add.south(row, column, board, neighbors);
        add.west(row, column, board, neighbors);

        return neighbors;
    };
})();

const gotPark = plots => 
    Boolean(plots.find(plot => plot.plotType === PLOT_TYPE.PARKS));
const gotCulture = plots => 
    Boolean(plots.find(plot => plot.plotType === PLOT_TYPE.CULTURE));
const gotIndustry = plots => 
    Boolean(plots.find(plot => plot.plotType === PLOT_TYPE.INDUSTRY));
const gotBlight = plots => 
    Boolean(plots.find(plot => plot.plotType === PLOT_TYPE.BLIGHT));

const isInCenter = plot => {
    const { row, column } = getRowColumn(plot._id);
    return row > 1 && row < 7 && column > 1 && column < 6;
};

const calcType = { 
    BLIGHT: () => { /* no op */ },
    COMMERCE: (plot, board, score) => { score.wealth += (isInCenter(plot) ? 1 : 0.5); },
    CULTURE: (plot, board, score) => { if (isInCenter(plot)) { score.culture += 1; } },
    EMPTY: () => { /* no op */ },
    INDUSTRY: (plot, board, score) => { score.wealth += 0.5; },
    MOUNTAIN:  () => { /* no op */ },
    PARKS: () => { /* no op */ },
    RESIDENTIAL:(plot, board, score) => {
        score.population += 1;
        const neighbors = getNeighbors(plot, board);
        if (gotPark(neighbors)) { score.happiness += 1; }
        if (gotCulture(neighbors)) { score.happiness += 1; }
        if (gotIndustry(neighbors)) { score.happiness -= 1; }
        if (gotBlight(neighbors)) { score.happiness -= 1; }
    }
};

const calcPlot = (plot, board, score) => {
    calcType[plot.plotType](plot, board, score);
};

const calcRow = (row, board, score) => {
    for (const plot of row) {
        calcPlot(plot, board, score);
    }
};

export const shouldScore = (type, score) => {
    const thisScore = score[type];
    const { culture, happiness, wealth } = score;
    const otherMap = {
        culture: [ happiness, wealth ],
        happiness: [ wealth, culture ],
        wealth: [ happiness, culture ]
    };
    const others = otherMap[type];

    // highest -- don't score
    if (thisScore > others[0] && thisScore > others[1]) {
        return false;
    }

    // lowest or 2nd lowest -- definitely score
    if (thisScore < others[0] || thisScore < others[1]) {
        return true;
    }

    // we have a tie for highest
    // score alphabetically in the case of a tie
    if (type === 'wealth') {
        return false;
    }

    if (type === 'happiness' && thisScore === culture && thisScore > wealth) {
        return false;
    }

    return true;
};

export const getSum = score => (score.bonus || 0) +
    (shouldScore('culture', score) ? (score.culture || 0) : 0) +
    (shouldScore('happiness', score) ? (score.happiness || 0) : 0) +
    (shouldScore('wealth', score) ? Math.floor(score.wealth || 0) : 0);

export const calculateScore = board => {
    const score = _cloneDeep(ZERO_SCORE);

    for (const row of board.state) {
        calcRow(row, board.state, score);
    }

    score.bonus = board.bonus || 0;
    score.total = getSum(score);

    return score;
};
