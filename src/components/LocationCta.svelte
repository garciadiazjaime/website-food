<script>
  import UserLocationMap from './UserLocationMap.svelte';
  import Dialog, {Title, Content, Actions, InitialFocus} from '@smui/dialog';
  import Button, {Label} from '@smui/button';

  let locationDialog;
  
  export let lat;
	export let lon;
	export let zoom;
  
  const coords = document.cookie ? document.cookie.replace(/(?:(?:^|.*;\s*)location\s*\=\s*([^;]*).*$)|^.*$/, "$1") : '';
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
		width: 300px;
		height: 400px;
    position: relative;
	}
</style>

<button class="locationCta" aria-label="Escoge tu locación en un mapa" on:click={() => locationDialog.open()}>
  Cerca de {coords ? 'tí' : 'Zona Centro'} 
</button>

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
