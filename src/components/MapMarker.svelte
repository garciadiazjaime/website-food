<script>
	import { onMount, getContext } from 'svelte';
	
	export let lat;
	export let lon;
	export let label;

	onMount(() => {
		const { getMap } = getContext(window.key);
		const map = getMap();

		const popup = new mapboxgl.Popup({ offset: 25 })
			.setText(label);

		if (lat  && lon ) {
			const marker = new mapboxgl.Marker()
				.setLngLat([lon, lat])
				.setPopup(popup)
				.addTo(map);
		}
	});
</script>
