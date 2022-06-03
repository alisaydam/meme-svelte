<<<<<<< HEAD
<script context="module">
  export async function load({ params }) {
    console.log(params.jwt);
    const validateUser = await  fetch(`https://geyix.herokuapp.com/user/createUser/${params.jwt}`)
    const user = await validateUser.json()
    return {
      props: {
        user: user
      },
    };
  }
</script>

<script>
    export let user
  console.log(user);
</script>
=======
<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { shown } from "../../stores";

  const jwt = $page.params.jwt;

  let message = "Lütfen bekleyiniz. İşleminiz gerçekleştiriliyor...";
  onMount(async () => {
    const res = await fetch(`https://geyix.herokuapp.com/user/createUser/${jwt}`);
    const data = await res.json();
    if (data.success) {
      message = data.message;
      setTimeout(() => {
        $shown = true;
        goto("/");
      }, 1000);
    } else {
      message = data.error;
    }
  });
</script>

<div>
  <p>{message}</p>
</div>

<style>
  div {
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  p {
    background-color: rgba(192, 179, 163, 0.2);
    padding: 50px;
    border-radius: 15px;
  }
</style>
>>>>>>> 5b8286e9d3375ca659bdee90c4fac98549113e68
