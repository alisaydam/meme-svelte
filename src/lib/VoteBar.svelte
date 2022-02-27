<script>
  export let meme;
</script>

<div class="vote-wrapper">
  <div class="vote-con">
    <a href="/"
      ><img src="/arrow-top.svg" alt="s" srcset="" />
      <p>{meme.likes.length}</p></a
    >
  </div>
  <div class="vote-con">
    <a href="/"
      ><img src="/arrow-top.svg" alt="s" srcset="" />
      <p>{meme.dislikes.length}</p></a
    >
  </div>
  <div class="vote-con">
    <a href="/"
      ><img src="/comment-icon.ico" alt="s" srcset="" />
      <p>{meme.comments.length}</p></a
    >
  </div>
</div>

<style>
  .vote-wrapper {
    display: flex;
    max-width: 650px;
    margin: auto;
  }
  .vote-con {
    display: flex;
    justify-items: center;
    height: 20px;
    width: 10%;
    margin-right: 3px;
  }
  a {
    display: flex;
    outline: 1px red solid;
    border-radius: 2px;
    width: 100%;
    padding-left: 4px;
    font-size: 12px;
  }
  img {
    margin: 2px;
  }

  @media (max-width: 450px) {
    a {
      font-size: 9px;
    }
    .vote-con {
      height: 15px;
    }
  }
</style>
