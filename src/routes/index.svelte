<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';

	import Card from '../components/Card.svelte';
	import LocationCta from '../components/LocationCta.svelte';
	import { getPosts } from '../utils/mintAPIUtil';
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	let posts;
	const initialImagesToLoad = 2;
	let hasAPI
	if (process.browser) {
		hasAPI = "IntersectionObserver" in window; 
	}

  onMount(async () => {
		await refreshPosts()
	});

	async function refreshPosts() {
		const coordinates = JSON.parse(window.localStorage.getItem('@location'))
		const lngLat = coordinates ? [coordinates.lng, coordinates.lat] : [zonaCentro.lng, zonaCentro.lat];
		posts = await getPosts({ lngLat });
	}

	async function coordinatesChangeHandler() {
		await refreshPosts()
	}
</script>

<style>
	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 10px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
	}
</style>

<svelte:head>
  <title>Frescomer | What's coooking in Tj</title>
</svelte:head>
<LocationCta on:coordinatesChange={refreshPosts} />
<div class="grid-container">
  {#if posts}
    {#each posts as post, index}
			<Card post={post} lazy={hasAPI && index > initialImagesToLoad} />
    {/each}
  {/if}
</div>
