<script>
    import FeaturedOpponentBlock from './FeaturedOpponentBlock.svelte';
    import { opponentsUX } from '../store/store';
    $: show = $opponentsUX.featuredBoard && $opponentsUX.showFeatured;
</script>

{#if show}
    <FeaturedOpponentBlock />
{/if}
