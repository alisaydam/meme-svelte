<script context="module">
  export async function load({  params }) {
    const res = await fetch(`http://localhost:5000/meme/${params.id}`);
    const data = await res.json();
    // console.log(data); server side console.log
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

  let url = "http://localhost:5000/comment/newcomment" 
  const submitComment = (e) => {
    console.log("reer")
    console.log(e.detail)
  }
</script>

<MemeCard {meme} />
<VoteBar {meme} />
{$user.avatar}
<SubmitComment on:submitComment={submitComment} user={$user} {url} {meme} />
