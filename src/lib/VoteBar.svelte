<script>
  export let meme;
  export let user;
  const like = async () => {
    const submit = await fetch(
      `https://geyix.herokuapp.com/like/like/${meme._id}/${user.username}`
    );
    const data = await submit.json();
    meme = data;
  };
  const dislike = async () => {
    const submit = await fetch(
      `https://geyix.herokuapp.com/like/dislike/${meme._id}/${user.username}`
    );
    const data = await submit.json();
    meme = data;
  };
</script>

<div class="vote-wrapper">
  <button class="vote-button-up" on:click={like}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      role="presentation"
      data-v-33327dc2=""
      ><g fill="currentColor"
        ><path
          d="M7.19312 0L0.193115 7H5.19312V12H9.19312V7H14.1931L7.19312 0Z"
          data-v-1424a0e1=""
        /></g
      ></svg
    ><span>{meme.likes.length}</span></button
  >
  <button class="vote-button" on:click={dislike}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      role="presentation"
      data-v-33327dc2=""
      ><g fill="currentColor"
        ><path
          d="M7.38635 12L0.386353 5H5.38635V0H9.38635V5H14.3864L7.38635 12Z"
          data-v-1424a0e1=""
        /></g
      ></svg
    ><span>{meme.dislikes.length}</span></button
  >
  <button class="vote-button">
    <img src="/comment-icon.ico" alt="s" srcset="" />
    <span class="vote-button__votes-count" data-v-33327dc2=""
      >{meme.comments.length}</span
    ></button
  >
</div>

<style>
  button {
    cursor: pointer;
    margin-right: 4px;
    display: flex;
    align-items: center;
    padding: 0.1% 1.5% 0.1% 1.5%;
  }
  .vote-wrapper {
    display: flex;
    max-width: 650px;
    margin: auto;
  }
  span {
    margin-left: 4px;
  }
  a {
    display: flex;
    outline: 1px red solid;
    border-radius: 2px;
    width: 100%;
    padding-left: 4px;
    font-size: 12px;
  }
  img {
    margin: 2px;
    width: 14px;
  }

  @media (max-width: 450px) {
  }
</style>
