<script>
  export let item;
  const address = item.location && item.location.address ? item.location.address.street : ''
  const blackListLocations = ['Tijuana, Baja California', 'Tijuana Centro, Tijuana']

  function getTitle() {
    if (item.location && !blackListLocations.includes(item.location.name)) {
      return item.location.name
    }

    return item.fullName || item.username
  }
</script>

<style>
	div {
    display: block;
    z-index: 10;
    line-height: 1;
    margin: 8px 0 5px;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
  }

  /* .address {
    font-size: 12px;
  } */

</style>

<div>
  <div class="title">{getTitle()}</div>

  <!-- <div class="address">{address}</div> -->
</div>
