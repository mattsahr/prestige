<style>

    .dice-outer-wrapper {
        background: rgb(168,169,170);
        background: radial-gradient(circle, 
            rgb(146 147 148) 0%, 
            rgb(132 138 144) 50%, 
            rgb(40 46 50) 100%
        );
        border: solid rgb(0, 80, 130) 4px;
        border-radius: 2px;

    }

    .dice-wrapper {
        background-image: url('../images/textures/billie-holiday.png');
        height: 12vmin;
        max-height: 94px;
        min-height: calc(68px + 2vmin);
        position: relative;
        padding: 0;
        padding-top: min(2vmin, 10px);
    }

    .scene-wrapper {
        width: 410px;
        margin: 0 auto;
    }

    .scene {
        display: flex;
        justify-content: space-between;
        width: 820px;
        transform-origin: 0 0;
        transform: scale(0.5);
    }


@media all and (max-width: 719px), (max-height: 719px) {
    .scene { transform: scale(0.4); }
    .scene-wrapper { width: 328px; }
}

@media all and (max-width: 399px), (max-height: 399px) {
    .scene { transform: scale(0.34); }
    .scene-wrapper { width: 296px; }
}

</style>

<script>
    import tippy from "sveltejs-tippy";
    import rollDice from '../utility/roll-dice-2';
    import { onMount } from 'svelte';

    const numberMap = [
        'dice-zero-error',
        'show-top', 
        'show-left', 
        'show-front', 
        'show-back', 
        'show-right',
        'show-bottom'
    ];

    const isTooBig = (number, rules) => (rules.max && (number > rules.max));
    const isTooSmall = (number, rules) => (rules.min && (number < rules.min));
    const inactive = (number, rules) => !rules.active;

    const getActiveClass = (number, rules) => 
        inactive(number, rules) || isTooBig(number, rules) || isTooSmall(number, rules)
            ? ' inactive' 
            : '';
    const getDisplayClass = (number, rules) => 'dice-display' + (
        inactive(number, rules) || isTooBig(number, rules) || isTooSmall(number, rules)
            ? '' 
            : ' active'
        );


    export let diceRolls = {
        COMMERCE: 1,
        CULTURE: 2,
        INDUSTRY: 3,
        PARKS: 4,
        RESIDENTIAL: 5        
    };

    export let rules = {
        COMMERCE: {  active: true, min: 1, max: 5 },
        CULTURE: { active: false },
        INDUSTRY: { active: true, min: 1, max: 5 },
        PARKS: { active: false },
        RESIDENTIAL: { active: false }         
    };

    $: diceClasses = {
        dice1: numberMap[diceRolls.PARKS] + getActiveClass(diceRolls.PARKS, rules.PARKS),
        dice2: numberMap[diceRolls.COMMERCE] + getActiveClass(diceRolls.COMMERCE, rules.COMMERCE),
        dice3: numberMap[diceRolls.RESIDENTIAL] + getActiveClass(diceRolls.RESIDENTIAL, rules.RESIDENTIAL),
        dice4: numberMap[diceRolls.CULTURE] + getActiveClass(diceRolls.CULTURE, rules.CULTURE),
        dice5: numberMap[diceRolls.INDUSTRY] + getActiveClass(diceRolls.INDUSTRY, rules.INDUSTRY)
    };

    $: diceDisplayClass = {
        dice1: getDisplayClass(diceRolls.PARKS, rules.PARKS),
        dice2: getDisplayClass(diceRolls.COMMERCE, rules.COMMERCE),
        dice3: getDisplayClass(diceRolls.RESIDENTIAL, rules.RESIDENTIAL),
        dice4: getDisplayClass(diceRolls.CULTURE, rules.CULTURE),
        dice5: getDisplayClass(diceRolls.INDUSTRY, rules.INDUSTRY)
    };


    $: jailbreak = () => {
        rollDice(diceClasses);
        return JSON.stringify(diceRolls);
    };

    const getContent = type => {
        const content = inactive(diceRolls[type], rules[type])
            ? tooltipContent.inactive
            : isTooBig(diceRolls[type], rules[type])
                ? tooltipContent.tooBig
                : tooltipContent.roll;

        return (typeof(content) === 'function') ? content(type) : content;
    };

    const createTooltipContent = type => { 
        const el = document.createElement('div');
        el.classList.add('tootip-inner-content-' + type);
        el.innerHTML = getContent(type);
        return el;
    };

    const tooltipContent = {
        tooBig: type => 'Dice Roll [ ' + diceRolls[type] + ' ] is too big.',
        inactive: type => type + ' not active on this turn.',
        roll: type => type + ' roll [ ' + diceRolls[type] + ' ]'
    };

    const createTooltip = type => ({
        content: ' ',
        role: type,
        placement: "bottom",
        onShow: instance => {
            instance.setProps({content: createTooltipContent(instance.props.role)});
        },
        delay: [600, 200],
        theme: 'light',
        animation: 'shift-away'
    });

    const createLoggers = () => {
        if (window) {
            window.I =  window.I || {};
            window.I.dice = () => {
                console.log('  DICE dicerolls', diceRolls);
                console.log('  DICE rules', rules);
                console.log('  DICE diceClasses', diceClasses);
            };
        }
    };

    onMount(createLoggers);


