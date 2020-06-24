<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { userLocation } from '../components/stores';
  import { getLocationName, zonaCentro } from '../utils/mapboxAPIUtil';
  import Map from './Map.svelte';
  import '../theme/_smui-theme.scss';
  import './LocationDialog.scss';

  const dispatch = createEventDispatcher();
  let locationDialog;
  let coordinates;

  function handleClick(event) {
    ga('send', 'event', 'location', 'submit', !!coordinates);
    dispatch('coordinatesChange');
    setUserLocation();
  }

  export function openDialog() {
    locationDialog.open();
  }
  async function setUserLocation() {
    coordinates = JSON.parse(window.localStorage.getItem('@location'))
    userLocation.set(coordinates ? await getLocationName(coordinates.lng, coordinates.lat) : zonaCentro.title);
  }
</script>

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
