<script>
	import { onMount } from "svelte";

	import Map from '../components/Map.svelte';
	import MapMarker from '../components/MapMarker.svelte';
	import { getBrands } from '../utils/mintAPIUtil'
	import { getTitle } from '../utils/brandUtil'

	let brands;

  onMount(async () => {
		brands = await getBrands();
	});
</script>

<style>
	section {
		width: 100%;
		height: 600px;
	}
</style>

<section>
	{#if brands}
		<Map lat={32.49674} lon={-117.0178467} zoom={11}>
			{#each brands as brand }
				{#if brand.location}
					<MapMarker lat={brand.location.latitude} lon={brand.location.longitude} label={getTitle(brand)} id={brand.id} />
				{/if}
			{/each}
		</Map>
	{/if}
</section>
