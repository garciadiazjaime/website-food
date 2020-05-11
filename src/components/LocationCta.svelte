<script>
  import { onMount, setContext } from 'svelte';
  import MapMarker from '../components/MapMarker.svelte';
  
	if (process.browser) {
		setContext(window.key, {
				getMap: () => map
		});
  }
  
  export let lat;
	export let lon;
	export let zoom;
  
  let coords = '';
  let container;
  let map;
  let showMap = true;
  onMount(() => {
    coords = document.cookie ? document.cookie.replace(/(?:(?:^|.*;\s*)location\s*\=\s*([^;]*).*$)|^.*$/, "$1") : '';

    map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom
		});
		
		map.on('click', (e) => setMarker(getClickPoint(e)));

		return () => {
			map.remove();
		};
  });

  const updateLocation = () => {
    document.cookie = 'location=true; max-age=60*60*24*; path=/';
    showMap = true;
    return;
  }

  const getClickPoint = (e) => {
    console.log(e.lngLat).lng;
    const clickPoint =  {
			lngLat: JSON.stringify(e.lngLat.wrap()),
			point: JSON.stringify(e.point)
    }
    console.log(clickPoint);
    return clickPoint;
  }
  
  const setMarker = (clickPoint) => {
    const marker = new mapboxgl.Marker()
    .setLngLat(clickPoint.lngLat.lon, clickPoint.lngLat.lat)
    .addTo(map);
  }
</script>

<style>
  .locationCta {
    background: #ff5926;
    color: white;
    text-align: center;
    display:block;
    width: 100%;
    margin: 0;
    padding: 5px 0;
    border: none;
    position: relative;
  }

  .locationCta:before, .locationCta:after {
      position: absolute;
      display: block;
      content: "";
      right: 10px;
      border: 10px solid transparent; /*adjust size*/
  }
  /*Change the four instances of 'top' below to rotate (top/right/bottom/left)*/
  .locationCta::before {
      top: 7px;
      border-top-color: white; /*Chevron Color*/
  }
  .locationCta:after {
      top: 5px; /*adjust thickness*/
      border-top-color: #ff5926; /*Match background colour*/
  }
  section {
		width: 100%;
		height: 600px;
	}
  .map-container {
    width: 100%;
    height: 100%;
  }
</style>

<button class="locationCta"aria-label="Escoge tu locación en un mapa" on:click={() => updateLocation()}>
  Cerca de {coords ? 'tí' : 'Zona Centro'} 
</button>
{#if showMap}
  <section>
    <div class="map-container"bind:this={container}>
    </div>
  </section>
{/if}
