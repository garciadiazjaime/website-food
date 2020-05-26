<script>
  import UserLocationMap from './UserLocationMap.svelte';
  import { onMount } from 'svelte';
  import Dialog, {Title, Content, Actions, InitialFocus} from '@smui/dialog';
  import Button, {Label} from '@smui/button';

  let locationDialog;
  
  export let lat;
	export let lon;
  export let zoom;
  let location = '';
  
  const coords = document.cookie ? document.cookie.replace(/(?:(?:^|.*;\s*)location\s*\=\s*([^;]*).*$)|^.*$/, "$1") : '';
  
  onMount(async()=> {
    if(coords) {
      const coordsObj = JSON.parse(coords);
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordsObj.lng.toFixed(2)},${coordsObj.lat.toFixed(2)}.json?access_token=pk.eyJ1IjoibWludGl0bWVkaWEiLCJhIjoiY2s4ejFhcXNyMDIwMTNobXgzY3Z4NWJqdSJ9.MI6aZp0ww_JhSp1EgO8jrQ`);
      const todo = await response.json();
      location = todo.features[0].text;
    }
  });
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
  section {
		width: 100%;
		height: 400px;
    position: relative;
	}
</style>
<div class="grid-container">
  <img src="/icons/location.svg" aria-hidden alt="" /> 
  <p>
    {location ? location : 'Zona Centro'}
  </p>
  <button class="locationCta" aria-label="Escoge tu locación en un mapa" on:click={() => locationDialog.open()}>
    Ajustar
</button>
</div>

<Dialog bind:this={locationDialog} aria-labelledby="simple-title" aria-describedby="simple-content">
      <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
      <Title id="simple-title">Escoge tu locación</Title>
      <Content id="simple-content">
        <section>
          <UserLocationMap lat={lat} lon={lon} zoom={zoom} />
        </section>
      </Content>
      <Actions>
        <Button action="accept">
          <Label>Aceptar</Label>
        </Button>
      </Actions>
    </Dialog>
