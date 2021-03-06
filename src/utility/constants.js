export const DUMMY_CHAR = '.';
export const DUMMY_ID = 'DUMMY_PLAYER_ID_1234567';
export const DEFAULT_PLAYER_NAME = 'Playah XYZ 7894';
export const DEFAULT_CITY_NAME = 'Playah City XYZ 7894';
export const PRE_GAME_ZERO_ERA = 'AA';

export const PLOT_TYPE = {
    BLIGHT: 'BLIGHT',
    COMMERCE: 'COMMERCE',
    CULTURE: 'CULTURE',
    EMPTY: 'EMPTY',
    MOUNTAIN: 'MOUNTAIN',
    INDUSTRY: 'INDUSTRY',
    PARKS: 'PARKS',
    RESIDENTIAL: 'RESIDENTIAL'
};

export const SHORT_TYPES = {
    [PLOT_TYPE.BLIGHT]: 'B',
    [PLOT_TYPE.COMMERCE]: 'C',
    [PLOT_TYPE.CULTURE]: 'K',
    [PLOT_TYPE.EMPTY]: 'E',
    [PLOT_TYPE.INDUSTRY]: 'I',
    [PLOT_TYPE.MOUNTAIN]: 'M',
    [PLOT_TYPE.PARKS]: 'P',
    [PLOT_TYPE.RESIDENTIAL]: 'R',

    B: PLOT_TYPE.BLIGHT,
    C: PLOT_TYPE.COMMERCE,
    K: PLOT_TYPE.CULTURE,
    E: PLOT_TYPE.EMPTY,
    I: PLOT_TYPE.INDUSTRY,
    M: PLOT_TYPE.MOUNTAIN,
    P: PLOT_TYPE.PARKS,
    R: PLOT_TYPE.RESIDENTIAL
};

export const SPACER = '__';

export const DICE_ORDER = [
    PLOT_TYPE.COMMERCE, 
    PLOT_TYPE.CULTURE, 
    PLOT_TYPE.INDUSTRY, 
    PLOT_TYPE.PARKS, 
    PLOT_TYPE.RESIDENTIAL
];


export const ZERO_SCORE = {
    happiness: 0,
    wealth: 0,
    culture: 0,
    bonus: 0,
    population: 0,
    total: 0
};

export const STARTING_SCORE = {
    happiness: -4,
    wealth: 2,
    culture: 0,
    bonus: 0,
    population: 4,
    total: -2
};

export const NETWORK = {
    FROM_NETWORK: 'FROM_NETWORK',
    GAME_NOT_FOUND: 'GAME_NOT_FOUND'
};

