<script>
  import { user, currentMeme, memes, page } from "../stores";
  import Modal from "./Modal.svelte";
  import { goto } from "$app/navigation";
  import LoginCard from "./LoginCard.svelte";
  import ThemeSwapper from "./ThemeSwapper.svelte";
  let modal;

  const reload = () => {
    $currentMeme = "";
    goto("/");
  };
</script>

<svelte:head>
  <script>
    if (document) {
      let mode = localStorage.theme;
      if (!mode && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        if (mode === "dark") {
          document.documentElement.classList.add("dark");
          localStorage.theme = "dark";
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          localStorage.theme = "light";
        }
      }
    }
  </script>
</svelte:head>
<!-- svelte-ignore a11y-missing-attribute -->
<header>
  <div class="nav-wrap">
    <div>
      <a on:click={reload} class="logo">Geyix</a>
    </div>
    <nav>
      <ul class="nav-menu">
        <li>
          <a on:click={() => goto("/uploadMeme/meme")}
            ><p style="font-size: 25px;" title="Resim Yükle">✚</p></a
          >
        </li>
        {#if $user}
          <li>
            <button>
              <img class="avatar" src={$user.avatar} alt="fesfes" width="35" />
            </button>
            <ul class="dropdown">
              <li>
                <a class="drop-list" href={"/user/" + $user.username}>Profil</a>
              </li>
              <li><a class="drop-list">Menu</a></li>
              <li>
                <a class="drop-list" on:click={() => ($user = "")}>Logout</a>
              </li>
            </ul>
          </li>
        {:else}
          <li class="avatar-li">
            <button on:click={() => modal.show()}
              ><img class="user-icon" width="25" src="/user.png" alt="enter" />
            </button>
          </li>
        {/if}
        <li><a><ThemeSwapper /></a></li>
      </ul>
      {#if !$user}
        <Modal bind:this={modal}>
          <LoginCard />
        </Modal>
      {/if}
    </nav>
  </div>
</header>

<style>
  .avatar {
    overflow: hidden;
    border-radius: 50%;
  }
  header {
    z-index: 2;
    /* Sticky will still add item to stacking but will stick when scroll down. And this prevents giving margin-top to each element that comes after navbar. */
    position: absolute;
    display: flex;
    width: 100%;
    top: 0;
    left: 0;
    background: var(--bg);
    height: 50px;
    border-bottom: 1px var(--border) solid;
  }
  .avatar-li {
    padding: 10px;
  }
  .user-icon {
    filter: invert(94%) sepia(0%) saturate(1574%) hue-rotate(185deg)
      brightness(114%) contrast(60%);
  }
  .nav-wrap {
    display: flex;
    width: 100%;
    max-width: 650px;
    margin: auto;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-size: 25px;
    font-weight: 700;
  }
  .nav-menu {
    display: flex;
    position: relative;
  }

  /* DropDown Menu    */
  li {
    transition: 0.5s;
    padding-top: 2px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  li:hover {
    background-color: rgba(172, 168, 168, 0.5);
  }
  li ul {
    padding: 10px 0;
    visibility: hidden;
    font-size: 14px;
    line-height: 2;
    opacity: 0;
    display: none;
    position: absolute;
    width: 100%;
    transition: all 0.5s ease;
    margin-top: 1rem;
    top: 30px;
    left: -10px;
    border-radius: 10px;
    line-height: 3;
    border: 1px var(--border) solid;
    font-weight: 400;
    background-color: var(--bg);
  }
  ul li:active > ul,
  ul li:focus-within > ul {
    visibility: visible;
    opacity: 1;
    display: block;
  }

  ul li ul li {
    clear: both;
    width: 100%;
  }
  ul {
    padding: 0;
    text-align: center;
  }
  button {
    background: none;
    cursor: pointer;
    border: none;
    color: inherit;
    padding: 0 11px;
  }
  ul a {
    width: 100%;
    text-align: left;
    padding: 0 11px;
  }
</style>
