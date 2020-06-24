<script>
  import Button, { Label } from '@smui/button';
  import { onMount } from 'svelte';
  import { userLocation } from '../components/stores.js'
  import { getLocationName, zonaCentro } from '../utils/mapboxAPIUtil';
  import '../theme/_smui-theme.scss';
  let coordinates;
  onMount(async () => {
    setLocationTitle();
  });

  
  async function setLocationTitle() {
    coordinates = JSON.parse(window.localStorage.getItem('@location'));
    userLocation.set(coordinates ? await getLocationName(coordinates.lng, coordinates.lat) : zonaCentro.title);
  }
</script>
<style>
  .banner {
    background: linear-gradient(90deg, rgba(193,249,98,1) 0%, rgba(252,144,69,1) 100%);
    padding: 30px 20px;
  }
  .grid-container {
    background-color: #eaeaea;
    box-shadow: inset 0 1px 1px 0 rgba(100,100,100,.14);
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 0;
    grid-template-columns: 24px 1fr 70px;
    align-items: center;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    margin: 0;
    color: #656565;
  }

  .locationCta {
    background: #79da44;
    border-radius: 3px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    color: white;
    text-align: center;
    display:block;
    width: 100%;
    margin: 0;
    padding: 5px 0;
    border: none;
    position: relative;
    font-size: 14px;
  }
  .locationCta:focus {
    outline: none;
  }

</style>
<div class='banner'>
<slot></slot>
  <div class="grid-container">
    <img src="/icons/location.svg" aria-hidden alt="" /> 
    <p>
    Cerca de {$userLocation}
    </p>
    <button class="locationCta" aria-label="Escoge tu locación en un mapa">
      Ajustar
    </button>
  </div>
</div>
