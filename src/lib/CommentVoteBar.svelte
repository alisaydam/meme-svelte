<script>
  export let user;
  export let commentid;
  export let comment;

  const likeComment = async () => {
    console.log("yeye");
    const submit = await fetch(
      `https://geyix.herokuapp.com/like/likeComment/${user.username}/${commentid}`
    );
    const data = await submit.json();
    comment = data;
  };
  const dislikeComment = async () => {
    const submit = await fetch(
      `https://geyix.herokuapp.com/like/dislikeComment/${user.username}/${commentid}`
    );
    const data = await submit.json();
    comment = data;
  };

  const submitSubComment = async () => {
    const subComment = document.getElementById("textArea").value;
    const submit = await fetch("https://geyix.herokuapp.com/comment/newSubComment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        avatar: user.avatar,
        subComment: subComment,
        commentid: comment._id
      }),
    });
  };

  const openSubmit = (e) => {
    const subDivSel = document.getElementById("comment-div");
    if (document.body.contains(subDivSel)) {
      subDivSel.remove();
    }
    const subDiv = document.createElement("div");
    subDiv.id = "comment-div";
    subDiv.style.cssText = "display: flex;";
    const submitArea = document.createElement("textarea");
    submitArea.id = "textArea";
    const submitButton = document.createElement("button");

    subDiv.appendChild(submitArea);
    subDiv.appendChild(submitButton);

    const item = document.getElementById(e.currentTarget.id + "bar");

    submitButton.style.backgroundColor = "red";
    submitButton.innerHTML = "Gönder";
    submitArea.style.cssText = ` 
    resize: none;
    width: 90%;
    max-height: 60px;
    border: 1px solid black;`;

    item.after(subDiv);
    submitButton.onclick = submitSubComment;
  };
</script>

<div class="vote-wrapper" id={comment._id + "bar"}>
  <button on:click={likeComment} class="vote-button-up"
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
    ><span>{comment.likes.length}</span></button
  >
  <button class="vote-button" on:click|preventDefault={dislikeComment}
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
    ><span>{comment.dislikes.length}</span></button
  >
  <button
    class="vote-button"
    on:click|preventDefault={openSubmit}
    id={comment._id}
  >
    <img src="/comment-icon.ico" alt="s" srcset="" />
    <span class="vote-button">{comment.subComments.subComments.length}</span><button />
  </button>
</div>

<style>
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.1% 1.5% 0.1% 1.5%;
    border-radius: 2px;
  }
  button:hover {
    background-color: rgba(0, 119, 255, 0.06);
  }
  .voted {
    background-color: rgb(185, 204, 231);
    color: rgb(94, 108, 228);
  }
  .vote-wrapper {
    display: flex;
    max-width: 650px;
    margin: auto;
  }
  span {
    margin-left: 4px;
    font-size: 12px;
  }

  img {
    margin: 2px;
    width: 14px;
  }

  @media (max-width: 450px) {
  }
</style>
