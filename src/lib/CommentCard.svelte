<script>
    export let comment
</script>
<div class="comment-wrapper">
    <figure>
        <img src={comment.commentor.avatar} alt="">
    </figure>
</div>

<style>
     .comment-wrapper {
    display: flex;
    max-width: 650px;
    margin: auto;
    background-color: aquamarine;
    height: 50px;
  }
</style>