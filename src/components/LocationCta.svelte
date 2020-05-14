<script>
  import UserLocationMap from './UserLocationMap.svelte';
  
  export let lat;
	export let lon;
	export let zoom;
  
  const coords = document.cookie ? document.cookie.replace(/(?:(?:^|.*;\s*)location\s*\=\s*([^;]*).*$)|^.*$/, "$1") : '';
  let showMap = false;
  const closeMap = () => showMap = false;
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
</style>

<button class="locationCta"aria-label="Escoge tu locación en un mapa" on:click={() => (showMap = true)}>
  Cerca de {coords ? 'tí' : 'Zona Centro'} 
</button>
{#if showMap}
  <section>
    <UserLocationMap lat={lat} lon={lon} zoom={zoom} closeMap={() => closeMap()} />
  </section>
{/if}
