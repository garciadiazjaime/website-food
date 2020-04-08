<script>
  export let title;
  export let address;
</script>

<style>
	div {
    color: white;
    display: block;
    z-index: 10;
    line-height: 1.2;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, .5);
  }
  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .address {
    font-size: 12px;
  }

</style>

<div>
  <div class="title">{title}</div>
  {#if address}
    <div class="address">{address}</div>
  {/if}
</div>
