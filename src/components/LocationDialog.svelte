<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Map from './Map.svelte';

  import './LocationDialog.scss';
  import '../theme/_smui-theme.scss';
  import { zonaCentro } from '../utils/mapboxAPIUtil';
  import { setUserLocation } from '../utils/location'

  const dispatch = createEventDispatcher();
  let locationDialog;

  async function handleClick() {
    ga('send', 'event', 'location', 'submit');
    
    await setUserLocation();

    dispatch('coordinatesChange');
  }

  export function openDialog() {
    locationDialog.open();
  }
</script>

<Dialog bind:this={locationDialog} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog cta-map location-dialog-theme">
  <Title id="simple-title">Escoge tu ubicación</Title>
  <Content id="simple-content" aria-label="Mapa">
    <Map lat={zonaCentro.lat} lng={zonaCentro.lng} zoom={zonaCentro.zoom} enableDragMarker={true}></Map>
  </Content>
  <Actions>
    <Button action="accept" on:click={handleClick}>
      <Label>Aceptar</Label>
    </Button>
  </Actions>
</Dialog>
