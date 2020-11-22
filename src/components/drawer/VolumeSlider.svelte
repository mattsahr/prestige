<style>
    .drawer-button {
        width: 100%;
        min-height: 110px;
        cursor: pointer;
        background: none;
        color: inherit;
        font-size: 16px;
        line-height: 1;
        padding: 11px 34px 10px 10px;
        border: 2px solid transparent;
        border-top: 1px solid rgb(220, 220, 220);
        border-bottom: 1px solid rgb(220, 220, 220);
        text-align: left;
        outline: none;

        position: relative;
        box-sizing: border-box;
        background: var(--bg-color, #fbfbfb);
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 
            0px 1px 1px 0px rgba(0, 0, 0, 0.14), 
            0px 1px 3px 0px var(--border, #dfdfdf);
    }

    .drawer-button:hover {
        background: rgb(255, 255, 255);
    }

    .label {
        width: 100%;
        font-size: 0.8em;
        font-weight: bold;
        text-transform: uppercase;
        padding: 13px 0 4px 16px;
    }

</style>

<script>
    import RangeSlider from "svelte-range-slider-pips";
    import { dashboardUX } from '../../store/store.js';

    let hue = [Math.round($dashboardUX.audioVolume * 360)];
    let volumeInit = false;

    const setVolume = (() => {
        let timer = null;

        return newVolume => {
            window.clearTimeout(timer);
            timer = setTimeout(() => {

                if (volumeInit) {
                    dashboardUX.setAudioVolume(newVolume);

                    if (window.Cookies) {
                        window.Cookies.set('audioVolume', newVolume, 30);
                    }
                } else {
                    volumeInit = true;
                }

            }, 100);

        };
    })();

    const formatter = val => {
        setVolume(val/360);
        return Math.round(val / 3.6); 
    };

    $: lightColor = `hsl(${Math.round(hue[0]) - 10}, 65%, 70%)`;
    $: color = `hsl(${Math.round(hue[0])}, 63%, 54%)`;

</script>  
  
<div class="drawer-button" style="--range-handle-focus: {color}; --range-range: {lightColor}">
    <div class="label">Volume</div>
    <RangeSlider id="color-pips" bind:values={hue}
        float={true} formatter={formatter}
        range="min" max={360} pips pipstep={36} first={false} last={false} />
</div>

