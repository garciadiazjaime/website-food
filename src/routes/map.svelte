<script>
	import { onMount } from "svelte";
	import { Content } from '@smui/dialog';

	import '../components/LocationDialog.scss';
	import Map from '../components/Map.svelte';
	import MapMarker from '../components/MapMarker.svelte';
	import { getLocations } from '../utils/mintAPIUtil'
	import { getTitle } from '../utils/postUtil'
	import { zonaCentro } from '../utils/mapboxAPIUtil';
	import UnderConstruction from '../components/UnderConstruction.svelte';

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

<UnderConstruction />

<section class="cta-map">
	{#if locations}
		<Content>
			<Map lat={zonaCentro.lat} lng={zonaCentro.lng} zoom={zonaCentro.zoom}>
				{#each locations as location }
					{#if location.location && location.location.coordinates }
						<MapMarker location={location} />
					{/if}
				{/each}
			</Map>
		</Content>
	{/if}
</section>
