<script>
	export let expand;
</script>

<style>
	span {
    color: white;
    font-weight: 600;
    background-color: rgb(255,62,0);
    border-radius: 50%;
    font-size: 14px;
    width: 20px;
    height: 20px;
    text-align: center;
    display: inline-block;
    padding: 1.5px 0 0;
    box-sizing: border-box;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, .3);
  }
</style>

<span>
  {#if expand}
    -
  {:else}
    +
  {/if}
</span>
