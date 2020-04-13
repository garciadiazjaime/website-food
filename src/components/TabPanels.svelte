<script>
  import { fade } from 'svelte/transition';

  import Phones from '../components/Phones.svelte';
  import Tabs from '../components/Tabs.svelte';
  
  export let brand = {};
  let activeTab = 'phone';
  const panelNames = ['phone', 'location_on', 'local_offer'];
</script>

<style>
  .panel {
    margin-bottom: 20px;
  }
  .ig-container {
    border-radius: 12px;
    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
    padding: 1px;
  }
  .ig-post {
    border-radius: 11px;
    position: relative;
    padding: 10px 15px 15px;
    background: white;
  }
  .ig-post:before {
    content: "Instagram reciente";
    color: #fd5949;
    position: relative;
    text-align: center;
    display: block;
    padding-bottom: 5px;
    font-size: 14px;
    width: 100%;
  }
  .address-box {
    background: #f8f8f8;
    font-size: 16px;
    padding: 10px 15px 15px;
    color: #525252;
    text-align: center;
  }
  .address-box a {
    color: #fd5949;
    text-decoration: none;
    font-weight: 600;
  }
</style>

<div class="panel">
  {#if panelNames[0] === activeTab}
    {#if brand.phones.length}
      <Phones phones={brand.phones} />
    {:else}
      <p class="address-box"> 
        Agrega un teléfono desde Instagram, has click <a href="/tutorial#agregar-telefonos">aquí</a> para saber cómo.
      </p>
    {/if}

  {:else if panelNames[1] === activeTab}
    {#if brand.loacation && brand.location.address && brand.location.address.street}
      {brand.location.address.street}
    {:else}
      <p class="address-box"> 
        Agrega una dirección desde Instagram, has click <a href="/tutorial#agregar-direccion">aquí</a> para saber cómo.
      </p>
    {/if}

  {:else}
    <div class="ig-container">
      <div class="ig-post">{brand.post.caption}</div>
    </div>
  {/if}
</div>
<Tabs bind:activeTab={activeTab} items={panelNames} />
