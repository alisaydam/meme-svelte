<script>
  import { initializeApp } from "firebase/app";
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

  let avatar, fileinput, image, title, meme;
  const uploadToFireStorage = () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + image.name);
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
            const submit = await fetch("https://geyix.herokuapp.com/meme/newmeme", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                meme: dowloadURL,
                id: $user.id,
                title: title,
              }),
            });

            const data = await submit.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  const onFileSelected = (e) => {
    image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };
</script>

<div id="app">
  <h2>Meme Yükle</h2>
  <div class="drag-drop">
    <input type="text" bind:value={title} placeholder="Başlık" />
    {#if avatar}
      <img class="avatar" src={avatar} alt="d" />
    {:else}
      <img
        class="avatar"
        src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
        alt=""
      />
    {/if}
  </div>
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
    Choose Image
  </div>
  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
  {#if avatar}
    <div class="chan" on:click={uploadToFireStorage}>UploadImage</div>
  {/if}
</div>

<style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }

  .upload {
    display: flex;
    height: 50px;
    width: 50px;
    cursor: pointer;
  }
  .chan {
    cursor: pointer;
  }
  .avatar {
    display: flex;
    height: 200px;
    width: 200px;
  }
</style>
