<script>
  import { initializeApp } from "firebase/app";
  import { compressAccurately } from "image-conversion";
  import { Circle3 } from "svelte-loading-spinners";

  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import { user } from "../../stores";
  const firebaseConfig = {
    apiKey: "AIzaSyBP8sZ78cKyQkMFYvxaSkP7jraJqw6S5Oo",
    authDomain: "geyix-4a345.firebaseapp.com",
    projectId: "geyix-4a345",
    storageBucket: "geyix-4a345.appspot.com",
    messagingSenderId: "864445954669",
    appId: "1:864445954669:web:a91f90589e005c7c035d64",
    measurementId: "G-FQ30MM7C9H",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  let avatar,
    fileinput,
    image,
    title = "";
  let spinner = false;
  const uploadToFireStorage = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    spinner = true;
    const storageRef = ref(storage, "images/" + image.name + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (dowloadURL) => {
          try {
            const submit = await fetch(
              "https://geyix.herokuapp.com/meme/newmeme",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  meme: dowloadURL,
                  id: $user._id,
                  title: title,
                }),
              }
            );
            spinner = false;
            avatar = "";
            title = "";
            const data = await submit.json();
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  const onFileSelected = async (e) => {
    image = e.target.files[0];
    const res = await compressAccurately(image, {
      size: 250,
      accuracy: 0.9,
      width: 600,
      orientation: 1,
    });
    image = new File([res], image.name, { lastModified: Date.now() });
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };
</script>

<div class="container">
  <h2 class="page-title">Post yükle</h2>
  <div class="section-con">
    <img class="search-icon" src="/search.svg" alt="" />
    <a href="">
      <img class="arrow-icon" src="/arrow.svg" alt="" />
    </a>
    <input class="section-input" type="text" />
  </div>
  <div class="upload-con">
    <div class="title-con">
      <textarea
        class="title"
        maxlength="150"
        name=""
        id=""
        cols="30"
        bind:value={title}
        rows="3"
        placeholder="Başlk"
        contenteditable="true"
      />
      <span class="counter">
        {!title.length === 0 ? "s" : 150 - title.length}</span
      >
    </div>

    <div class="upload-card">
      <img src="" alt="" />
      <p>ddddddddddd</p>
      <input type="file" />
      <p>od</p>
      <!-- <div class="optional">

      </div> -->
    </div>
  </div>
  <div class="preview">
    <input class="title" type="text" bind:value={title} placeholder="Başlık" />
    {#if spinner}
      <div class="spinner">
        <Circle3 size="75" color="#FF3E00" unit="px" duration="1.5s" />
      </div>
    {/if}
    {#if avatar}{:else}
      <img class="avatar" src="/placeholder.png" alt="" />
    {/if}
  </div>
  <div class="upload-bar">
    <div class="item">
      <img
        class="upload"
        src="https://static.thenounproject.com/png/625182-200.png"
        alt=""
        on:click={() => {
          fileinput.click();
        }}
      />
      <div
        class="chan"
        on:click={() => {
          fileinput.click();
        }}
      >
        <p>Dosya Seç</p>
      </div>
      <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileinput}
      />
    </div>

    <div class="item">
      {#if avatar && title}
        <a href="" on:click={uploadToFireStorage}>
          <img
            class="upload"
            src="https://static.thenounproject.com/png/625182-200.png"
            alt=""
          />
          <div />
          Yükle
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    padding: 32px;
  }
  .section-con {
    padding: 12px;
    border: 1px solid;
    width: 50%;
    border-radius: 10px;
    position: relative;
    margin: 16px 0;
  }
  .search-icon {
    position: absolute;
    width: 20px;
  }
  .arrow-icon {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 15px;
  }
  .section-input {
    background: none;
    color: inherit;
    border: none;
    outline: none;
    width: 100%;
    font-size: 12px;
    text-indent: 25px;
  }
  .upload-con {
    border: 1px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
  }
  .upload-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title-con {
    width: 100%;
    padding: 8px 30px 0px 8px;
    border: 1px solid;
    border-radius: 10px;
    position: relative;
  }
  .title {
    background: none;
    width: 100%;
    border: none; 
    resize: none;
    overflow: hidden;
    outline: none;
    color: inherit;
    font-size: 12px; 
  }
  .counter {
    position: absolute;
    color: rgba(172, 168, 168, 0.5);
    top: 50%;
    transform: translateY(-50%);
    right: 2px;
  }
</style>
