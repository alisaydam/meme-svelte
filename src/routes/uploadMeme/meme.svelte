<script>
  import { initializeApp } from "firebase/app";
  import { compressAccurately } from "image-conversion";
  import { Circle3 } from "svelte-loading-spinners";
  // import { preventTabClose } from "../../utils/prevent";
  import { fade } from "svelte/transition";
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import { user } from "../../stores";
  import SectionInput from "$lib/SectionInput.svelte";
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  let wrongInput = false;
  let message = "";
  const sections = ["Komik", "Bilim", "Oha", "Bu Nedir", "Adam Çalışıyor"];

  let avatar,
    categoryName,
    image,
    title = "";
  let spinner = false;
  const uploadToFireStorage = () => {
    if (!sections.includes(categoryName)) {
      message = "Tüm Alanları doğru giriniz.";
      wrongInput = true;
      setTimeout(() => {
        wrongInput = false;
      }, 1500);
      return;
    }
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
                headers: new Headers({
                  Authorization: "Bearer " + $user.token,
                  "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                  meme: dowloadURL,
                  id: $user._id,
                  title: title,
                  categoryName: categoryName,
                }),
              }
            );
            spinner = false;
            avatar = "";
            categoryName = "";
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
    const img = new Image();
    image = e.target.files[0];
    const url = window.URL.createObjectURL(image);
    const data = await compressAccurately(image, {
      size: 50,
      accuracy: 0.9,
      width: 600,
      orientation: 1,
    });
    img.src = url;

    // Only can classify image with this setup. Image should be createt with new Image and has ti be given its url src like above
    try {
      const model = await nsfwjs.load();
      const predictions = await model.classify(img);
      if (predictions[0].classname === "porn") {
        message = "Uygunsuz içerik yüklenemez!.";
        wrongInput = true;
        setTimeout(() => {
          wrongInput = false;
        }, 1500);
        return;
      }
    } catch (error) {
      console.log(error);
      message = "Bir hata oluştu. Sayfayı yenileyiniz.";
      wrongInput = true;
      setTimeout(() => {
        wrongInput = false;
      }, 1500);
      return;
    }

    image = new File([data], image.name, { lastModified: Date.now() });
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    }; 
  };
  let fileInpurRef;
</script>

<svelte:head>
  <script
    src="https://unpkg.com/@tensorflow/tfjs@2.6.0"
    type="text/javascript"></script>
  <script src="https://unpkg.com/nsfwjs@2.3.0" type="text/javascript"></script>
</svelte:head>

<!-- <div use:preventTabClose={shouldWork} /> -->
<div class="container">
  <h2 class="page-title">Post yükle</h2>
  <SectionInput bind:categoryName />
  <div class="upload-con">
    <div class="title-con">
      <textarea
        oninput="auto_grow(this)"
        class="title"
        maxlength="150"
        name=""
        id=""
        cols="30"
        bind:value={title}
        placeholder="Başlk"
        contenteditable="true"
      />
      {#if wrongInput}
        <h3 transition:fade>{message}</h3>
      {/if}
      <span class="counter">
        {!title.length === 0 ? "s" : 150 - title.length}</span
      >
    </div>

    <div class="upload-card">
      {#if avatar}
        <img src={avatar} alt="" class="preview" />
      {:else}
        <img
          class="placeholder"
          src="/placeholder.png"
          alt=""
          on:click={fileInpurRef.click()}
        />
      {/if}
      <span class="card-text" on:click={fileInpurRef.click()}>Dosya seç </span>
      {#if avatar && title && categoryName}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="file-input" on:click={uploadToFireStorage}>
          <div />
          Yükle
        </a>
      {:else}
        <input
          bind:this={fileInpurRef}
          class="file-input"
          type="file"
          directory="false"
          accept=".jpg, .jpeg, .png, .gif"
          on:change={(e) => onFileSelected(e)}
        />
      {/if}
    </div>
    <div class="tags-con">
      <input
        class="tags-input"
        type="text"
        placeholder="+ Tag eklemek ister misin? Her tagdan sonra virgül bırak.Örn: 'renk,malak,dans' "
      />
    </div>
  </div>
</div>
{#if spinner}
  <div class="spinner">
    <Circle3 size="75" color="#FF3E00" unit="px" duration="1.5s" />
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    padding: 75px 32px 32px 32px;
    width: 100%;
    padding-top: 75px;
    max-width: 600px;
    margin: auto;
    overflow-x: hidden;
  }
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h3 {
    z-index: 5;
    background-color: var(--border);
    width: 100%;
    left: 0;
    position: absolute;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
  }

  input::-webkit-calendar-picker-indicator {
    opacity: 100;
    cursor: pointer;
  }
  .title-con {
    width: 100%;
    padding: 8px 30px 0px 6px;
    border: 1px var(--border) solid;
    border-radius: 10px;
    position: relative;
  }
  .title {
    outline: none;
    border: none;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    word-wrap: break-word;
    background-color: transparent;
    color: var(--palette-text);
    box-shadow: none;
    resize: none;
  }
  .counter {
    position: absolute;
    color: rgba(172, 168, 168, 0.5);
    top: 50%;
    transform: translateY(-50%);
    right: 2px;
  }
  .upload-con {
    border: 1px var(--border) solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 32px;
  }
  .upload-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 16px;
    padding: 32px;
    width: 100%;
    border: 1px var(--border) solid;
    border-radius: 10px;
  }
  .preview {
    width: 100%;
  }

  .placeholder {
    width: 70px;
  }
  .card-text {
    margin: 16px 0 16px;
  }
  .file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .file-input {
    content: "Select some files";
    width: 150px;
    background: #0077ff;
    color: white;
    padding: 10px 6px;
    font-size: 10px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    border: 1px solid transparent;
    text-indent: -40px;
  }
  .tags-con {
    padding: 12px;
    border: 1px var(--border) solid;
    border-radius: 10px;
    position: relative;
    margin: 16px 0;
    width: 100%;
  }
  .tags-input {
    background: none;
    color: inherit;
    border: none;
    outline: none;
    width: 100%;
    font-size: 12px;
  }

  /* @media only screen and (max-width:500px){ } */
  @media (max-width: 500px) {
    .container {
      padding: 75px 0 0 0;
    }
  }
  @media (max-width: 350px) {
    .upload-card {
      padding: 10px 2px;
    }
  }
</style>