</script>
<div class="dice-outer-wrapper">
    <div class="dice-wrapper">
        <div class="scene-wrapper">
            <div class="scene" data-dice-roll={jailbreak()}>
                <div class={diceDisplayClass.dice1}>
                    <div class="dice dice-one" use:tippy={createTooltip('PARKS')}>
                        <div class="face face-front">
                            <div class="front-pip-1">&#11044</div>
                            <div class="front-pip-2">&#11044</div>
                            <div class="front-pip-3">&#11044</div>
                        </div>
                        <div class="face face-back">
                            <div class="back-pip-1">&#11044</div>
                            <div class="back-pip-2">&#11044</div>
                            <div class="back-pip-3">&#11044</div>
                            <div class="back-pip-4">&#11044</div>
                        </div>
                        <div class="face face-right">
                            <div class="right-pip-1">&#11044</div>
                            <div class="right-pip-2">&#11044</div>
                            <div class="right-pip-3">&#11044</div>
                            <div class="right-pip-4">&#11044</div>
                            <div class="right-pip-5">&#11044</div>
                        </div>
                        <div class="face face-left">
                            <div class="left-pip-1">&#11044</div>
                            <div class="left-pip-2">&#11044</div>
                        </div>
                        <div class="face face-top">
                            <div class="top-pip-1">&#11044</div>
                            <div class="top-blank-1"></div>
                            <div class="top-blank-2"></div>
                        </div>
                        <div class="face face-bottom">
                            <div class="bottom-pip-1">&#11044</div>
                            <div class="bottom-pip-2">&#11044</div>
                            <div class="bottom-pip-3">&#11044</div>
                            <div class="bottom-pip-4">&#11044</div>
                            <div class="bottom-pip-5">&#11044</div>
                            <div class="bottom-pip-6">&#11044</div>
                        </div>
                    </div>
                </div>

                <div class={diceDisplayClass.dice2}>
                    <div class="dice dice-two" use:tippy={createTooltip('COMMERCE')}>
                        <div class="face face-front">
                            <div class="front-pip-1">&#11044</div>
                            <div class="front-pip-2">&#11044</div>
                            <div class="front-pip-3">&#11044</div>
                        </div>
                        <div class="face face-back">
                            <div class="back-pip-1">&#11044</div>
                            <div class="back-pip-2">&#11044</div>
                            <div class="back-pip-3">&#11044</div>
                            <div class="back-pip-4">&#11044</div>
                        </div>
                        <div class="face face-right">
                            <div class="right-pip-1">&#11044</div>
                            <div class="right-pip-2">&#11044</div>
                            <div class="right-pip-3">&#11044</div>
                            <div class="right-pip-4">&#11044</div>
                            <div class="right-pip-5">&#11044</div>
                        </div>
                        <div class="face face-left">
                            <div class="left-pip-1">&#11044</div>
                            <div class="left-pip-2">&#11044</div>
                        </div>
                        <div class="face face-top">
                            <div class="top-pip-1">&#11044</div>
                            <div class="top-blank-1"></div>
                            <div class="top-blank-2"></div>
                        </div>
                        <div class="face face-bottom">
                            <div class="bottom-pip-1">&#11044</div>
                            <div class="bottom-pip-2">&#11044</div>
                            <div class="bottom-pip-3">&#11044</div>
                            <div class="bottom-pip-4">&#11044</div>
                            <div class="bottom-pip-5">&#11044</div>
                            <div class="bottom-pip-6">&#11044</div>
                        </div>
                    </div>
                </div>

                <div class={diceDisplayClass.dice3}>
                    <div class="dice dice-three" use:tippy={createTooltip('RESIDENTIAL')}>
                        <div class="face face-front">
                            <div class="front-pip-1">&#11044</div>
                            <div class="front-pip-2">&#11044</div>
                            <div class="front-pip-3">&#11044</div>
                        </div>
                        <div class="face face-back">
                            <div class="back-pip-1">&#11044</div>
                            <div class="back-pip-2">&#11044</div>
                            <div class="back-pip-3">&#11044</div>
                            <div class="back-pip-4">&#11044</div>
                        </div>
                        <div class="face face-right">
                            <div class="right-pip-1">&#11044</div>
                            <div class="right-pip-2">&#11044</div>
                            <div class="right-pip-3">&#11044</div>
                            <div class="right-pip-4">&#11044</div>
                            <div class="right-pip-5">&#11044</div>
                        </div>
                        <div class="face face-left">
                            <div class="left-pip-1">&#11044</div>
                            <div class="left-pip-2">&#11044</div>
                        </div>
                        <div class="face face-top">
                            <div class="top-pip-1">&#11044</div>
                            <div class="top-blank-1"></div>
                            <div class="top-blank-2"></div>
                        </div>
                        <div class="face face-bottom">
                            <div class="bottom-pip-1">&#11044</div>
                            <div class="bottom-pip-2">&#11044</div>
                            <div class="bottom-pip-3">&#11044</div>
                            <div class="bottom-pip-4">&#11044</div>
                            <div class="bottom-pip-5">&#11044</div>
                            <div class="bottom-pip-6">&#11044</div>
                        </div>
                    </div>
                </div>

                <div class={diceDisplayClass.dice4}>
                    <div class="dice dice-four" use:tippy={createTooltip('CULTURE')}>
                        <div class="face face-front">
                            <div class="front-pip-1">&#11044</div>
                            <div class="front-pip-2">&#11044</div>
                            <div class="front-pip-3">&#11044</div>
                        </div>
                        <div class="face face-back">
                            <div class="back-pip-1">&#11044</div>
                            <div class="back-pip-2">&#11044</div>
                            <div class="back-pip-3">&#11044</div>
                            <div class="back-pip-4">&#11044</div>
                        </div>
                        <div class="face face-right">
                            <div class="right-pip-1">&#11044</div>
                            <div class="right-pip-2">&#11044</div>
                            <div class="right-pip-3">&#11044</div>
                            <div class="right-pip-4">&#11044</div>
                            <div class="right-pip-5">&#11044</div>
                        </div>
                        <div class="face face-left">
                            <div class="left-pip-1">&#11044</div>
                            <div class="left-pip-2">&#11044</div>
                        </div>
                        <div class="face face-top">
                            <div class="top-pip-1">&#11044</div>
                            <div class="top-blank-1"></div>
                            <div class="top-blank-2"></div>
                        </div>
                        <div class="face face-bottom">
                            <div class="bottom-pip-1">&#11044</div>
                            <div class="bottom-pip-2">&#11044</div>
                            <div class="bottom-pip-3">&#11044</div>
                            <div class="bottom-pip-4">&#11044</div>
                            <div class="bottom-pip-5">&#11044</div>
                            <div class="bottom-pip-6">&#11044</div>
                        </div>
                    </div>
                </div>

                <div class={diceDisplayClass.dice5}>
                    <div class="dice dice-five" use:tippy={createTooltip('INDUSTRY')}>
                        <div class="face face-front">
                            <div class="front-pip-1">&#11044</div>
                            <div class="front-pip-2">&#11044</div>
                            <div class="front-pip-3">&#11044</div>
                        </div>
                        <div class="face face-back">
                            <div class="back-pip-1">&#11044</div>
                            <div class="back-pip-2">&#11044</div>
                            <div class="back-pip-3">&#11044</div>
                            <div class="back-pip-4">&#11044</div>
                        </div>
                        <div class="face face-right">
                            <div class="right-pip-1">&#11044</div>
                            <div class="right-pip-2">&#11044</div>
                            <div class="right-pip-3">&#11044</div>
                            <div class="right-pip-4">&#11044</div>
                            <div class="right-pip-5">&#11044</div>
                        </div>
                        <div class="face face-left">
                            <div class="left-pip-1">&#11044</div>
                            <div class="left-pip-2">&#11044</div>
                        </div>
                        <div class="face face-top">
                            <div class="top-pip-1">&#11044</div>
                            <div class="top-blank-1"></div>
                            <div class="top-blank-2"></div>
                        </div>
                        <div class="face face-bottom">
                            <div class="bottom-pip-1">&#11044</div>
                            <div class="bottom-pip-2">&#11044</div>
                            <div class="bottom-pip-3">&#11044</div>
                            <div class="bottom-pip-4">&#11044</div>
                            <div class="bottom-pip-5">&#11044</div>
                            <div class="bottom-pip-6">&#11044</div>
                        </div>
                    </div>
                </div>

            </div> <!-- END scene -->
        </div> <!-- END scene-wrapper -->
    </div> <!-- END dice-wrapper -->
</div> <!-- END dice-outer-wrapper -->