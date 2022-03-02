<script>
  export let comments
</script>

<div class="comment-wrapper">
  
  <a href="">
    <img src={comments.commentor.avatar} alt="" /></a
  >
 <div class="comment">
     <h5>{comments.commentor.username}</h5>
     <p>{comments.comment}</p>
 </div>
</div>

<style>
  .comment-wrapper {
    display: flex;
    max-width: 650px;
    margin: auto; 
    position: relative;
    padding: 8px 0;
    
  }
  .comment{
      margin-left: 50px;
      width: 90%;
      word-wrap: break-word ;
  }
  h5{
      font-size: 14px;
      line-height: 1;
      font-weight: 500;
  }
  p{
      font-size: 12px;
      padding: 0;
  }
  img {
     width: 35px;
    border-radius: 25px;
    position: absolute;
    top: 8px;
    left: 5px;
  }
</style>
