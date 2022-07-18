<script context="module">
  export async function load({ params }) { 
      return {
      props: {
        jwt: params.jwt,
      },
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { shown  } from "../../stores";
  let data;

  export let jwt;

  const registerUser = async () => {
    try {
      const validateUser = await fetch(
        `https://geyix.herokuapp.com/user/createUser/${jwt}`
      );
      data = await validateUser.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  onMount(() => {
    registerUser().then(() => {
      data.success &&
        setTimeout(() => {
           $shown = true;
          setTimeout(() => { 
            document.querySelector("input").value = data.email;
          }, 400);
        }, 2000);
    });
  });
</script>

{#if data}
  <div class="container">
    {#if data.success}
      <h1>
        Tebrikler {data.user}! Artık üyesin. Hadi paylaşmaya başla sanki
      </h1>
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
{/if}

<style>
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 50px;
    height: 500px;
    align-items: center;
  }
</style>
