<script>
	export let post;
</script>

<style>
	.container {
    background: white;
    position: relative;
    margin-top: auto;
  }
 .container:after {
    content: "";
    position: absolute;
    width: 24px;
    height: 100%;
    top:0;
    z-index: 6;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 75%);
    right: 0;
  }
  .content {
    overflow-x: scroll;
    white-space: nowrap;
    width: auto;
    position: relative;
  }
  span {
    display: inline-block;
    padding: 3px 10px 4px;
    margin-right: 8px;
    color: #525252;
    background-color: #efefef;
    font-size: 16px;
    line-height: 1;
    border-radius: 4px;
  }
  span:last-child {
    margin-right: 0;
  }
</style>

{#if post && post.meta && post.meta.options && post.meta.options.length}
  <div class="container">
    <div class="content">
      {#each post.meta.options as option}
        <span>{option}</span>
      {/each}
    </div>
  </div>
{/if}
