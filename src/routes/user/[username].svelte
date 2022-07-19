<script context="module">
  export async function load({ params }) {
    const getUser = await fetch(
      `https://geyix.herokuapp.com/user/getOne/${params.username}`
    );
    const user = await getUser.json();
    return {
      props: {
        displayedUser: user,
        username: params.username,
      },
    };
  }
</script>

<script>
  import InfiniteScroll from "$lib/InfiniteScroll.svelte";
  import MemeCard from "$lib/MemeCard.svelte";
  import { uploadImage } from "../../utils/imageUpload";
  import {user} from "../../stores"
  export let username;
  export let displayedUser;
  let current = "active";

  console.log(displayedUser)

  let page = 0;
  let data = [];
  let newBatch = [];
  let section = "posts";
 

  const fetchUserMemes = async () => {
    try {
      const getMemes = await fetch(
        `https://geyix.herokuapp.com/meme/getUserMemes?username=${username}&section=${section}&page=${page}&limit=5`
      );
      newBatch = await getMemes.json();
    } catch (error) {
      console.log(error);
    }
  };

  $: data = [...data, ...newBatch];

  // Upload avatar
  let fileinput;

  const onFileSelected = async (e) => {
    let image = e.target.files[0];
    const url = await uploadImage(image, "avatars/");
     try {
      const updateAvatar = await fetch(
        `https://geyix.herokuapp.com/user/update-avatar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: $user._id,
            url,
          }),
        }
      );
      const data = await updateAvatar.json()
      displayedUser = data
      $user = data

    } catch (error) {
      console.log(error)
    }
   };
</script>

<div class="wrapper">
  <div class="user">
   {#if $user}
   <div class="hover-img">
    <img width="100" src={displayedUser.avatar} alt="user-avatar" />
    <button
      on:click={() => {
        alert("Sadece kare fotoğraflar")
        fileinput.click();
      }}
      class="upload"
    >
      <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileinput}
      /><img src="/camera.svg" alt="" /></button
    >
  </div>
   {:else}
   <div  >
    <img width="100" src={displayedUser.avatar} alt="user-avatar" />
  </div>
   {/if}
    <div class="user-info">
      <h1>{displayedUser.name}</h1>
      <h5>@{displayedUser.username}</h5>
    </div>
  </div>
  <div class="tab-bar">
    <ul class="menu">
      <!-- svelte-ignore a11y-missing-attribute -->
      <li>
        <a
          class:active={current === "postlar"}
          on:click={() => {
            current = "postlar";
            newBatch = [];
            data = [];
            page = 0;
            section = "posts";
            fetchUserMemes();
          }}>Postlar</a
        >
      </li>
      <!-- svelte-ignore a11y-missing-attribute -->
      <li>
        <a
          class:active={current === "yorum"}
          on:click={() => {
            current = "yorum";
          }}>Yorum</a
        >
      </li>
      <!-- svelte-ignore a11y-missing-attribute -->
      <li>
        <a
          class:active={current === "begen"}
          on:click={() => {
            current = "begen";
            newBatch = [];
            data = [];
            page = 0;
            section = "liked";
            fetchUserMemes();
          }}>Beğeniler</a
        >
      </li>
      <!-- svelte-ignore a11y-missing-attribute -->
      <li>
        <a
          class:active={current === "kaydet"}
          on:click={() => {
            current = "kaydet";
          }}>Kaydedilenler</a
        >
      </li>
    </ul>
  </div>

  <ul>
    {#each data as meme}
      <MemeCard {meme} route={"/user/"} />
    {/each}
    <InfiniteScroll
      hasMore={newBatch.length}
      threshold={100}
      on:loadMore={() => {
        page++;
        fetchUserMemes(section);
      }}
    />
  </ul>

  {#if newBatch.length === 0}
    <p>Burada görecek bir şey yok.</p>
  {/if}
</div>

<style>
  img {
    border-radius: 50%;
    object-fit: contain;
  }
  .upload {
    position: absolute;
    top: -5px;
    right: -5px;
    opacity: 0;
    transition: all 0.45s ease;
    background: none;
    border: none;
  }
  .hover-img {
    position: relative;
    height: 100px;
    transition: all 0.45s ease;
    cursor: pointer;
  }
  .hover-img:before,
  .hover-img:after {
    background-color: rgba(0, 0, 0, 0.5);
    content: "";
    transition: all 0.3s ease;
  }

  .hover-img:hover > img {
    opacity: 0.7;
  }
  .hover-img:hover > .upload {
    opacity: 1;
  }

  .wrapper {
    padding-top: 80px;
  }
  p {
    text-align: center;
  }
  .user {
    display: flex;
    margin: auto;
    height: 100px;
  }
  .user-info {
    margin: auto 0;
    padding-left: 25px;
  }
  .tab-bar {
    box-shadow: inset 0 -1px 0 rgba(1, 1, 1, 0.2);
    margin-top: 12px;
  }
  .menu {
    display: flex;
  }
  a {
    font-weight: 700;
    display: block;
    box-sizing: border-box;
    line-height: 20px;
    height: 40px;
    padding: 10px 16px;
  }
  a:hover {
    background-color: rgba(172, 168, 168, 0.5);
  }
  .active {
    border-bottom: 2px solid;
  }
  ul {
    padding: 0;
    overflow-x: hidden;
    /* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12); */
    max-width: 600px;
    max-height: 100vh;
  }

  ul::-webkit-scrollbar {
    display: none;
  }
</style>
