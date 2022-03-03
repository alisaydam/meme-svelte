<script>
  import { createEventDispatcher } from "svelte";
  import { Button } from 'svelte-materialify';
  export let user;
  export let url;
  export let meme;
  let comment;

  let dispatch = createEventDispatcher();

  const handleSubmit = async () => { 
       const submit = await fetch(url, {
           method: "POST",
           headers: {"Content-type" : "application/json"},
           body: JSON.stringify({ 
              comment,
               userid : user._id,
               memeid : meme._id
           })
       })
       const data = await submit.json()
       dispatch("submitComment", data);
  }
</script>

<div class="submit-wrapper">
  <div class="upper-con">
    <a href=""><img src={user.avatar} alt="sssssssss" /></a>
    <textarea
      maxlength="500"
      minlength="1"
      bind:value={comment}
      cols="30"
      rows="10"
    />
  </div>
  <div class="after-bar">
    <Button on:click ={handleSubmit}>Gönder</Button>
  </div>
</div>

<style>
  .submit-wrapper {
    max-width: 650px;
    margin: auto; 
    padding: 10px;

  }
  .upper-con {
    display: flex;
  }
  textarea {
    resize: none;
    width: 100%;
    max-height: 60px;
    border: 1px solid black;

  }
  .after-bar {
    display: flex;
    justify-content: end; 
  }
  img {
    width: 30px;
  }
</style>
