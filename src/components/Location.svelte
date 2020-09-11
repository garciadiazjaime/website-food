<script>
  import { zonaCentro } from '../utils/mapboxAPIUtil';
  export let address;
  export let dist;
  export let coords;
  $: location = getLocation(address);
  $: distance = getDist(dist);

  function getLocation(address) {
    return address.length > 45 ? address.substr(0, 45) + '...' : address;
  }
  function getDist(dist) {
    dist = Number(dist)/1000;
    return `${dist.toFixed(1)}km`;
  }
  function getUrl(coords) {
    const userCoordinates = JSON.parse(window.localStorage.getItem('@location'));
    const origin = userCoordinates ? `${userCoordinates.lat},${userCoordinates.lng}` : `${zonaCentro.lat},${zonaCentro.lng}`;
    const destination = `${coords[1]}, ${coords[0]}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  }
</script>

<style>
  a {
    display: block;
    min-height: 45px;
    font-size: 16px;
    margin: 2px 0 14px;
    color: #a2a2a2;
  }
  span {
    color: #727272;
  }
</style>

{#if location || dist && coords}
  <a href={getUrl(coords)} target='_blank'>
    <span>{distance} { distance && location && '|'}</span> {location}
  </a>
{/if}
