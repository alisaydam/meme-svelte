<header>
  <div class="nav-wrap">
    <a class="logo" href="/">Geyix</a>
    <nav class="nav-menu">
      <ul>
        <li><a href="/auth/signup">Giriş/Üye Ol</a></li>
        <li><a href="/uploadMeme/meme">Yükle</a></li>
        <li><a href="">Hehe</a></li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    /* Sticky will still add item to stacking but will stick when scroll down. And this prevents giving margin-top to each element that comes after navbar. */
    position: sticky;
    top: 0;
    display: flex;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .nav-wrap {
    display: flex;
    width: 100%;
    height: 60px;
    max-width: 900px;
    margin: auto;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-size: 25px;
    font-weight: 700;
  }
  .nav-menu {
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
