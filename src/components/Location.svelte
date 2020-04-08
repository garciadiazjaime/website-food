<script>
  export let item;
  const address = item.location && item.location.address ? item.location.address.street : ''

  function getTitle() {
    if (item.location) {
      return item.location.name
    }

    return item.fullName || item.username
  }
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
  <div class="title">{getTitle()}</div>

  <div class="address">{address}</div>
</div>
