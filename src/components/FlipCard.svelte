<script>
  import { fade } from 'svelte/transition';
  export let brand = {};
  let visible = true;
</script>

<style>
  .ig-container {
    border-radius: 4px;
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
    padding: 1px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    box-sizing: border-box;
  }
  .ig-post {
    border-radius: 3px;
    position: relative;
    padding: 10px 15px 15px;
    background: white;
    height: 100%;
    box-sizing: border-box;
  }
  .ig-post:before {
    content: "Instagram reciente";
    color: #bfbfbf;
    position: relative;
    text-align: center;
    display: block;
    padding-bottom: 15px;
    font-size: 14px;
    width: 100%;
  }
  .close-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 11;
  }
</style>
{#if brand.post && brand.post.caption}
  <button on:click={() => (visible = true)}>
    <img src="/icons/offer.svg" alt="Show offer from instagram"/>
  </button>
  {#if visible}
    <div class="ig-container" transition:fade="{{duration: 200}}">
      <button class="close-panel" on:click={() => (visible = false)}><img src="/icons/close.svg" alt="Close offer" ></button>
      <div class="ig-post">{brand.post.caption}</div>
    </div>
  {/if}
{/if}