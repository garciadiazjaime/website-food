<script>
	export let keywords;
</script>

<style>
	.container {
    position: relative;
    margin: 0 0 2px 0;
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
    padding-right: 6px;
    color: #999;
    font-size: 16px;
    line-height: 1;
  }
  span:last-child {
    margin-right: 0;
  }
</style>

{#if keywords}
  <div class="container">
    <div class="content">
      {#each keywords as keyword}
        <span>{keyword}</span>
      {/each}
    </div>
  </div>
{/if}
