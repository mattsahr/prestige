<style>
	.fouc-blind {
		z-index: 9999;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(47,125,139);
		background: radial-gradient(circle, rgba(47,125,139,1) 0%, rgba(3,65,75,1) 100%); 
	}

	.app-title {
		font-family: 'Lalezar';
		font-size: 42px;
		color: rgb(230, 230, 230);
		text-shadow: 6px 8px 10px rgba(0, 70, 80, 0.8);
	}

</style>

<script>
	// TO START THE SERVER --  npm run dev
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import HeaderControls from '../components/HeaderControls.svelte';
	import MainBoard from '../components/MainBoard.svelte';
	import FeaturedOpponent from '../components/FeaturedOpponent.svelte';
	import Drawer from '../components/drawer/Drawer.svelte';
	import Footer from '../components/Footer.svelte';
	import networkInit from '../utility/network-init';
	import { initWindow } from '../utility/helpers';
	import ModalSwitcher from '../components/modals/ModalSwitcher.svelte';
	import 'tippy.js/themes/light.css';
	import 'tippy.js/animations/shift-away.css';

	let initialized = false;

	const init = (() => {
		const removeBlind = () => {
			initialized = true;
		};

		return () => { setTimeout(removeBlind, 1200); };
	})();

	onMount(networkInit);
	onMount(initWindow);
	onMount(init);

</script>

{#if !initialized}
	<div class="fouc-blind" out:fade={{duration: 800}}><div class="app-title">Cosmo·Polix</div></div>
{:else}
	<ModalSwitcher />
	<HeaderControls />
	<Drawer />
	<MainBoard />
	<FeaturedOpponent />
	<Footer />
{/if}

