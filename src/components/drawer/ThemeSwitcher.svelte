<script>
    import { ExpansionPanel } from 'svelte-mui/src';
    import { Radio } from 'svelte-mui';
    import { adminUX } from '../../store/store.js';

    export let group;

    const themeOptions = {
        'Default': 'theme-default',
        'Theme B': 'theme-B'
    };

    const handleClick = e => {
        const themeName = e.target.getAttribute('data-key');
        const nextTheme = themeOptions[themeName];

        for (const theme of Object.values(themeOptions)) {
            document.body.classList.remove(theme);   
        }
        document.body.classList.add(nextTheme);
        adminUX.updateTheme(themeName);
    };

</script>


<ExpansionPanel dense name="Theme" >
    {#each Object.keys(themeOptions) as key}
        <Radio bind:group color={'#43a047'} value={key} 
            data-key={key} on:click={handleClick} >
                <span>{key}</span>
        </Radio>
    {/each}
</ExpansionPanel>