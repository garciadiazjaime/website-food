<script>
  export let item;
  const blackListLocations = ['Tijuana, Baja California', 'Tijuana Centro, Tijuana']

  function getTitle() {
    if (item.location && !blackListLocations.includes(item.location.name)) {
      return item.location.name
    }

    return item.fullName || item.username
  }
</script>

<style>
  .title {
    line-height: 1.2;
    margin: 8px 0 10px;
    font-size: 22px;
    font-weight: 600;
  }
</style>

<div class="title">{getTitle()}</div>