export const ERA_META = (() => {

    const standard = { active: true, min: 1, max: 5 };
    const X = { active: false };

    return [
        {
            era_id: PRE_GAME_ZERO_ERA,
            era: 'Pregame',
            rules: {
                COMMERCE:    standard,
                CULTURE:     standard,
                INDUSTRY:    standard,
                PARKS:       standard,
                RESIDENTIAL: standard 
            },
            comment: 'Patience.  The game has not started yet.',
            description: 'Click "Next Turn" in the dropdown (upper right) to get started.'
        },
        {
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
            comment2: 'We must guard against the acquisition of unwarranted influence, whether sought or unsought, by the military-industrial complex. -Dwight Eisenhower',
            description: '<span class="INDUSTRY">INDUSTRY</span> only.'
        },
        {
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
            comment2: 'Once a new technology rolls over you, if you’re not part of the steamroller, you’re part of the road. – Stewart Brand',
            description: '<span class="COMMERCE">COMMERCE</span> and <span class="INDUSTRY">INDUSTRY</span> only.'
        },
        {
            era_id: 'AD',
            era: 'Industrial Disaster',
            rules: {
                COMMERCE:    X,
                CULTURE:     X,
                INDUSTRY:    standard,
                PARKS:       X,
                RESIDENTIAL: X
            },
            showDescription: true,
            comment: 'Union Carbide Corporation V. Union Of India & Others.<br/>December 2, 1984 -- Bhopal, India',
            comment2: 'At 1.24 am on 26 April 1986 Chernobyl’s Unit 4 reactor exploded after staff disabled safety systems and performed an ill-advised experiment to check–ironically enough–the reactor’s safety. ― Mark Lynas',
            description: 'Remove contiguous <span class="INDUSTRY">INDUSTRY</span> squares from opponent\'s city, up to yellow die max.',
            targetPlayer: true
            // description2: 'At the bottom of the screen, target the opponent to the left of your <span class="self-marker"></span> marker.'
        },
        {
            era_id: 'AE',
            era: 'The Great Fire',
            rules: {
                COMMERCE:    X,
                CULTURE:     X,
                INDUSTRY:    X,
                PARKS:       X,
                RESIDENTIAL: standard
            },
            showDescription: true,
            comment: 'The fire was barely fifteen minutes old. What followed was a series of fatal errors that set the fire free and doomed the city to a fiery death.',
            comment2: 'The Conflagration was so universal, & the people so astonish’d, that from the beginning, they hardly stirr’d to quench it, so as there was nothing heard or seene but crying out & lamentation, & running about like distracted creatures. - John Evelyn speaking of the Great Fire of London.',
            description: 'Remove contiguous <span class="RESIDENTIAL">RESIDENTIAL</span> squares from opponent\'s city, up to red die max.',
            targetPlayer: true
            // description2: 'At the bottom of the screen, target the opponent to the left of your <span class="self-marker"></span> marker.'
        },
        {
            era_id: 'AF',
            era: 'The Golden Age',
            rules: {
                COMMERCE:    { active: true, exact: 1 },
                CULTURE:     { active: true, exact: 1 },
                INDUSTRY:    { active: true, exact: 1 },
                PARKS:       { active: true, exact: 1 },
                RESIDENTIAL: { active: true, exact: 1 }
            },
            showDescription: true,
            comment: 'The people who live in a golden age usually go around complaining how yellow everything looks.',
            comment2: 'The Golden Age is before us, not behind us. - William Shakespeare',
            description: 'Add one square of each Type.'
        },
        {
            era_id: 'AG',
            era: 'The Me Generation',
            rules: {
                COMMERCE:    { active: true, exact: 2 },
                CULTURE:     { active: true, exact: 2 },
                INDUSTRY:    { active: true, exact: 2 },
                PARKS:       { active: true, exact: 2 },
                RESIDENTIAL: { active: true, exact: 2 }
            },
            showDescription: true,
            comment: 'Before there were “selfies,” there was Me.',
            comment2: '“Just be yourself” sounds like good advice at first, but what if you’re a jerk? - Jean Twenge',
            description: 'Automatic 2 on all dice.'
        },
        {
            era_id: 'AH',
            era: 'Depression',
            rules: {
                COMMERCE:    X,
                CULTURE:     X,
                INDUSTRY:    X,
                PARKS:       standard,
                RESIDENTIAL: standard
            },
            comment: 'It\'s a recession when your neighbor loses his job; it\'s a depression when you lose yours.',
            comment2: 'An entire nation, it seemed, was standing in one long breadline, desperate for even the barest essentials. It was a crisis of monumental proportions. It was known as the Great Depression.  -Kathi Appelt',
            description: 'No <span class="COMMERCE">COMMERCE</span> or <span class="CULTURE">CULTURE</span> or <span class="INDUSTRY">INDUSTRY</span>.'
        },
        {
            era_id: 'AI',
            era: 'Recession',
            rules: {
                COMMERCE:    X,
                CULTURE:     standard,
                INDUSTRY:    X,
                PARKS:       standard,
                RESIDENTIAL: standard
            },
            comment: 'No one saw the recession coming. - Gordon Ramsey',
            comment2: 'Never miss out on an opportunity like a good recession. - Jack Welch',
            comment3: 'The Stock Market predicted nine of the past five recessions. - Paul Samuelson',
            description: 'No <span class="COMMERCE">COMMERCE</span> or <span class="INDUSTRY">INDUSTRY</span>'
        },
        {
            era_id: 'AJ',
            era: 'Stagflation',
            rules: {
                COMMERCE:    { active: true, min: 1, max: 2 },
                CULTURE:     { active: true, min: 1, max: 2 },
                INDUSTRY:    { active: true, min: 1, max: 2 },
                PARKS:       { active: true, min: 1, max: 2 },
                RESIDENTIAL: { active: true, min: 1, max: 2 }
            },
            comment: 'Stagflation is a very unpopular buzz word in the business world',
            comment2: 'In the mid 1970s, stagflation in the US featured double-digit inflation, 9% unemployment, and a contracting economy.',
            comment3: 'The stagflation of the 1970s blessed us with damaging wage and price controls and the utterly counterintuitive supply-side notion that cutting taxes would lead to higher tax revenues. - Steven Rattner',
            description: 'Any type, 2 or less on the dice.'
        },
        {
            era_id: 'AL',
            era: 'Feel Good Era',
            rules: {
                COMMERCE:    standard,
                CULTURE:     standard,
                INDUSTRY:    standard,
                PARKS:       standard,
                RESIDENTIAL: standard
            },
            comment: 'In the “Era of Good Feelings”, America saw economic growth, westward expansion, and a sense of national purpose and a desire for unity among Americans in the aftermath of the War of 1812.',
            comment2: 'The election of 1824, known as "The Corrupt Bargain," brought an end to this period, and ushered in the troubled presidency of John Quincy Adams.',
            description: 'All Types.'
        },
        {
            era_id: 'AM',
            era: 'Culture War',
            rules: {
                COMMERCE:    standard,
                CULTURE:     X,
                INDUSTRY:    standard,
                PARKS:       standard,
                RESIDENTIAL: standard
            },
            comment: '"Ah, but you can\'t turn back the clock. You can\'t go home again. You can\'t stop progress." Yes, you can.',
            comment2: 'You don\'t have to burn books to destroy a culture. Just get people to stop reading them. - Ray Bradbury',
            description: 'No <span class="CULTURE">CULTURE</span>.'
        },
        {
            era_id: 'AN',
            era: 'Drought',
            rules: {
                COMMERCE:    standard,
                CULTURE:     standard,
                INDUSTRY:    standard,
                PARKS:       X,
                RESIDENTIAL: standard
            },
            comment: 'Even in the midst of a terrible drought, someone will say, Of course I want it to rain, but not today.',
            comment2: 'It\'s so dry the trees are bribing the dogs. - Charles Martin',
            description: 'No <span class="PARKS">PARKS</span>.'
        },
        {
            era_id: 'AO',
            era: 'Baby Boom',
            rules: {
                COMMERCE:    X,
                CULTURE:     X,
                INDUSTRY:    X,
                PARKS:       X,
                RESIDENTIAL: standard
            },
            comment: 'I think the Baby Boom has enjoyed itself, maybe sometimes a little too much...',
            comment2: 'From 1941 to 1961, more than 65 million children were born in the United States. At the height of this baby boom, at an average of seven seconds, a child was born.',
            description: '<span class="RESIDENTIAL">RESIDENTIAL</span> only.'
        },
        {
            era_id: 'AP',
            era: 'Pandemic',
            rules: {
                COMMERCE:    X,
                CULTURE:     standard,
                INDUSTRY:    standard,
                PARKS:       standard,
                RESIDENTIAL: X
            },
            comment: 'This is a pandemic. I felt it was a pandemic long before it was called a pandemic.',
            description: 'No <span class="COMMERCE">COMMERCE</span> or <span class="RESIDENTIAL">RESIDENTIAL</span>.'
        },
        {
            era_id: 'AQ',
            era: 'Industrial Revolution',
            rules: {
                COMMERCE:    X,
                CULTURE:     X,
                INDUSTRY:    standard,
                PARKS:       X,
                RESIDENTIAL: standard
            },
            expansion: 'BLIGHT',
            comment: 'The industrial revolution has tended to produce everywhere great urban masses that seem to be increasingly careless of ethical standards.',
            description: '<span class="INDUSTRY">INDUSTRY</span> and <span class="RESIDENTIAL">RESIDENTIAL</span> only.'
        },
        {
            era_id: 'AR',
            era: 'Roaring Market',
            rules: {
                COMMERCE:    standard,
                CULTURE:     X,
                INDUSTRY:    X,
                PARKS:       X,
                RESIDENTIAL: X
            },
            comment: 'What we need to understand is, one, that there are market failures; and two, that there are things like asset bubbles and irrational exuberance.',
            comment2: 'Once a boom is well started, it cannot be arrested. It can only be collapsed. - John Kenneth Galbraith',
            comment3: 'One of the funny things about the stock market is that every time one person buys, another sells, and both think they are astute. - William Feather',
            description: '<span class="COMMERCE">COMMERCE</span> only.'
        }
    ];

})();

