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
    } else {
      $memes = [];
      $page = 0;
      fetchData();
    }
  });

  let ulList;
  let scrollPosition;
  const backToTop = () => {
    ulList.style.scrollBehavior = "smooth";
    ulList.scrollTo(0, 0);
  };
</script>

<div>
  <ul
    class="wrapper"
    bind:this={ulList}
    on:scroll={() => (scrollPosition = ulList.scrollTop)}
  >
    {#each $memes as meme}
      <div class="atricle">
        <MemeCard {meme} route="/meme/" />
      </div>
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
  {#if scrollPosition > 1000}
    <p on:click={backToTop} title="Yukarı git">↑</p>
  {/if}
</div>

<style>
  .wrapper {
    padding: 50px 0 0 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    max-height: 100vh;
    margin: auto;
  }

  ul::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }
  ul::-webkit-scrollbar-thumb {
    background-color: rgba(211, 211, 211, 0.5);
    border-radius: 15px;
    height: 100px;
  }
  @media (max-width: 450px) {
    ul::-webkit-scrollbar {
      width: 0;
    }
  }
  div {
    position: relative;
  }
  p {
    font-size: 60px;
    position: absolute;
    background-color: rgba(211, 211, 211, 0.1);
    border-radius: 2px;
    padding: 5px;
    bottom: 25px;
    right: 50px;
    font-weight: 700;
    cursor: pointer;
    color: rgba(53, 48, 48, 0.8);
  }
  p:hover {
    background-color: #f5f5f5;
    color: rgb(48, 43, 43);
  }

  @media (max-width: 700px) {
    p {
      right: 15px;
      font-size: 40px;
      background-color: rgba(255, 251, 251, 0.5);
      color: rgba(212, 187, 187, 0,4);
    }
    p:hover {
      background-color: #f5f5f5;
      color: rgb(48, 43, 43);
    }
  }
</style>
