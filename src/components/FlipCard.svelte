<script>
  import { scale } from 'svelte/transition';
  import ExpandButton from '../components/ExpandButton.svelte';
  export let post = {};
  let visible = false;

  function handleClick(event) {
    visible = true
    ga('send', 'event', 'flip-card', 'click', post.user.username, post.id);
  }
</script>

<style>
  button {
    padding: 0;
  }
  .ig-container {
    border-radius: 4px;
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
    padding: 1px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 6;
    box-sizing: border-box;
  }
  .ig-post {
    border-radius: 3px;
    position: relative;
    padding: 10px 15px 15px;
    background: white;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    text-align: left;
  }
  .ig-post:after {
    bottom: 0;
  }
  .title {
    color: #285AEB;
    text-align: center;
    padding-bottom: 15px;
    font-size: 14px;
    font-weight: 600;
  }
  .title img {
    margin-bottom: -8px;
  }
  .close {
    position: absolute;
    right: 5px;
    top: 10px;
    width: 20px;
    height: 20px;
    opacity: 0.3;
    border-radius: 0;
    background: none;
    border: none;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 0;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #333;
    top: 0;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
</style>
{#if post && post.caption}
  <button on:click={handleClick}>
    <ExpandButton  />
  </button>
  {#if visible}
    <div class="ig-container" transition:scale="{{duration: 200, start: .85}}">
      <div class="ig-post">
        <button class="close" on:click={() => (visible = false)} />
        <h2 class="title"><img src="/icons/offer.svg" alt="Desde Instagram"/> Desde Instagram</h2>
        {post.caption}
      </div>
    </div>
  {/if}
{/if}
