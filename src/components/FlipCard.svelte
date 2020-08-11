<script>
  import { scale } from 'svelte/transition';
  import ExpandButton from '../components/ExpandButton.svelte';
  let visible = false;

  function handleClick(event) {
    visible = true

    ga('send', 'event', 'card', 'flip', post.user.username);
  }
</script>

<style>
  button {
    padding: 0;
    background: none;
    border: none;
  }
  .container {
    border-radius: 4px;
    background: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 6;
    box-sizing: border-box;
  }
  .content {
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
  .content:after {
    bottom: 0;
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

<button on:click={handleClick}>
  <ExpandButton  />
</button>
{#if visible}
  <div class="container" transition:scale="{{duration: 200, start: .85}}">
    <div class="content">
      <button class="close" on:click={() => (visible = false)} />
      <slot></slot>
    </div>
  </div>
{/if}
