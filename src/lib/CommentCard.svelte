<script>
  import { fly } from "svelte/transition";
  import CommentVoteBar from "./CommentVoteBar.svelte";
  import SubCommentCard from "./SubCommentCard.svelte";
  export let comment;
  export let user;

  // let subcommentArray = [...comment.subComments.reverse()];
  // $: shownSubcomments = comment.subComments.reverse();
  // const toggleSubComments = () => {
  //   if (!shownSubcomments.length == 0) return (shownSubcomments = []);
  //   shownSubcomments = subcommentArray;
  // };
  const submitSubComment = (e) => {
    comment = e.detail;
  };
  const submitSubReply = (e) => {
    comment = e.detail;
  };
  let showSubComments = false;

  const showSubsButton = comment.subComments.length;
</script>

<div class="comment-wrapper">
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
    {#if showSubComments}
      <div in:fly={{ y: 100, duration: 500 }}>
        {#each comment.subComments.reverse() as subComment, i}
          <SubCommentCard
            {subComment}
            {comment}
            on:submitSubReply={submitSubReply}
          />
        {/each}
      </div>
    {/if}

    <div id={comment._id + "before"} />
    {#if showSubsButton && showSubComments === false}
      <a href="" on:click={() => (showSubComments = !showSubComments)}>
        ⮟ {comment.subComments.length}
        {showSubsButton === 1 ? "Yorumu" : "Yorumları"} Görüntüle
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
