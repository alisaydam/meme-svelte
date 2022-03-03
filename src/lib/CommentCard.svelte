<script>
  export let comment;
  export let meme;
  export let user;
  import CommentVoteBar from "./CommentVoteBar.svelte"; 
</script>

<div class="comment-wrapper">
  <a href=""> <img src={comment.commentor.avatar} alt="" /></a>
  <div class="comment">
    <h5>{comment.commentor.username}</h5>
    <p>{comment.comment}</p>
    <CommentVoteBar {meme} {user} commentid={comment._id} {comment} />
  </div>
</div>

<!-- <MemeVoteBar {meme} user={$user} /> -->
<style>
  .comment-wrapper {
    max-width: 650px;
    margin: auto;
    position: relative;
    padding: 8px 0;
  }
  .comment {
    margin-left: 50px;
    width: 90%;
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
