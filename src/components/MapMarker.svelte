<script>
	import { onMount, getContext } from 'svelte';
	
	export let location;

	function getLngLat() {
		if (!location || !location.location || !Array.isArray(location.location.coordinates) || !location.location.coordinates.length) {
			return null
		}

		return [location.location.coordinates[0], location.location.coordinates[1]]
	}

	function getLabel() {
		return location.name || location.slug
	}

	onMount(() => {
		const lngLat = getLngLat()
		if (!lngLat) {
			return null
		}


		const { getMap } = getContext(window.key);
		const map = getMap();

		const popup = new mapboxgl.Popup({ offset: 25 })
			.setHTML(`
				<h3>${getLabel()}</h3>
				<a href="https://www.instagram.com/explore/locations/${location.id}/${location.slug}/" onclick="clickHandlerPopup('${location.id}', '${location.slug}')" rel="nofollow" target="_blank">Ver</a>
			`);

		const marker = new mapboxgl.Marker()
				.setLngLat(lngLat)
				.setPopup(popup)
				.addTo(map);
	});
</script>
