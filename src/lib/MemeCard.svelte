<script>
  export let meme;
</script>

<article class="meme">
  <header>
    <div class="post-section">
      <a href="/" class="icon">
        <picture data-v-3031e2bc=""
          ><source
            srcset="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100wp.webp"
            type="image/webp"
            data-v-3031e2bc=""
          /><img
            src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg"
            loading="lazy"
            data-v-3031e2bc=""
            alt="ss"
          /></picture
        >
      </a>
      <p>
        <a href="/">Funny</a> . 14h
      </p>
    </div>
    <a href={meme.title}>
      <h1>{meme.title}</h1>
    </a>
  </header>
  <div class="post-container">
    <a sveltekit:prefetch sveltekit:noscroll href={"/meme/"+ meme._id}>
      <img src={meme.meme} alt="" srcset="" />
    </a>
  </div> 
    <ul class="vote-left"> 
      <li><a href="/"><img class="top-arrow" src="arrow-top.svg" alt="s" srcset=""></a></li>
      <li><a href="/"><img class="top-arrow" src="arrow-top.svg" alt="s" srcset=""></a></li>
      <li><a href="/"><img class="top-arrow" src="comment-icon.ico" alt="s" srcset=""></a></li>
    </ul>
</article>

<style>
  .top-arrow{
    color: wheat;
  }
  .vote-left{
    display: flex;
  }
  
  article {
    margin-bottom: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px 0 0;
    box-sizing: border-box;
    max-width: 650px;
    margin: auto;
  }
  header {
    display: block;
  }
  .post-section {
    height: 20px;
    font-size: 12px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    min-width: 20px;
    height: 20px;
    border-radius: 2px;
    background-color: #f4f4f4;
    margin-right: 8px;
    overflow: hidden;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }
  li{
    width: 30px;
    margin-right:15px ;
    padding: 4px;

  }
  img {
    width: 100%; 
  } 
</style>
