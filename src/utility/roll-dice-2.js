    var all = {};
    var initialized = false;

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var initDice = async () => {
        if (initialized) {
            return true;
        }

        await timeout(50);

        all.dice1 = { o: document.querySelector('.dice-one') };
        all.dice2 = { o: document.querySelector('.dice-two') };
        all.dice3 = { o: document.querySelector('.dice-three') };
        all.dice4 = { o: document.querySelector('.dice-four') };
        all.dice5 = { o: document.querySelector('.dice-five') };

        if (all.dice1.o && all.dice2.o && all.dice3.o && all.dice4.o && all.dice5.o) {
            initialized = true;
            return true;
        } else {
            return false;
        }
    };
    
    var orientations = [
        'dice-spin', 'show-top', 'show-bottom', 'show-front', 'show-back', 'show-left', 'show-right'
    ];

    var handleDiceAnimation = dice => {
        orientations.forEach(orientation => {
            dice.o.classList.remove(orientation);    
        });
        void dice.o.offsetWidth;
        dice.o.classList.add('dice-spin');
    };

    var showResult = (dice, classValues) => {
        if (dice.state) {
            dice.state.split(' ').forEach(stateClass => {
                dice.o.classList.remove(stateClass);        
                dice.o.classList.remove(stateClass);        
            });
        }
        void dice.o.offsetWidth;

        dice.state = classValues;
        classValues.split(' ').forEach (nextClass => { 
            dice.o.classList.add(nextClass);
        });
    };

    var delayAnimate = function (nextDie, delay) {
        var handle = handleDiceAnimation;
        var die = all[nextDie];
        setTimeout(() => { handle(die); }, delay);
    };

    var delayResolve = function (nextDie, nextClasses, delay) {
        var show = showResult;
        var die = all[nextDie];
        setTimeout(() => { show(die, nextClasses); }, delay);
    };

    var animate = function (nextDie, nextClasses, delay1, delay2) {
        delayAnimate(nextDie, delay1);
        delayResolve(nextDie, nextClasses, delay2);
    };

   var rollDice = async diceClasses => {
        var init = await initDice();

        if (init) {
            animate('dice1', diceClasses['dice1'], 100, 600);
            animate('dice2', diceClasses['dice2'], 200, 800);
            animate('dice3', diceClasses['dice3'], 400, 1000);
            animate('dice4', diceClasses['dice4'], 600, 1200);
            animate('dice5', diceClasses['dice5'], 800, 1400);
        }

    };

export default rollDice;