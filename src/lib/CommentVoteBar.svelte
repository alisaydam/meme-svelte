<script>
  import { createEventDispatcher } from "svelte";
  import { shown, user } from "../stores"; 
  export let commentid;
  export let comment;

  const dispatch = createEventDispatcher();

  const likeComment = async () => {
    if (!$shown) {
      return ($shown = true);
    }
    const submit = await fetch(
      `https://geyix.herokuapp.com/like/likeComment/${$user.username}/${commentid}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + $user.token,
          "Content-Type": "application/json",
        }),
      }
    );
    const data = await submit.json();
    comment = data;
  };
  const dislikeComment = async () => {
    if (!$shown) {
      return ($shown = true);
    }
    const submit = await fetch(
      `https://geyix.herokuapp.com/like/dislikeComment/${$user.username}/${commentid}`,
      {
        headers: new Headers({
          Authorization: "Bearer " + $user.token,
          "Content-Type": "application/json",
        }),
      }
    );
    const data = await submit.json();
    comment = data;
  };

  const submitSubComment = async () => {
    const subComment = document.getElementById("textArea").value;
    if(!subComment.trim()){
      return
    }
    if (!$shown) {
      return ($shown = true);
    }
    const submit = await fetch("https://geyix.herokuapp.com/comment/newSubComment", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + $user.token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        username: $user.username, 
        subComment: subComment,
        commentId: comment._id,
      }),
    });
    const data = await submit.json();
    dispatch("submitSubComment", data);
    const subDivSel = document.getElementById("comment-div");
    subDivSel.remove();
  };

  const openSubmit = (e) => {
    if (!$shown) {
      return ($shown = true);
    }
    const subDivSel = document.getElementById("comment-div");
    if (document.body.contains(subDivSel)) {
      subDivSel.remove();
    }
    const subDiv = document.createElement("div");
    subDiv.id = "comment-div";
    subDiv.style.cssText = "display: flex;";
    subDiv.classList.add("fade-in");
    const submitArea = document.createElement("textarea");
    submitArea.id = "textArea";
    const submitButton = document.createElement("button");

    subDiv.appendChild(submitArea);
    subDiv.appendChild(submitButton);

    const item = document.getElementById(e.currentTarget.id + "bar");

    submitButton.innerHTML = "Gönder";
    submitArea.style.cssText = ` 
    resize: none;
    width: 90%;
    border-radius: 5px;
    height: 50px;
    background-color: inherit;
    max-height: 60px;
    color: inherit;
    border: 1px solid var(--border);`;

    item.after(subDiv);
    submitButton.onclick = submitSubComment;
    submitArea.focus();
  };
</script>

<div class="vote-wrapper" id={comment._id + "bar"}>
  <button on:click={likeComment} class="vote-button-up"
    ><svg
      class={comment.likes.includes($user.username) ? "voted" : ""}
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
    ><span>{comment.likes.length}</span></button
  >
  <button class="vote-button" on:click|preventDefault={dislikeComment}
    ><svg
      class={comment.dislikes.includes($user.username) ? "voted" : ""}
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
    ><span>{comment.dislikes.length}</span></button
  >
  <button
    class="vote-button"
    on:click|preventDefault={openSubmit}
    id={comment._id}
  >
    <img src="/ftcomment.svg" alt="s" srcset="" />
    <span class="vote-button">{comment.subComments.length}</span><button />
  </button>
</div>

<style>
  .voted {
    color: rgb(94, 108, 228);
  }
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 2px 1.5% 2px 1.5%;
    border-radius: 2px;
    color: inherit;
    background-color: inherit;
    border: none;
  }
  button:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
  .vote-wrapper {
    display: flex;
  }
  span {
    margin-left: 4px;
    font-size: 12px;
  }

  img {
    margin: 2px;
    width: 20px;
  }
</style>
