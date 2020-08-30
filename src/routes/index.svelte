<style>


</style>

<script>
	// TO START THE SERVER --  npm run dev
	import { onMount } from 'svelte';
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

	onMount(networkInit);
	onMount(initWindow);
</script>

<ModalSwitcher />
<HeaderControls />
<Drawer />
<MainBoard />
<FeaturedOpponent />
<Footer />

