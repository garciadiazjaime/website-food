<script>
  import { onMount, setContext } from 'svelte';

  export let closeMap;
  export let lat;
	export let lon;
	export let zoom;

  let coords = '';
  let container = {};
  let map;
  let showConfirm = false;
  let marker;

  if (process.browser) {
		setContext(window.key, {
				getMap: () => map
		});
  }

   onMount(() => {
    coords = document.cookie ? document.cookie.replace(/(?:(?:^|.*;\s*)location\s*\=\s*([^;]*).*$)|^.*$/, "$1") : '';
    
    map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom
    });

    if(coords) {
      setMarker(JSON.parse(coords), map);
    }
    
		map.on('click', (e) => marker ? moveMarker(getClickPoint(e), marker) : setMarker(getClickPoint(e), map));

		return () => {
			map.remove();
		};
  });

  const setMarker = (clickPoint, map) => {
    marker = new mapboxgl.Marker()
    .setLngLat(clickPoint)
    .addTo(map);
    showConfirm = true;
  }

  const moveMarker = (clickPoint, marker) => {
    marker.setLngLat(clickPoint);
    showConfirm = true;
  }

  const getClickPoint = (e) => {
    setLocationCookie(e.lngLat);
    return e.lngLat;
  }

  const setLocationCookie = (lngLat) => {
    var d = new Date();
    d.setTime(d.getTime() + 60*60*24*1000);
    document.cookie = `location=${JSON.stringify(lngLat)}; max-age=${d.toGMTString()}; path=/`;
    return;
  }
</script>
<style>
  .container {
    width: 100%;
    height: 100%;
  }
  .showConfirm {
    position: relative;
  }
</style>
<div class="container" bind:this={container}>
  {#if showConfirm}
    <button class="showConfirm" on:click={() => closeMap()}>Confirmar zona</button>
    {:else}
      <div>Selecciona un punto en la zona que deseas explorar</div>
  {/if}
</div>
