<script>
  let files;
  let lelo;

  async function categorize() {
    lelo.src = ""
    const img = document.getElementById("img");
    const url = window.URL.createObjectURL(files.files[0])
    lelo.src = url
    console.log(url);

    // Load model from my S3.
    // See the section hosting the model files on your site.
    const model = await nsfwjs.load();

    // Classify the image
    const predictions = await model.classify(lelo);
    console.log("Predictions: ", predictions);
  }
</script>

<svelte:head>
  <script
    src="https://unpkg.com/@tensorflow/tfjs@2.6.0"
    type="text/javascript"></script>
  <script src="https://unpkg.com/nsfwjs@2.3.0" type="text/javascript"></script>
</svelte:head>

<div>
  <h1>Yükle</h1>
  <input type="file" bind:this={files} on:change={categorize} />
  <img bind:this={lelo} src={"/placeholder.png"} id="img" alt="" />
</div>

<style>
  div {
    margin-top: 100px;
    height: 50px;
    background: red;
  }
</style>
