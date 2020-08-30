<style>
   .button-icon {
      padding: 12px;
      cursor: pointer;
   }
   .button-icon svg { 
      opacity: 0.7;
   }

   .button-icon:hover svg {
      opacity: 1;
   }
</style>

<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    const click = () => dispatch('click');
    export let style = '';
</script>

<div class="button-icon" on:click={click} style={style}>
   <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20">
     <g fill="#fff">
       <path d="M0 0h27v4H0zM0 8h27v4H0zM0 16h27v4H0z"/>
     </g>
   </svg>
</div>