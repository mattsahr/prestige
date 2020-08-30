<style>

    footer {
        position: fixed;
        bottom: 0;
        background: rgb(0 30 56);
        width: 100%;
        z-index: 1000;
        padding: 6px 0 0 6px;
        height: 46px;
        min-height: 46px;
        max-height: 46px;
        transition: height 500ms ease, 
            max-height 500ms ease, 
            min-height 500ms ease;
    }

    .show-boards {
        height: 40vmin;
        min-height: 280px;
        max-height: 454px;
    }

</style>

<script>
    import { opponentsUX } from '../store/store.js';
    import OpponentBoards from '../components/OpponentBoards.svelte';

    $: footerClass = $opponentsUX.showBoards ? 'show-boards' : '';

</script>

<footer class={footerClass}>
    <OpponentBoards />
</footer>