    var all = {};
    var initialized = false;

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var initDice = async () => {
        /*        
        if (initialized) {
            return true;
        }
        */
        await timeout(50);

        all.dice1 = all.dice1 || {}; 
        // all.dice1.o = document.querySelector('.dice-one'), 
        all.dice1.batch = Array.prototype.slice.call(document.querySelectorAll('.dice-one'), 0);

        all.dice2 = all.dice2 || {}; 
        all.dice2.batch = Array.prototype.slice.call(document.querySelectorAll('.dice-two'), 0);

        all.dice3 = all.dice3 || {};
        all.dice3.batch = Array.prototype.slice.call(document.querySelectorAll('.dice-three'), 0);

        all.dice4 = all.dice4 || {};
        all.dice4.batch = Array.prototype.slice.call(document.querySelectorAll('.dice-four'), 0);

        all.dice5 = all.dice5 || {};
        all.dice5.batch = Array.prototype.slice.call(document.querySelectorAll('.dice-five'), 0);

        if (all.dice1.batch && all.dice2.batch && all.dice3.batch && all.dice4.batch && all.dice5.batch) {
            // initialized = true;
            return true;
        } else {
            return false;
        }

    };

    var orientations = [
        'dice-spin', 'show-top', 'show-bottom', 'show-front', 'show-back', 'show-left', 'show-right'
    ];

    var handleDiceAnimation = dice => {
        dice.batch.forEach(die => { 
            orientations.forEach(orientation => {
                die.classList.remove(orientation);
            });
            void die.offsetWidth; 
            die.classList.add('dice-spin'); 
        });
    };

    // dice.batch.forEach(die => { die });

    var showResult = (dice, classValues) => {

        if (dice.state) {
            dice.state.split(' ').forEach(stateClass => {
                dice.batch.forEach(die => { 
                    die.classList.remove(stateClass); 
                    die.classList.remove(stateClass); 
                });
            });
        }
        dice.batch.forEach(die => { void die.offsetWidth; });

        dice.state = classValues;
        classValues.split(' ').forEach(nextClass => { 
            dice.batch.forEach(die => { 
                die.classList.add(nextClass); });
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