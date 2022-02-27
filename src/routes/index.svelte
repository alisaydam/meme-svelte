<script>
  import { onMount } from "svelte";
  import InfiniteScroll from "$lib/InfiniteScroll.svelte";
  import MemeCard from "$lib/MemeCard.svelte";
  import VoteBar from "$lib/VoteBar.svelte"

  // if the api (like in this example) just have a simple numeric pagination
  let page = 0;
  // but most likely, you'll have to store a token to fetch the next page
  let nextUrl = "";
  // store all the data here.
  let data = [];
  // store the new batch of data here.
  let newBatch = [];

  async function fetchData() {
    const response = await fetch(
      `http://localhost:5000/meme/getMemes?page=${page}&limit=5`
    );
    newBatch = await response.json();
    console.log(newBatch);
  }

  onMount(() => {
    // load first batch onMount
    fetchData();
  });

  $: data = [...data, ...newBatch];
</script>

<main>
  <ul>
    {#each data as meme}
      <MemeCard {meme} />
      <VoteBar {meme}/>
    {/each}
    <InfiniteScroll
      hasMore={newBatch.length}
      threshold={100}
      on:loadMore={() => {
        page++;
        fetchData();
      }}
    />
  </ul>
</main>
<style> 
  ul {
    padding-top: 50px;
    overflow-x: hidden;  
      /* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12); */
    max-height: 100vh; 
  }
</style>