export const GOAL_SETS = (() => {

    const standard = '<span class="number">5</span> points --  single player<br />' + 
        '<span class="number">2</span> points -- shared reward, each player';

   return [
        [
            {
                title: 'Titan of Industry',
                objective: 'First Player with 10 <span class="INDUSTRY">INDUSTRY</span> squares',
                rewardPoints: standard,
                rewardEffects: 'Add 2 <span class="CULTURE">CULTURE</span> squares',
                countTrigger: 10,
                countType: 'CULTURE',
                bonusGroup: 'A',
                code: 'AA'
            },
            {
                title: 'Public Benefactor',
                objective: 'First Player with 10 <span class="COMMERCE">COMMERCE</span> squares',
                rewardPoints: standard,
                rewardEffects: '  Add 2 <span class="PARKS">PARKS</span> squares',
                countTrigger: 10,
                countType: 'PARKS',
                bonusGroup: 'C',
                code: 'AB'
            },
            {
                title: 'Cheap Labor',
                objective: 'First Player with 10 <span class="RESIDENTIAL">RESIDENTIAL</span> squares',
                rewardPoints: standard, 
                rewardEffects: 'Add 2 <span class="INDUSTRY">INDUSTRY</span> squares',
                countTrigger: 10,
                countType: 'INDUSTRY',
                code: 'AC'
            },
            {
                title: 'Urban Paradise',
                objective: 'First Player with 10 <span class="PARKS">PARKS</span> squares',
                rewardPoints: standard,
                rewardEffects: 'Add 2 <span class="RESIDENTIAL">RESIDENTIAL</span> squares',
                countTrigger: 10,
                countType: 'RESIDENTIAL',
                bonusGroup: 'B',
                code: 'AD'
            }
        ],
        [
            {
                title: 'Downtown Developer',
                objective: 'At the end of <span class="round-indicator">12 Turns</span>: <br />Most squares in the Inner District',
                rewardPoints: standard,
                turnTrigger: 12,
                code: 'BA'
            },
            {
                title: 'Race to the Exurbs',
                objective: 'At the end of <span class="round-indicator">12 Turns</span>: <br />Most developed squares on the outer edge of the board',
                rewardPoints: standard,
                turnTrigger: 12,
                bonusGroup: 'C',
                code: 'BB'
            },
            {
                title: 'Monument Builder',
                objective: 'At the end of <span class="round-indicator">12 Turns</span>: <br />Most <span class="PARKS">PARKS</span> on the board',
                rewardPoints: standard,
                turnTrigger: 12,
                bonusGroup: 'B',
                code: 'BC'
            },
            {
                title: 'Measured Growth',
                objective: 'At the end of <span class="round-indicator">12 Turns</span>: <br />Least developed squares on the board',
                rewardPoints: standard,
                turnTrigger: 12,
                code: 'BD'
            },
            {
                title: 'Retail Entrepreneur',
                objective: 'At the end of <span class="round-indicator">12 Turns</span>: <br />Most <span class="COMMERCE">COMMERCE</span> squares touching <span class="RESIDENTIAL">RESIDENTIAL</span> squares',
                rewardPoints: standard,
                turnTrigger: 12,
                bonusGroup: 'C',
                code: 'BE'
            },
            {
                title: 'Industrial Powerhouse',
                objective: 'At the end of <span class="round-indicator">12 Turns</span>: <br />Most <span class="INDUSTRY">INDUSTRY</span> squares',
                rewardPoints: standard,
                bonusGroup: 'A',
                turnTrigger: 12,
                code: 'BF'
            }
        ],
        [
            {
                title: 'The New Economy',
                objective: 'First to complete your city',
                rewardEffects: 'Convert up to 4 continguous <span class="INDUSTRY">INDUSTRY</span> to <span class="COMMERCE">COMMERCE</span>',
                completionTrigger: true,
                code: 'CA'
            },
            {
                title: 'Urban Rehab',
                objective: 'First to complete your city',
                rewardEffects: 'Convert up to 3 <span class="BLIGHT">BLIGHT</span> to <span class="PARKS">PARKS</span>',
                completionTrigger: true,
                expansion: 'BLIGHT',
                code: 'CB'
            },
            {
                title: 'Master Planner',
                objective: 'First to complete your city',
                completionTrigger: true,
                rewardPoints: standard,
                code: 'CC'
            },
            {
                title: 'Rails to Trails',
                objective: 'First to complete your city',
                rewardEffects: 'Convert up to 4 contiguous <span class="INDUSTRY">INDUSTRY</span> to <span class="PARKS">PARKS</span>',
                completionTrigger: true,
                code: 'CD'
            }
        ],
        [
            {
                title: 'Champs Central',
                objective: 'At the End, largest cluster of <span class="PARKS">PARKS</span> in the Inner District',
                rewardPoints: standard,
                gameEndTrigger: true,
                bonusGroup: 'B',
                code: 'DA'
            },
            {
                title: 'Mixed Use Builder',
                objective: 'At the end of the game <br />have the highest number of squares, of the your least numerous type',
                rewardPoints: standard,
                gameEndTrigger: true,
                code: 'DB'
            },
            {
                title: 'Global Hub of Finance',
                objective: 'At the end of the game, <br />largest cluster of <span class="COMMERCE">COMMERCE</span> squares',
                rewardPoints: standard,
                gameEndTrigger: true,
                bounsGroup: 'C',
                code: 'DC'
            },
            {

                title: 'District Developer',
                objective: 'At the end of the game, <br />have the greatest number of clusters, of your least numerous type',
                rewardPoints: standard,
                gameEndTrigger: true,
                code: 'DD'
            },
            {
                title: 'Suburban LifeStyle Dream',
                objective: 'At the end of the game, <br />Most <span class="RESIDENTIAL">RESIDENTIAL</span> squares on the outer edge',
                rewardPoints: standard,
                gameEndTrigger: true,
                code: 'DE'
            },
            {
                title: 'Culture for the Masses',
                objective: 'At the end of the game, <br />Most <span class="CULTURE">CULTURE</span> outside the Inner District',
                rewardPoints: standard,
                gameEndTrigger: true,
                code: 'DF'
            }
        ]
    ];

})();