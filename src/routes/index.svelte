<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import Card from '../components/Card.svelte';
	import LocationDialog from '../components/LocationDialog.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import LocationCta from '../components/LocationCta.svelte';
	import { getPosts } from '../utils/mintAPIUtil';
	import { zonaCentro } from '../utils/mapboxAPIUtil';
	import { userLocation } from '../components/stores';

	let posts;
	let locationDialog;
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
		grid-row-gap: 15px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
		margin: 10px;
	}

	h1 {
		color: white;
		font-size: 30px;
	}

	@media (min-width: 426px) {
		.grid-container {
			padding: 15px;
		}
	}
</style>

<svelte:head>
  <title>Feed Me TJ</title>
</svelte:head>
<StickyBanner on:click={locationDialog.openDialog}>
	<h1>Come rico en tu barrio!</h1>
	<LocationCta location={$userLocation} />
</StickyBanner>
<LocationDialog on:coordinatesChange={refreshPosts} bind:this={locationDialog} />
<div class="grid-container">
  {#if posts}
    {#each posts as post, index}
			<Card post={post} lazy={hasAPI && index > initialImagesToLoad} />
    {/each}
  {/if}
</div>

