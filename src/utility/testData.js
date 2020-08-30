const standard = { active: true, min: 1, max: 5 };
const X = { active: false };

 export const dummyTurns = [
    {
        round: 1,
        turn: 0,
        era_id: 'AA',
        era: 'Pregame',
        rules: {
            COMMERCE:    standard,
            CULTURE:     standard,
            INDUSTRY:    standard,
            PARKS:       standard,
            RESIDENTIAL: standard 
        },
        comment: 'Patience.  The game has not started yet.',
        description: 'Click "Next Turn" in the dropdown (upper right) to get started.',
        dice: { COMMERCE: 2, CULTURE: 4, INDUSTRY: 5, PARKS: 1, RESIDENTIAL: 3 }
    },
    {
        round: 1,
        turn: 1,
        era_id: 'AB',
        era: 'War!',
        rules: {
            COMMERCE:    X,
            CULTURE:     X,
            INDUSTRY:    standard,
            PARKS:       X,
            RESIDENTIAL: X
        },
        comment: 'What is it good for?  Industry.',
        description: 'INDUSTRY only.',
        dice: { COMMERCE: 2, CULTURE: 4, INDUSTRY: 3, PARKS: 1, RESIDENTIAL: 2 }
    },
    {
        round: 1,
        turn: 2,
        era_id: 'AC',
        era: 'Tech Revolution',
        rules: {
            COMMERCE:    standard,
            CULTURE:     X,
            INDUSTRY:    standard,
            PARKS:       X,
            RESIDENTIAL: X
        },
        comment: 'Gizmos shall save us.  Also Cloud, Artificial Intelligence, Windmills, Lasers, and The Bitcoin.',
        description: 'COMMERCE and INDUSTRY only.',
        dice: { COMMERCE: 4, CULTURE: 4, INDUSTRY: 2, PARKS: 1, RESIDENTIAL: 3 }
    },
    {
        round: 1,
        turn: 3,
        era_id: 'AD',
        era: 'Industrial Disaster',
        rules: {
            COMMERCE:    X,
            CULTURE:     X,
            INDUSTRY:    standard,
            PARKS:       X,
            RESIDENTIAL: X
        },
        comment: 'Union Carbide Corporation V. Union Of India & Others.<br/>December 2, 1984 -- Bhopal, India',
        description: 'Remove contiguous INDUSTRY squares from opponent, up to yellow die max.',
        dice: { COMMERCE: 2, CULTURE: 4, INDUSTRY: 5, PARKS: 1, RESIDENTIAL: 3 }
    },
    {
        round: 1,
        turn: 4,
        era_id: 'AE',
        era: 'The Great Fire',
        rules: {
            COMMERCE:    X,
            CULTURE:     X,
            INDUSTRY:    X,
            PARKS:       X,
            RESIDENTIAL: standard
        },
        comment: 'The fire was barely fifteen minutes old. What followed was a series of fatal errors that set the fire free and doomed the city to a fiery death.',
        description: 'Remove contiguous RESIDENTIAL squares from opponent, up to red die max.',
        dice: { COMMERCE: 2, CULTURE: 4, INDUSTRY: 5, PARKS: 1, RESIDENTIAL: 1 }
    }
];

