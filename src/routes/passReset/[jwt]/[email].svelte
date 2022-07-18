<script context="module">
  export async function load({ params }) {
    return {
      props: {
        ...params,
      },
    };
  }
</script>

<script>
  export let jwt;
  export let email;
  let data = "";
  let password, confirm;
  $: ok = password && password === confirm && password && password.length > 7;
  $: isOK = data.success ? "success" : "fail";

  const resetPassword = async () => {
    if (!ok) {
      return (data = {
        message: "Tüm alanları doğru giriniz.",
        success: false,
      });
    }
    try {
      const res = await fetch("https://geyix.herokuapp.com/user/resetPassword", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          token: jwt,
          password,
        }),
      });
      data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="wrapper">
  <div>
    <h3>Şifre en az 8 karakter uzunluğunda olmalıdır.</h3>
    <div class="group">
      <input
        class:ok
        required=""
        class="input"
        type="password"
        placeholder=" "
        bind:value={password}
        autocomplete="on"
      /><span class="highlight" /><span class="bar" />
      <label class="label" for="date">Şifre</label>
    </div>
  </div>
  <div>
    <div class="group">
      <input
        class:ok
        required=""
        class="input"
        type="password"
        placeholder=" "
        bind:value={confirm}
      /><span class="highlight" /><span class="bar" />
      <label class="label" for="date">Tekrar</label>
    </div>
    <div>
      <button outlined on:click={resetPassword} class="submit-button"
        >Sıfırla</button
      >
      <p class={isOK}>{data.message ? data.message : ""}</p>
    </div>
  </div>
</div>

<style>
  .wrapper {
    padding-top: 75px;
    max-width: 500px;
    margin: auto;
  }

  .group {
    position: relative;
    margin-top: 30px;
  }
  .label {
    color: #757575;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    top: 10px;
    left: 0;
    transition: all 0.2s ease;
  }
  .input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    background: none;
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--border);
    color: inherit;
  }
  .input:focus {
    outline: none;
  }

  /* .input:focus ~ .label {
    top: -20px;  
    color: #4a89dc;
  } */
  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: -20px;
    transform: scale(0.75);
    font-size: 14px;
    color: #4a89dc;
  }
  .bar {
    position: relative;
    display: block;
    width: 100%;
  }
  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #4a89dc;
    transition: all 0.2s ease;
  }
  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }
  .input:focus ~ .bar:before,
  .input:focus ~ .bar:after {
    width: 50%;
  }
  .ok {
    background-color: rgb(83, 210, 98);
  }
  .submit-button {
    width: 100%;
    height: 35px;
    margin-top: 25px;
  }
  .success {
    color: rgb(83, 210, 98);
  }
  .fail {
    color: red;
  }
</style>
