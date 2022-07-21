<script context="module">
  export async function load({ params }) {
    const res = await fetch(
      `https://geyix.herokuapp.com/meme/getOneById/${params.memeId}`
    );
    const data = await res.json();
    return {
      props: {
        meme: data.meme,
        comments: data.comments,
      },
    };
  }
</script>

<script>
  import MemeCard from "$lib/MemeCard.svelte";
  import CommentCard from "$lib/CommentCard.svelte";
  export let meme;
  export let comments;
  import SubmitComment from "$lib/SubmitComment.svelte";
  import { memes, user } from "../../stores";
  let url = "https://geyix.herokuapp.com/comment/newcomment";
  const submitComment = (e) => {
    comments = e.detail;
  };
</script>

<div class="biggie">
  <MemeCard {meme} route={"/meme/"} />
  <SubmitComment on:submitComment={submitComment} user={$user} {url} {meme} />
  <div class="smooth">
    {#each comments as comment}
      <CommentCard {comment} {user} subComments={comment.subComments} />
    {/each}
  </div>
</div>

<style>
  .biggie {
    padding-top: 75px;
    max-width: 600px;
    margin: auto;
  }
  .smooth {
    scroll-behavior: smooth;
  }
</style>
