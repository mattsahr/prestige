<style>

    .swipe-panel {
        position: relative;
        height: var(--sv-swipe-panel-height, 100%);
        width: var(--sv-swipe-panel-width, inherit);
        z-index: 50;
    }
    .swipe-item-wrapper {
        overflow: hidden;
        position: relative;
        height: inherit;
        z-index: var(--sv-swipe-panel-wrapper-index, 2);
        pointer-events: none;
    }

    .swipeable-itemCount,
    .swipeable-slot-wrapper {
        position: relative;
        width: inherit;
        height: inherit;
    }

    .swipe-handler {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0px;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0);
        cursor: ew-resize;
    }

    .swipe-handler.show-boards {
        top: 80px;
    }

</style>

<script>
    import { onMount, onDestroy } from 'svelte';

    export let is_vertical = false;
    export let itemWidth = 0;
    export let itemHeight = 0;
    export let swipeClass = '';

    let swipeHandler;
    let itemCount = 0;
    let availableSpace = 0;
    let elems;
    let diff = 0;
    let min = 0;
    let swipeWrapper;
    let transformString = is_vertical 
            ? 'translate3d(0, -{{val}}px, 0)' : 'translate3d(-{{val}}px, 0, 0)';
    let touchingTpl = `
            -webkit-transition-duration: 100ms;
            transition-duration: 100ms;
            -webkit-transform: ${transformString};
            -ms-transform: ${transformString};`;
    let touching = false;
    let pos_axis = 0;
    let page_axis = is_vertical ? 'pageY' : 'pageX';
    let axis;

    function updateSwipe() {
        const { offsetWidth, offsetHeight } = swipeWrapper.querySelector('.swipeable-itemCount');

        console.log('UPDATE SWIPE >> offsetWidth', offsetWidth, ' itemWidth', itemWidth);
        availableSpace = is_vertical 
            ? itemHeight || offsetHeight 
            : itemWidth || offsetWidth;

        for (let i = 0; i < itemCount; i++) {
            const _transformValue = (availableSpace * i)+'px';
            const _transformString = is_vertical 
                ? `translate3d(0, ${_transformValue}, 0)` 
                : `translate3d(${_transformValue}, 0, 0)`;
            elems[i].style.transform = _transformString;
        }

        diff = 0;
    }

    function init(){
        elems = swipeWrapper.querySelectorAll('.swipeable-item');
        itemCount = elems.length;
        updateSwipe();
    }

    onMount(() => {
        init();
    });

    onDestroy(()=>{});


    function moveHandler(e){
        if (touching) {
            e.stopImmediatePropagation();
            e.stopPropagation();

            const max = availableSpace;
            const _axis = e.touches ? e.touches[0][page_axis] : e[page_axis];
            let _diff = (axis - _axis) + pos_axis;
            const dir = _axis > axis ? 0 : 1;
            
            if (!dir) { 
                _diff = pos_axis - (_axis - axis); 
            }

            // console.log('dir', dir, ' min [' + min + ', ' + _diff + ', ' + max + ']');

            if (_diff <= (max * (itemCount - 1)) && _diff >= min) {

                for (let i = 0; i < itemCount; i++) {
                    const template = i < 0 ? '{{val}}' : '-{{val}}';
                    const _value = (max * i) - _diff;
                    elems[i].style.cssText = touchingTpl
                        .replace(template, _value)
                        .replace(template, _value);
                }

                diff = _diff;
            }

        }
    }

    const stopEvent = e => { 
        if (e) { 
            e.stopImmediatePropagation(); 
            e.stopPropagation(); 
            e.preventDefault();
        }
    };

    function moveStart(e){
        stopEvent(e);
        touching = true;
        axis = e.touches ? e.touches[0][page_axis] : e[page_axis];

        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', moveHandler);
            window.addEventListener('mouseup', endHandler);
            window.addEventListener('touchmove', moveHandler);
            window.addEventListener('touchend', endHandler);
        }
    }


    function endHandler(e) { 
        stopEvent(e);
        touching = false;
        axis = null;
        pos_axis = diff;

        if (typeof window !== 'undefined') {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', endHandler);
            window.removeEventListener('touchmove', moveHandler);
            window.removeEventListener('touchend', endHandler);
        }
    }

    $: swipePanelClass = 'swipe-panel' + (swipeClass ? ' ' + swipeClass : '');
    $: swipeHandlerClass = 'swipe-handler' + (swipeClass ? ' ' + swipeClass : '');

</script>

<div class={swipePanelClass}>

    <div class="swipe-item-wrapper" bind:this={swipeWrapper}>
        <div class="swipeable-itemCount">
            <div class="swipeable-slot-wrapper">
                <slot />
            </div>
        </div>
    </div>

    <div class={swipeHandlerClass}
        bind:this={swipeHandler} 
        on:touchstart={moveStart} 
        on:mousedown={moveStart}>
    </div>

</div>
