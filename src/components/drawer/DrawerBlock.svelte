<style>
    .drawer-wrapper {
        position: fixed;
        z-index: 1500;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
    }

    .background {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(10, 32, 40, 0.9);
    }

    .drawer {
        position: absolute;
        width: 90vw;
        max-width: 400px;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 20;
        background: rgb(222,222,222);
        background: linear-gradient(
            90deg, 
            rgba(222,222,222,1) 0%, 
            rgba(230,230,230,1) 25%, 
            rgba(231,231,231,1) 71%, 
            rgba(209,209,209,1) 100%
        );
        transform: translate(500px, 0);
        transition: transform 200ms ease-out;
        overflow-y: auto;
    }
    .close-me {
        width: 40px;
        height: 48px;
        opacity: 0.9;
        color: rgb(80, 90, 100);
        cursor: pointer;
        margin: 2px 0 0 12px;
        padding: 6px 0 0 6px;
    }

    .close-me:hover {
        color: rgb(10, 30, 50);
    }

</style>

<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import MdClose from 'svelte-icons/md/MdClose.svelte';
    import { adminUX } from '../../store/store';
    import GoalList from './GoalList.svelte';
    import PlayerList from './PlayerList.svelte';
    import NextTurn from './NextTurn.svelte';
    import ThemeSwitcher from './ThemeSwitcher.svelte';
    import LatestTurn from './LatestTurn.svelte';
    import Rules from './Rules.svelte';

    const DOM = { wrapper: null };

    const handleDrawerClose = () => { adminUX.toggleDrawer(); };

    const fadeOut = (node, {duration = 300}) => {
        DOM.drawer.style.transform = 'translate(500px, 0)';
        return {
            duration,
            tick: t => { 
                node.style.opacity = t; 
            }
        };
    };

    const init = (() => {
        const animateEntry = () => {
            DOM.drawer = DOM.wrapper.querySelector('.drawer');
            DOM.background = DOM.wrapper.querySelector('.background');
            DOM.drawer.style.transform = 'translate(0, 0)';
        };
        return () => { setTimeout(animateEntry, 20); };
    })();

    onMount(init);

</script>

<div class="drawer-wrapper" bind:this={DOM.wrapper}>

    <div class="drawer">
        <div class="close-me" on:click={handleDrawerClose}><MdClose /></div>
        <NextTurn handleDrawerClose={handleDrawerClose} />
        <GoalList />
        <PlayerList handleDrawerClose={handleDrawerClose} />
        <ThemeSwitcher group={$adminUX.theme} />
        <LatestTurn handleDrawerClose={handleDrawerClose} />
        <Rules handleDrawerClose={handleDrawerClose} />
    </div>

    <div class="background" in:fade out:fadeOut on:click={handleDrawerClose}></div>

</div>
