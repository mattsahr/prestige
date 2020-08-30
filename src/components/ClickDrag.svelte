<style>
    .click-drag {
        position: absolute;
    }
</style>
<script>

/* ------------------- TOUCH DETECTION ---------------- */
/**/
 import { onMount } from 'svelte';

const noop = () => {};
let touch = false;

export let touchActive = noop;
export let touchInProgress = noop;

const initModernizr = () => {
    window.touchInProgress = false;
    window.addEventListener('touchstart', () => {
        window.touchInProgress = true;
    });

    window.addEventListener('touchend', () => {
        setTimeout(() => {
            window.touchInProgress = false;
        }, 500);
    });

    touchActive = () => window.Modernizr.touchevents;
    touchInProgress = () => window.touchInProgress;
    touch = touchActive();
};

 onMount(initModernizr);
/* ----------------- END TOUCH DETECTION ---------------- */

const dragState = {
    isMouseDown: false,
    isMoving: false,
    mouseDownPositionX: 0,
    mouseDownPositionY: 0,
    moveDeltaX: 0,
    moveDeltaY: 0
};

let dragX = 60;
let dragY = 60;

export const preventX = false;
export const preventY = false;

const onDragStart = (dragState, e) => {
    e.stopPropagation();
    console.log('onDragStart', dragState, e);
};

const onDragMove = (dragState, e) => {
    e.stopPropagation();
    if (dragState.isMoving) {
        console.log('onDragMove', dragState);
        if (!preventX) {
            dragX = dragX + dragState.moveDeltaX;
        }
        if (!preventY) {
            dragY = dragY + dragState.moveDeltaY;
        }
    }
};

const onDragStop = (dragState, e) => {
    e.stopPropagation();
    console.log('DRAG STOP', dragState);
};

const onMouseDown = e => {
    // only left mouse button
    if (touch || e.button === 0) {
        const pt = (e.changedTouches && e.changedTouches[0]) || e;

        setMousePosition(pt.clientX, pt.clientY);

        onDragStart(dragState, e);
    }
};

const onMouseUp = e => {
    console.log('ClickDrag mouse UP!');
    if (dragState.isMouseDown) {
        dragState.isMouseDown = false;
        dragState.isMoving = false;
        onDragStop(dragState, e);
    }
};

const onMouseMove = e => {
    if (dragState.isMouseDown) {
        const pt = (e.changedTouches && e.changedTouches[0]) || e;
        dragState.isMoving = true;
        dragState.moveDeltaX = pt.clientX - dragState.mouseDownPositionX;
        dragState.moveDeltaY = pt.clientY - dragState.mouseDownPositionY;
    }
    console.log('calling onDragMove!');
    console.log('elObj', elObj);
    onDragMove(dragState, e);
};

const setMousePosition = (x, y) => {
    dragState.isMouseDown = true;
    dragState.isMoving = false;
    dragState.mouseDownPositionX = x;
    dragState.mouseDownPositionY = y;
    dragState.moveDeltaX = 0;
    dragState.moveDeltaY = 0;
};

let elObj = {};

$: demoStyle = 'left: ' + dragX + 'px; top: ' + dragY + 'px;';


</script>

{#if touch}
    <div class="click-drag" style={demoStyle} bind:this={elObj}
        on:mousedown={onMouseDown}
        on:mousemove={onMouseMove}
        on:mouseup={onMouseUp} >
            <slot>Clickdrag: No Content</slot>
    </div>
{:else}
    <div class="click-drag" style={demoStyle}
        on:mousedown={onMouseDown}
        on:mousemove={onMouseMove}
        on:mouseup={onMouseUp}
        on:touchstart={onMouseDown}
        on:touchmove={onMouseMove}
        on:touchend={onMouseUp} >
            <slot>Clickdrag: No Content</slot>
    </div>
{/if}