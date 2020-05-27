<script>
	import { onMount, setContext } from 'svelte';

	if (process.browser) {
		setContext(window.key, {
			getMap: () => map
		});
	}

	export let lat;
	export let lon;
	export let zoom;

	let container;
	let map;

	onMount(() => {
		map = new mapboxgl.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lon, lat],
			zoom
		});

		return () => {
			map.remove();
		};
	});
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>
