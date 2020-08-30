<style>
    .drawer-button {
        display: flex;
        align-items: flex-start;
        width: 100%;
        min-height: 50px;
        cursor: pointer;
        background: none;
        color: inherit;
        font-size: 16px;
        line-height: 1;
        border: 2px solid transparent;
        outline: none;
        margin: 0;
        padding: 10px 22px;
        text-align: left;
        outline: none;

        position: relative;
        box-sizing: border-box;
        background: var(--bg-color, #fbfbfb);
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 
            0px 1px 1px 0px rgba(0, 0, 0, 0.14), 
            0px 1px 3px 0px var(--border, #dfdfdf);
    }
    .title {
        flex: 1;
        line-height: 24px
    }
    .next-icon {
        position: relative;
        color: rgb(240, 220, 0);
        height: 26px;
        width: 38px;
        margin: 0 -12px -20px 0;
    }

    .drawer-button:hover {
        background: rgb(255, 255, 255);
    }

    .drawer-button:hover .next-icon {
        color: rgb(246, 140, 0);
    }

</style>

<script>
    import MdMore from 'svelte-icons/md/MdMore.svelte';

    export let handleDrawerClose = () => false;

    const handleNextClick = () => {
        console.log('NEXT CLICK!');
    };
</script>


<div class="drawer-button" on:click={handleNextClick}>
    <div class="title">Next Turn</div>
    <div class="next-icon">
        <MdMore />
    </div>
</div>
