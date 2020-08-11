<script>
  export let address;
  export let dist;
  $: location = getLocation(address);
  $: distance = getDist(dist);

  function getLocation(address) {
    return address.length > 45 ? address.substr(0, 45) + '...' : address;
  }
  function getDist(dist) {
    dist = Number(dist)/1000;
    return `${dist.toFixed(1)}km`;
  }
</script>

<style>
  div {
    font-size: 16px;
    margin: 2px 0 14px;
    color: #a2a2a2;
  }
  span {
    color: #727272;
  }
</style>

{#if location || dist}
  <div>
    <span>{distance} { distance && location && '|'}</span> {location}
  </div>
{/if}
