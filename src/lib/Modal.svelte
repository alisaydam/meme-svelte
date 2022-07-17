<script>
  import {shown} from "../stores"
	import { fade, fly } from 'svelte/transition';

  $shown = false;

   
  export const show = () => {
    $shown = true;
  };
  export const hide = () => {
    $shown = false;
  };
</script>

<svelte:window 
on:keydown={e => {
    if(e.keyCode == 27){
        hide()
    }
}}
/>
{#if $shown}
  <div class="modal-wrapper" on:click={()=>hide()} transition:fade={{duration: 200}}>
      <div class="modal" on:click|stopPropagation>
          <button class="close-modal" on:click={()=>hide()}>×</button>
          <slot />
      </div>
  </div>
{/if}

<style>
   .close-modal{ 
      position: absolute;
      right: 0;
      top: 0;
      width: 25px;
      height: 25px; 
      cursor: pointer;
      background: none;
      border: none;
  }
  .modal-wrapper {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .modal{
      position: relative; 
  }

</style>
