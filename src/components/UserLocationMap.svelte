<script>
  import { onMount, setContext } from 'svelte';
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
    
		map.on('click', (e) => marker ? moveMarker(getClickPoint(e), marker) : setMarker(getClickPoint(e), map, true));

		return () => {
			map.remove();
		};
  });

  const setMarker = (clickPoint, map, confirm = false) => {
    marker = new mapboxgl.Marker()
    .setLngLat(clickPoint)
    .addTo(map);
    showConfirm = confirm;
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
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>
<div class="container" bind:this={container}>
</div>
