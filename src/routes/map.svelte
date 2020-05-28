<script>
	import { onMount } from "svelte";

	import Map from '../components/Map.svelte';
	import MapMarker from '../components/MapMarker.svelte';
	import { getLocations } from '../utils/mintAPIUtil'
	import { getTitle } from '../utils/postUtil'
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	let locations;

  onMount(async () => {
		locations = await getLocations();
	});
</script>

<style>
	section {
		width: 100%;
		height: 600px;
	}
</style>

<section>
	{#if locations}
		<Map lat={zonaCentro.lat} lng={zonaCentro.lng} zoom={11}>
			{#each locations as location }
				{#if location.location && location.location.coordinates }
					<MapMarker lat={location.location.coordinates[1]} lon={location.location.coordinates[0]} label={location.name || location.slug} />
				{/if}
			{/each}
		</Map>
	{/if}
</section>
