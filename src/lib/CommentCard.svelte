<script>
  import { fly } from "svelte/transition";
  import CommentVoteBar from "./CommentVoteBar.svelte";
  import SubCommentCard from "./SubCommentCard.svelte";
  export let comment;
  export let user;

  let subcommentArray = comment.subComments.reverse();
   $: shownSubcomments = [];
  const toggleSubComments = () => {
    if(!shownSubcomments.length == 0) return shownSubcomments = []
    shownSubcomments = subcommentArray
  };
  const submitSubComment = (e) => {
    comment = e.detail;
  };
  const submitSubReply = (e) => {
    comment = e.detail;
  };
</script>

<div class="comment-wrapper" >
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href={"/user/" + comment.user.username}>
    <img src={comment.user.avatar} alt="" /></a
  >
  <div class="comment">
    <h5>{comment.user.username}</h5>
    <p>{comment.comment}</p>
    <CommentVoteBar
      commentid={comment._id}
      {comment}
      on:submitSubComment={submitSubComment}
    />
    {#each shownSubcomments as subComment, i}
      <div in:fly={{ y: 200, duration: i*250}} out:fly={{ y: -200, duration: i*250}}>
        <SubCommentCard
          {subComment}
          {comment}
          on:submitSubReply={submitSubReply}
        />
      </div>
    {/each}
    <div id={comment._id + "before"} />
    {#if comment.subComments.length > 0}
      <a href="" on:click={toggleSubComments}>
        <svg width="9" viewBox="-2.5 -5 75 60" preserveAspectRatio="none">
          <path
            d="M0,0 l35,50 l35,-50"
            fill="currentColor"
            stroke="black"
            stroke-linecap="round"
            stroke-width="10"
          />
        </svg>
        {comment.subComments.length} Yorumları Görüntüle
      </a>
    {/if}
  </div>
</div>

<style>
  a {
    font-size: 12px;
  }
  A:hover {
    background-color: aliceblue;
  }
  .comment-wrapper {
    max-width: 650px;
    margin: auto;
    position: relative;
    padding: 8px 0;
  }
  .comment {
    margin-left: 50px;
    word-wrap: break-word;
  }
  h5 {
    font-size: 14px;
    line-height: 1;
    font-weight: 500;
  }
  p {
    font-size: 12px;
    padding: 0;
    margin: 0;
  }
  img {
    width: 35px;
    border-radius: 25px;
    position: absolute;
    top: 8px;
    left: 5px;
  }
</style>
