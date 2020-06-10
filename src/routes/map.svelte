<script>
	import { onMount } from "svelte";

	import Map from '../components/Map.svelte';
	import MapMarker from '../components/MapMarker.svelte';
	import { getLocations } from '../utils/mintAPIUtil'
	import { getTitle } from '../utils/postUtil'
	import { zonaCentro } from '../utils/mapboxAPIUtil';
	import SectionMessage from '../components/SectionMessage.svelte';

	let locations;

  onMount(async () => {
		locations = await getLocations();
	});
</script>

<style>
	section {
		width: 100%;
		height: 100%;
	}
</style>

<SectionMessage>
	<h2>Sección en construcción</h2>
	<p>Aquí podemos incluir un parrafito con respecto al objetivo de esta sección pero no se me ha ocurrido nada</p>
</SectionMessage>
<section>
	{#if locations}
		<Map lat={zonaCentro.lat} lng={zonaCentro.lng} zoom={zonaCentro.zoom}>
			{#each locations as location }
				{#if location.location && location.location.coordinates }
					<MapMarker lat={location.location.coordinates[1]} lon={location.location.coordinates[0]} label={location.name || location.slug} />
				{/if}
			{/each}
		</Map>
	{/if}
</section>
