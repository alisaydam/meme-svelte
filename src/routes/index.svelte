<script>
  import { onMount } from "svelte";
  import InfiniteScroll from "$lib/InfiniteScroll.svelte";
  import MemeCard from "$lib/MemeCard.svelte";
  import { memes, currentMeme, page } from "../stores";

  async function fetchData() {
    const response = await fetch(
      `https://geyix.herokuapp.com/meme/getMemes?page=${$page}&limit=5`
    );
    const newBatch = await response.json();
    $memes = [...$memes, ...newBatch];
  }

  onMount(() => {
    if ($currentMeme) {
      const clickedMeme = document.getElementById($currentMeme);
      clickedMeme && clickedMeme.scrollIntoView();
     }else { 
      $memes = [];
      $page = 0;
      fetchData();
    }
  });
</script>

<ul>
  {#each $memes as meme}
    <MemeCard {meme} route="/meme/" />
  {/each}
  <InfiniteScroll
    hasMore={$memes.length}
    threshold={100}
    on:loadMore={() => {
      $page++;
      fetchData();
    }}
  />
</ul>

<style>
  ul {
    padding: 50px 0 0 0;
    overflow-x: hidden;
    /* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12); */
    max-height: 100vh;
    max-width: 600px;
    margin: auto;
  }
  ul::-webkit-scrollbar {
    display: none;
  }
</style>
