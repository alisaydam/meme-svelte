<script>
  import { fly  } from "svelte/transition"; 

  export let categoryName = "";

  const regexSort = (arr, value, fn) => {
    const res = [];
    for (
      let i;
      (i = arr.findIndex((v) => fn(v, value))) > -1;
      res.push(arr.splice(i, 1)[0])
    );
    return [...res, ...arr];
  };

  let sectionsArray = [];
  const suggestSections = () => {
    const sections = ["Komik", "Bilim", "Oha", "Bu Nedir", "Adam Çalışıyor"];

    sectionsArray = regexSort(sections, categoryName, (key, value) =>
      new RegExp(`${value}`, `i`).test(key)
    );
  };

  const selectCategory = (e) => {
    categoryName = e.target.id;
    sectionsArray = [];
  };
  let bgOpacity;
  $: color = bgOpacity < 0.6 ? "white" : "black";
</script>

<div class="container">
  <div class="section-con">
    <img class="search-icon" src="/search.svg" alt="" />
    <!-- <a href="">
        <img class="arrow-icon" src="/arrow.svg" alt="" />
      </a> -->
    <input
      on:input={suggestSections}
      autocomplete="off"
      bind:value={categoryName}
      list="countrydata1"
      class="section-input"
      id="country1"
      name="country1"
      size="50"
    />
  </div>
  <div class="categories">
    <!-- content here -->
    <div
      class="category-menu"
      style="display: {sectionsArray.length > 0 ? 'block' : 'none'}"
    >
      {#each sectionsArray as item, i}
        <div
          class="categ"
          id={item}
          on:click={selectCategory}
          in:fly={{ y: 200, duration: i * 200 }}
        >
          <img width="25" height="25" src="/placeholder.png" alt="" />
          <p>{item}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
 
  .container {
    width: 70%;
  }
  .section-con {
    padding: 12px;
    border: 0.5px var(--border) solid;
    border-radius: 10px;
    position: relative;
    margin: 16px 0 0 0;
    display: flex;
    align-items: center;
  }
  .section-input {
    background: none;
    color: inherit;
    border: none;
    outline: none;
    font-size: 16px;
    padding-left: 30px;
    line-height: 2;
  }
  input::-webkit-calendar-picker-indicator {
    opacity: 100;
    cursor: pointer;
  }
  .search-icon {
    position: absolute;
    width: 20px;
    left: 10px;
  }
  .categories {
    width: 100%;
    position: relative;
  }
  .category-menu {
    position: absolute;
    background-color: var(--bg);
    width: 100%;
    z-index: 1;
    border: 1px var(--border) solid;
    border-radius: 10px;
  }
  .categ {
    display: flex;
    padding: 10px;
    cursor: pointer;
  }
  .categ:hover {
    background-color: #363636;
  }

  p {
    margin-left: 10px;
  }
</style>
