<script context="module">
  export async function load({ params }) {
    console.log(params.jwt);
    let data;
    try {
      const validateUser = await fetch(
        `https://geyix.herokuapp.com/user/createUser/${params.jwt}`
      );
      console.log(validateUser);
      data = await validateUser.json();
      console.log(data)
    } catch (error) {
      console.log(error);
    }
    return {
      props: {
        data: data,
      },
    };
  }
</script>

<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { shown } from "../../stores";
  export let data;

  onMount(() => { 
    data.success &&
      setTimeout(() => {
        $shown = true;
        setTimeout(() => {
          document.querySelector("input").value = data.user 
        }, 200);
      }, 1000);
  });

  console.log(data);
</script>

<div class="container">
  {#if data.success}
    <h1>Tebrikler {data.name}! Artık üyesin. Hadi paylaşmaya başla sanki</h1>
    <iframe
      src="https://giphy.com/embed/QBC5foQmcOkdq"
      width="480"
      height="384"
      frameBorder="0"
      class="giphy-embed"
      allowFullScreen
      title="pingu"
    />
  {:else}
    <h1>Üyelik başarısız. Köyüne geri dön</h1>
    <iframe
      src="https://giphy.com/embed/gfJtgKZrBfXP2"
      width="480"
      height="288"
      frameBorder="0"
      class="giphy-embed"
      allowFullScreen
      title="pingu"
    />
  {/if}
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 500px;
    align-items: center;
  }
</style>
