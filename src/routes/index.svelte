<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';

	import Card from '../components/Card.svelte';
	import LocationDialog from '../components/LocationDialog.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import LocationCta from '../components/LocationCta.svelte';
	import { userLocation } from '../utils/stores';
	import { getPosts } from '../utils/mintAPIUtil';
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	let posts;
	let locationDialog;
	let hasAPI
	const initialImagesToLoad = 2;

	if (process.browser) {
		hasAPI = "IntersectionObserver" in window; 
	}

  onMount(async () => {
		await refreshPosts();
		window._BUILD_VERSION = 'BUILD_VERSION'
	});

	async function refreshPosts() {
		const coordinates = JSON.parse(window.localStorage.getItem('@location'))
		const lngLat = coordinates ? [coordinates.lng, coordinates.lat] : [zonaCentro.lng, zonaCentro.lat];

		posts = await getPosts({ lngLat, state: 'MAPPED' });
	}
</script>

<style>
	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 12px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
		margin: 10px;
	}
	img {
		width: 150px;
		display: block;
		margin: 0 auto 20px;
	}

	@media (min-width: 450px) {
      img {
				width: 200px;
			}
	}

	h2 {
		margin-bottom: 20px;
		color: #313d69;
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
	<img src="feedmetj_logo.svg" alt="Feed me Tj"/>
	<h2>
		La comida más rica del mundo se hace en Tijuana<br>
		Encuéntrala aquí!
	</h2>
	<div on:click={locationDialog.openDialog}>
		<LocationCta location={$userLocation} />
	</div>
</StickyBanner>
<LocationDialog on:coordinatesChange={refreshPosts} bind:this={locationDialog} />
<div class="grid-container">
  {#if posts}
    {#each posts as post, index}
			<Card post={post} lazy={hasAPI && index > initialImagesToLoad} />
    {/each}
  {/if}
</div>
<LocationDialog on:coordinatesChange={refreshPosts} bind:this={locationDialog} />

