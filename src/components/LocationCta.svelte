<script>
  import Button, { Label } from '@smui/button';
  import { onMount } from 'svelte';
  import { userLocation } from '../utils/stores.js'
  import { getLocationName, zonaCentro } from '../utils/mapboxAPIUtil';
  import { setUserLocation } from '../utils/location'
  import './LocationCta.scss';

  onMount(setUserLocation);
</script>
<div class="location-cta">
  <slot></slot>
  <div class="grid-container">
    <img src="/icons/location.svg" aria-hidden alt="" /> 
    <p>
      Cerca de {$userLocation}
    </p>
    <button aria-label="Escoge tu ubicación en el mapa">
      Cambiar
    </button>
  </div>
</div>
