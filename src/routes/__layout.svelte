<script>
  import app from "../app.css";
  import Navbar from "$lib/Navbar.svelte";
</script>
<div>
  <Navbar />
<slot><!-- optional fallback --></slot>
</div>
 

<style>
  div{
    width: 100vw;
   }
</style>