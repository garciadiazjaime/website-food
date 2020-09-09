<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Map from './Map.svelte';

  import './LocationDialog.scss';
  import '../theme/_smui-theme.scss';
  import { zonaCentro } from '../utils/mapboxAPIUtil';
  import { setUserLocation } from '../utils/location'

  const dispatch = createEventDispatcher();
  let dialogRef;
  let centerCoords;
  
  onMount(() => {
    const userCoordinates = JSON.parse(window.localStorage.getItem('@location'));
    if (userCoordinates) {
      centerCoords = [userCoordinates.lng, userCoordinates.lat];
    } else {
      centerCoords = [zonaCentro.lng, zonaCentro.lat];
    };
  });

  async function handleClick() {
    await setUserLocation();

    dispatch('coordinatesChange');

    ga('send', 'event', 'location', 'submit');
  }

  export function openDialog() {
    dialogRef.open();

    ga('send', 'event', 'location', 'change');
  }
</script>

<Dialog bind:this={dialogRef} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog cta-map location-dialog-theme">
  <Title id="simple-title">Escoge tu ubicación</Title>
  <Content id="simple-content" aria-label="Mapa">
    {#if centerCoords}
      <Map coords={centerCoords} zoom={zonaCentro.zoom} enableDragMarker={true}></Map>
    {/if}
  </Content>
  <Actions>
    <Button action="accept" on:click={handleClick}>
      <Label>Aceptar</Label>
    </Button>
  </Actions>
</Dialog>
