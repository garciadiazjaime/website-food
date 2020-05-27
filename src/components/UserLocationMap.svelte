<script>
  import { onMount, setContext } from 'svelte';
  export let lat;
	export let lng;
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
    // coords = document.cookie ? document.cookie.replace(/(?:(?:^|.*;\s*)location\s*\=\s*([^;]*).*$)|^.*$/, "$1") : '';
    coords = window.localStorage.getItem('location');
    map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    if(coords) {
      setMarker(JSON.parse(coords), map);
    }
    
		map.on('click', (e) => marker ? moveMarker(getClickPoint(e), marker) : setMarker(getClickPoint(e), map, true));

		return () => {
			map.remove();
		};
  });

  function setMarker(clickPoint, map, confirm = false) {
    marker = new mapboxgl.Marker()
    .setLngLat(clickPoint)
    .addTo(map);
    showConfirm = confirm;
  }

  function moveMarker(clickPoint, marker) {
    marker.setLngLat(clickPoint);
    showConfirm = true;
  }

  function getClickPoint(e) {
    setLocationCookie(e.lngLat);
    return e.lngLat;
  }

  function setLocationCookie (lngLat) {
    var d = new Date();
    d.setTime(d.getTime() + 60*60*24*1000);
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
    height: 400px;
  }
</style>
<div class="container" bind:this={container}>
</div>
