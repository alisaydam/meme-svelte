<script context="module">
  export async function load({  params }) {
    const res = await fetch(`https://geyix.herokuapp.com/meme/${params.id}`);
    const data = await res.json();
    // console.log(data); server side console.log
    console.log(data)
    return {
      props: {
        meme: data,
      },
    };
  }
</script>

<script>
  import MemeCard from "$lib/MemeCard.svelte";
  import VoteBar from "$lib/VoteBar.svelte";
  import CommentCard from "$lib/CommentCard.svelte";
  export let meme;
  import SubmitComment from "$lib/SubmitComment.svelte";
  import { user } from "../../stores";

  let url = "https://geyix.herokuapp.com/comment/newcomment" 
  const submitComment = (e) => {
    console.log("reer")
    console.log(e.detail)
  }
</script>

<MemeCard {meme} />
<SubmitComment on:submitComment={submitComment} user={$user} {url} {meme} />
<CommentCard />