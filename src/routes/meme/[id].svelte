<script context="module">
  export async function load({  params }) {
    const res = await fetch(`https://geyix.herokuapp.com/meme/${params.id}`);
    const data = await res.json();
    console.log(data)
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
  import { user } from "../../stores";
  let url = "https://geyix.herokuapp.com/comment/newcomment" 
  const submitComment = (e) => {
    comments = [e.detail, ...comments]
  }
</script>

<MemeCard {meme} />
{#if $user}
<SubmitComment on:submitComment={submitComment} user={$user} {url} {meme} />
{/if}
{#each comments as comment}
<CommentCard {comment} user={$user} {meme}/>
{/each}
