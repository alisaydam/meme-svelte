<script>
  import {user} from "../stores"
</script>

<header>
  <div class="nav-wrap">
    <a class="logo" href="/">Geyix</a>
    <nav class="nav-menu">
      <ul>
        <li><a href="/auth/signup">Giriş/Üye Ol</a></li>
        {#if $user}
           <li><a href="/uploadMeme/meme">Yükle</a></li>
        {/if}
        <li><a href="#">Hehe</a></li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    /* Sticky will still add item to stacking but will stick when scroll down. And this prevents giving margin-top to each element that comes after navbar. */
    z-index: 1;
    background-color: white;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 10px;
  }
  .nav-wrap {
    display: flex;
    width: 100%;
    max-width: 900px;
    margin: auto;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-size: 25px;
    font-weight: 700;
  } 
  ul {
    display: flex;
    justify-content: center;
  }
  li {
    margin-right: 12px;
  }
  a {
    font-size: 14px;
    font-weight: 500;
  }
</style>
