<script>
  import { onMount } from "svelte";

  let value = "";
  let sectionCon;

  const regexSort = (arr, value, fn) => {
    const res = [];
    for (
      let i;
      (i = arr.findIndex((v) => fn(v, value))) > -1;
      res.push(arr.splice(i, 1)[0])
    );
    return [...res, ...arr];
  };

  const suggestSections = (e) => {
    const secMenu = document.getElementById("section-menu");
    if (document.body.contains(secMenu)) {
        secMenu.remove();
    }
 
    const sections = ["komik", "üzücü", "bu ne la", "allah"];
    
     const sectionsArray = regexSort(sections, value, (key, value) =>new RegExp(`${value}`, `i`).test(key))

     console.log(sectionsArray)
   
    const sectionMenu = document.createElement("div");
    sectionMenu.id = "section-menu"
    sectionMenu.classList.add("hover");
    sectionMenu.style.cssText = `border: 1px solid; width: 50%; border-radius: 10px; position: relative; margin: 16px 0; cursor: pointer;`;

    for (let i = 0; i < sectionsArray.length; i++) {
        const sectionIcon = document.createElement("img");
        sectionIcon.src = `https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg`
        const sectionName = document.createElement("p");
        sectionName.innerHTML = sectionsArray[i]
        sectionMenu.appendChild(sectionName)
    }


    sectionCon.after(sectionMenu);
  };
</script>

<div class="section-con" bind:this={sectionCon}>
  <img class="search-icon" src="/search.svg" alt="" />
  <!-- <a href="">
      <img class="arrow-icon" src="/arrow.svg" alt="" />
    </a> -->
  <input
    bind:value
    on:focus={suggestSections}
    on:input={suggestSections}
    list="countrydata1"
    class="section-input"
    id="country1"
    name="country1"
    size="50"
    autocomplete="off"
  />
</div>

<style>
  .section-con {
    padding: 12px;
    border: 1px solid;
    width: 50%;
    border-radius: 10px;
    position: relative;
    margin: 16px 0;
  }
  .section-input {
    background: none;
    color: inherit;
    border: none;
    outline: none;
    width: 100%;
    font-size: 12px;
    padding-left: 25px;
  }
  input::-webkit-calendar-picker-indicator {
    opacity: 100;
    cursor: pointer;
  }
  .search-icon {
    position: absolute;
    width: 20px;
    left: 5px;
  }
</style>
