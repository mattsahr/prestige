<script>
    import { adminUX } from '../../store/store';
    import DrawerBlock from './DrawerBlock.svelte';
</script>

{#if $adminUX.showDrawer}
    <DrawerBlock />
{/if}