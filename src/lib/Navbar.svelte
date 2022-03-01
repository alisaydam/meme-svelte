<script>
  import {user} from "../stores"
  import Modal  from './Modal.svelte' 
  import { Button } from 'svelte-materialify';
  import {goto} from "$app/navigation"
  import LoginModal from "./LoginModal.svelte"
	let modal
	// Callback function provided to the `open` function, it receives the value given to the `close` function call, or `undefined` if the Modal was closed with escape or clicking the X, etc.
  
</script>

<header>
  <div class="nav-wrap">
    <a class="logo" href="/">Geyix</a>
    <nav class="nav-menu">
      <ul>
        
        {#if $user} 
        <li><Button on:click={()=>goto("/uploadMeme/meme")} rounded class="primary-color" >Yükle</Button> </li>
        {/if}
        {#if $user}
        <li><Button rounded class="blue lighten-3"  on:click={()=>$user = ""}>ÇIKIŞ</Button> </li>
        {:else}
        <li><Button rounded class="blue lighten-3"  on:click={()=> modal.show()}>GİRİŞ</Button> </li>
        {/if}
      </ul> 
      {#if !$user}
      <Modal bind:this={modal}>
        <LoginModal />
      </Modal>
      {/if}
 
    </nav>
  </div>
</header>

<style>
  .primary-color{
    background-color: red;
  }
  header {
    /* Sticky will still add item to stacking but will stick when scroll down. And this prevents giving margin-top to each element that comes after navbar. */
    position: fixed;
    z-index: 1;
    background-color: white;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 10px;
  }
  .nav-wrap {
    display: flex;
    width: 100%;
    max-width: 900px;
    margin: auto;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-size: 25px;
    font-weight: 700;
  } 
  ul {
    display: flex;
    justify-content: center;
  }
  li {
    margin-right: 12px;
  }
  a {
    font-size: 14px;
    font-weight: 500;
  }
</style>
