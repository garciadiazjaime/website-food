<script>
	export let options;
</script>

<style>
	.container {
    background: #bfbfbf;
    padding: 0 15px;
    position: relative;
  }
  .container:before, div:after {
    content: "";
    position: absolute;
    width: 40px;
    height: 100%;
    top:0;
    z-index: 10;
  }
  .container:before {
    background: linear-gradient(90deg, rgba(191,191,191,1) 25%, rgba(191,191,191,0) 100%);
    left: 0
  }
  .container:after {
    background: linear-gradient(90deg, rgba(191,191,191,0) 0%, rgba(191,191,191,1) 75%);
    right: 0
  }
  .content {
    overflow-x: scroll;
    white-space: nowrap;
    width: auto;
    position: relative;
  }
  span {
    display: inline-block;
    padding: 10px 10px 10px 0;
  }
  span:last-child {
    padding-right: 0;
  }
</style>

{#if options && options.length}
  <div class="container">
    <div class="content">
      {#each options as option}
        <span>{option}</span>
      {/each}
    </div>
  </div>
{/if}
