<script>
  import { aoviSvelte } from "aovi-svelte";
  import { mode, shown, user } from "../stores";
  import { fade, fly } from "svelte/transition";

  let errors = [];
  let message = "";
  const form = aoviSvelte({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const doSignup = async () => { 
    message = "";
    errors = [];
    form.aovi
      .check("name")
      .required("Lütfen isim giriniz")
      .minLength(2, "İsim en az 2 karakter olmalı")
      .maxLength(20, "İsim 20 karakterden fazla olamaz")
      .check("username")
      .required("Kullanıcı adı giriniz")
      .match(
        /^[A-Za-z0-9_-]*$/,
        "Kullanıcı adı harf, rakam ve '_,-' karakterleri içerebilir"
      )
      .minLength(2, "Kullanıcı adı en az 2 karakter uzunluğunda olmalı")
      .check("email")
      .required("Email gereklidir")
      .match(/[^@]+@[^\.]+\..+/, "Yanlış email formatı")
      .minLength(6)
      .check("password")
      .required("Şifre gereklidir")
      .minLength(8, "Şifre en az 8 karakter uzunluğunda olmalı").end;
    if ($form.valid) {
      const { name, username, email, password } = $form;
      try {
        const submit = await fetch("https://geyix.herokuapp.com/user/newuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
          }),
        });
        const data = await submit.json();
        if (data.success) {
          message = data.message;
          $mode = "signin";
        } else {
          errors = data.errors;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const doLogin = async () => {
    const { email, password } = $form;
    try {
      const submit = await fetch("https://geyix.herokuapp.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await submit.json();
      console.log(data);
      if (data.success) {
        message = data.message;
        $user = data.user;
      } else {
        errors.includes(data.error) ? null : (errors = [...errors, data.error]);
      }
      console.log(errors);
    } catch (err) {
      console.log(err);
    }
  };

  const forgotPass = async () => {
    form.aovi
      .check("email")
      .required("Email gereklidir.")
      .match(/[^@]+@[^\.]+\..+/, "Yanlış email formatı!").end;
    if ($form.valid) {
      const { email } = $form;
      try {
        const submit = await fetch(
          "https://geyix.herokuapp.com/user/forgotPass/" + email
        );
        const data = await submit.json();
        if (data.success) {
          message = data.message;
          $mode = "signin";
        } else {
          message = data.message;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("form invalid");
    }
  };
  let tab = "signin";
  let hidePass = false;
  let showFogotPassCon = false;

  const toggleHidePass = () => (hidePass = !hidePass);
</script>

<div class="auth-box">
  <ul class="tab-menu">
    <li>
      <button
        class="tab-button"
        class:active={tab === "signin"}
        on:click={() => (tab = "signin")}>Giriş Yap</button
      >
    </li>
    <li>
      <button
        class="tab-button"
        class:active={tab === "signup"}
        on:click={() => (tab = "signup")}
      >
        Üye Ol</button
      >
    </li>
  </ul>

  <div class="forms">
    {#if tab === "signin"}
      <div>
        {#if showFogotPassCon}
          <div
            class="forgot-pass"
            in:fly={{ y: 200, duration: 200 }}
            out:fly={{ y: 200, duration: 200 }}
          >
            <div class="forgot-header">
              <p>Şifreniz mailinize gönderilecektir.</p>
              <p
                class="close-forgot"
                on:click={() => (showFogotPassCon = false)}
              >
                ×
              </p>
            </div>
            <div class="forgot-body">
              <div class="group">
                <input
                  required=""
                  class="input"
                  type="email"
                  placeholder=" "
                /><span class="highlight" /><span class="bar" />
                <label class="label" for="date">Email</label>
                <small class="error"
                  >{$form.err.email ? $form.err.email : ""}</small
                >

                <button outlined on:click={forgotPass} class="submit-button"
                  >Gönder</button
                >
              </div>
            </div>
          </div>
        {/if}
        <div class="group">
          <input
            required=""
            class="input"
            type="email"
            placeholder=" "
            bind:value={$form.email}
            on:focus={form.clear}
          /><span class="highlight" /><span class="bar" />
          <label class="label" for="date">Email</label>
        </div>
        <div class="group">
          {#if hidePass}
            <input
              required=""
              class="input"
              placeholder=" "
              type="text"
              bind:value={$form.password}
              onfocus={form.clear}
            />
          {:else}
            <input
              required=""
              class="input"
              placeholder=" "
              type="password"
              bind:value={$form.password}
              onfocus={form.clear}
            />
          {/if}<span class="highlight" /><span class="bar" />
          <label class="label" for="date">Password</label>
          <span class="eye" on:click={toggleHidePass}>👁</span>
        </div>
        {#each errors as error}
          <p class="error">{error}</p>
        {/each}
        <div>
          <button outlined on:click={doLogin} class="submit-button"
            >Giriş Yap</button
          >
        </div>
        <div class="forgot-link">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a on:click={() => (showFogotPassCon = true)}  >
            I forgot my password</a
          >
        </div>
      </div>
    {:else}
      <div>
        <div class="group">
          <input
            type="text"
            required=""
            class="input"
            placeholder=" "
            bind:value={$form.name}
            on:focus={form.clear}
          /><span class="highlight" /><span class="bar" />
          <label class="label" for="date">Name</label>
          <small class="error">{$form.err.name ? $form.err.name : ""}</small>
        </div>
        <div class="group">
          <input
            required=""
            class="input"
            placeholder=" "
            type="text"
            bind:value={$form.username}
            on:focus={form.clear}
          /><span class="highlight" /><span class="bar" />
          <label class="label" for="date">Username </label>
          <small class="error"
            >{$form.err.username ? $form.err.username : ""}</small
          >
        </div>
        <div class="group">
          <input
            required=""
            class="input"
            placeholder=" "
            type="email"
            bind:value={$form.email}
            on:focus={form.clear}
          /><span class="highlight" /><span class="bar" />
          <label class="label" for="date">Email</label>
          <small class="error">{$form.err.email ? $form.err.email : ""}</small>
        </div>
        <div class="group">
          {#if hidePass}
            <input
              required=""
              class="input"
              placeholder=" "
              type="text"
              bind:value={$form.password}
              onfocus={form.clear}
            />
          {:else}
            <input
              required=""
              class="input"
              placeholder=" "
              type="password"
              bind:value={$form.password}
              onfocus={form.clear}
            />
          {/if}<span class="highlight" /><span class="bar" />
          <label class="label" for="date">Password</label>
          <small class="error"
            >{$form.err.password ? $form.err.password : ""}</small
          >

          <span class="eye" on:click={toggleHidePass}>👁</span>
          {#each errors as error}
            <p class="error">{error}</p>
          {/each}
          <p class="success">{message && message}</p>
        </div>
        <div>
          <button outlined on:click={doSignup} class="submit-button">Üye</button
          >
        </div>
      </div>
    {/if}
  </div>

  <!-- <a on:click={() => ($mode = "forgotPass")}>Şifremi unutum :(</a> -->
</div>

<style>
  .forgot-pass {
    background: white;
    height: 300px; 
    top: 0;
    color: black;
    left: 0;
    position: absolute;
    z-index: 220;
    padding: 10px;
    width: clamp(350px, 60vw, 550px);

  }
  .forgot-header {
    display: flex;
    justify-content: space-between;
  }
  .forgot-body {
    padding: 25px;
  }
  .close-forgot {
    cursor: pointer;
  }
  .auth-box {
    display: flex;
    flex-direction: column; 
    background: white; 
    width: clamp(350px, 60vw, 550px);
  }
  .forms {
    padding: 25px;
  }
  .tab-menu {
    display: flex;
    justify-content: space-evenly;
  }
  li {
    width: 100%;
  }
  .tab-button {
    border: none;
    width: 100%;
    height: 40px;
  }
  .active {
    background: white;
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
    transition: all 0.2s ease;
  }
  .input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    background: none;
    width: 100%;
    border: none;
    border-bottom: 1px solid #757575;
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
  .eye {
    position: absolute;
    right: 0;
    top: 0;
    color: black;
    font-size: 30px;
    cursor: pointer;
  }
  .submit-button {
    width: 100%;
    height: 35px;
    margin-top: 25px;
  }
  .error {
    color: orange;
  }
  small {
    position: absolute;
    right: 0;
    font-size: 12px;
    top: -20px;
  }
  .forgot-link {
    color: blue;
    font-size: 12px;
    font-weight: 300;
  }
  .forgot-link:hover {
    text-decoration: underline;
  }
  .success {
    color: greenyellow;
  }
</style>
