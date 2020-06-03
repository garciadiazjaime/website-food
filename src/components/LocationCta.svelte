<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';

  import { getLocationName, zonaCentro } from '../utils/mapboxAPIUtil';
  import Map from './Map.svelte';
  import '../theme/_smui-theme.scss';
import './LocationCta.scss';
  const dispatch = createEventDispatcher();
  let locationDialog
  let locationTitle = '...'
  let coordinates
  
  onMount(async () => {
    setLocationDialog();
  });

  function handleClick(event) {
    ga('send', 'event', 'location', 'submit', !!coordinates);
    dispatch('coordinatesChange');
    setLocationDialog();
  }
  async function setLocationDialog() {
    coordinates = JSON.parse(window.localStorage.getItem('@location'))
    locationTitle = coordinates ? await getLocationName(coordinates.lng, coordinates.lat) : zonaCentro.title;
  }
</script>

<style>
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
<div class="grid-container">
  <img src="/icons/location.svg" aria-hidden alt="" /> 
  <p>
   Cerca de {locationTitle}
  </p>
  <button class="locationCta" aria-label="Escoge tu locación en un mapa" on:click={locationDialog.open()}>
    Ajustar
  </button>
</div>

<Dialog bind:this={locationDialog} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog cta-map frescomer-theme">
  <Title id="simple-title">Escoge tu ubicación</Title>
  <Content id="simple-content" aria-label="Mapa">
    <Map lat={zonaCentro.lat} lng={zonaCentro.lng} zoom={zonaCentro.zoom} enablePinMarker={true}></Map>
  </Content>
  <Actions>
    <Button action="accept" on:click={handleClick}>
      <Label>Aceptar</Label>
    </Button>
  </Actions>
</Dialog>
