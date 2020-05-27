<script>
  import { onMount, setContext } from 'svelte';
  export let lat;
	export let lng;
  export let zoom;
  export let markerCoords;

  let container = {};
  let map;
  let marker;

  if (process.browser) {
    setContext(window.key, {
      getMap: () => map
    });
  }

  onMount(() => {
    map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    if(markerCoords) {
      setMarker(markerCoords);
    }
    
    map.on('click', (e) => setMarker(e.lngLat));

    return () => {
      map.remove();
    };
  });

  function setMarker(lngLat) { 
    if (!marker) {
      marker = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .addTo(map);
    }
    setLocationLocalStorage(lngLat);
    marker.setLngLat(lngLat);
  }

  function setLocationLocalStorage (lngLat) {
    window.localStorage.setItem('location', `${JSON.stringify(lngLat)}`);
    return;
  }
</script>
<style>
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 300px;
  }
</style>
<div class="container" bind:this={container}>
</div>
