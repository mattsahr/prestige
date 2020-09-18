<style>
    .swipeable-item {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        transition: transform 400ms;
        transition-timing-function: ease-out;
    }

    .swipeable-item.targeted {
        z-index: 10;
    }

    .swipeable-item.targeted::after {
        content: ' ';
        position: relative;
        width: 0;
        height: 0;
        z-index: 100;
        top: -4px;
        margin-left: -8px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 24px solid rgb(230, 0, 0);
    }

</style>

<script>
export let classes = '';
</script>


<div class="swipeable-item {classes}">
    <slot />
</div>