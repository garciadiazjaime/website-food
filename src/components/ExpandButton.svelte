<script>
	export let expand;
</script>

<style>
	span {
    color: white;
    font-weight: 600;
    background-color: rgb(255,62,0);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    display: inline-block;
    padding: 1.5px 0 0;
    box-sizing: border-box;
    box-shadow: 1px 1px 3px #888888;
  }
</style>

<span>
  {#if expand}
    +
  {:else}
    -
  {/if}
</span>