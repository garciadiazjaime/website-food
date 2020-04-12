<script>
  import Phones from '../components/Phones.svelte';
  import { fade } from 'svelte/transition';
  export let brand = {};
  let currentTab = 'phone';
  let tabPanels = ['phone', 'location_on', 'local_offer'];
  import Tabs from '../components/Tabs.svelte';
</script>

<style>
</style>
<Tabs bind:activeTabValue={currentTab} items={tabPanels} />
{#if tabPanels[0] === currentTab}
  <Phones phones={brand.phones} />
{/if}

{#if tabPanels[1] === currentTab}
  {#if brand.loacation && brand.location.address && brand.location.address.street}
    {brand.location.address.street}
    {:else}
      No hay dirección, haz click <a href="/tutorial#agregar-locacion">aquí</a> para saber como agregarla
  {/if}
{/if}
{#if tabPanels[2] === currentTab}
  <div>{brand.post.caption}</div>
{/if}