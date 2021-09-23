<script>
	import { onMount } from "svelte";
	import { Content } from '@smui/dialog';

	import Map from '../components/Map.svelte';
	import MapMarker from '../components/MapMarker.svelte';
	import { getLocations } from '../utils/mintAPIUtil'
	import { zonaCentro } from '../utils/mapboxAPIUtil';

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

<section class="cta-map">
	{#if locations}
		<Content>
			<Map coords={[zonaCentro.lng, zonaCentro.lat]} zoom={zonaCentro.zoom}>
				{#each locations as location }
					{#if location.location && location.location.coordinates }
						<MapMarker location={location} />
					{/if}
				{/each}
			</Map>
		</Content>
	{/if}
</section>
