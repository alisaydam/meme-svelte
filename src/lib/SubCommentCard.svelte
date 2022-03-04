<script>
    export let subComment; 
  </script>
  
  <div class="comment-wrapper">
    <a href=""> <img src={subComment.avatar} alt="" /></a>
    <div class="comment">
      <h5>{subComment.commentor}</h5>
      <p>{subComment.subComment}</p> 
    </div>
  </div>
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
  