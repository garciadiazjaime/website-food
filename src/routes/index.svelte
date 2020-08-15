<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import Card from '../components/Card.svelte';
	import LocationDialog from '../components/LocationDialog.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import LocationCta from '../components/LocationCta.svelte';
	import Profile from '../components/Profile.svelte';
	import { userLocation } from '../utils/stores';
	import { getProfiles } from '../utils/mintAPIUtil';
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	let locationDialog;
	let profileRef;
	let currentProfile;
	let hasAPI;
	let profiles;
	const initialImagesToLoad = 2;
	const userRegex = /#(.+)/

	if (process.browser) {
		hasAPI = "IntersectionObserver" in window; 
	}

  onMount(async () => {
		await refreshProfiles();

	
		if (window.location.href.includes('#')) {
			const [, username] = userRegex.exec(window.location.href)

			const profile = profiles.find(item => item.username === username)
			if (profile) {
				profileRef.openProfile(profile)
			}
		}
	});

	async function refreshProfiles() {
		const coordinates = JSON.parse(window.localStorage.getItem('@location'))
		const lngLat = coordinates ? [coordinates.lng, coordinates.lat] : [zonaCentro.lng, zonaCentro.lat];

		profiles = await getProfiles({ lngLat, state: 'MAPPED' });
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

	h1 {
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
  <title>Feed Me TJ | ¿Qué comer en Tijuana?</title>
	<meta property="og:title" content="Feed Me Tj">
	<meta property="og:description" content="En FeedMeTj.com es muy fácil y gratis publicar y encontrar ofertas gastronómicas cerca de tu ubicación.">
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
</svelte:head>
<StickyBanner on:click={locationDialog.openDialog}>
	<img src="feedmetj_logo.svg" alt="Feed me Tj"/>
	<h1>
		La comida más rica del mundo se hace en Tijuana<br>
		Encuéntrala aquí!
	</h1>
	<div on:click={locationDialog.openDialog}>
		<LocationCta location={$userLocation} />
	</div>
</StickyBanner>
<div class="grid-container">
  {#if profiles}
    {#each profiles as profile, index}
			<Card profile={profile} lazy={hasAPI && index > initialImagesToLoad} openProfile={profileRef.openProfile} />
    {/each}
  {/if}
</div>
<LocationDialog on:coordinatesChange={refreshProfiles} bind:this={locationDialog} />
<Profile bind:this={profileRef} />

