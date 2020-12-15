<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import Card from 'mint-components/src/components/ProfileCard.svelte';
	import Drawer from 'mint-components/src/components/Drawer.svelte';
	import LocationDialog from '../components/LocationDialog.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import LocationCta from '../components/LocationCta.svelte';
	import Profile from '../components/Profile.svelte';
	import { userLocation } from '../utils/stores';
	import { getProfiles } from '../utils/mintAPIUtil';
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	let dialogRef;
	let profileRef;
	let currentProfile;
	let hasAPI;
	let profiles;
	let drawerIsVisible = false;
	const initialImagesToLoad = 2;
	const userRegex = /#(.+)/

	if (process.browser) {
		hasAPI = "IntersectionObserver" in window; 
	}

	function getUserName() {
		if (window.location.href.includes('#')) {
			return window.location.hash.replace('#', '')
		}

		return ''
	}

  onMount(async () => {
		await refreshProfiles();
	});

	async function refreshProfiles() {
		const username = getUserName()

		const coordinates = JSON.parse(window.localStorage.getItem('@location'))
		const lngLat = coordinates ? [coordinates.lng, coordinates.lat] : [zonaCentro.lng, zonaCentro.lat];

		profiles = await getProfiles({ lngLat, state: 'MAPPED', username });

		const profile = profiles.find(item => item.username === username)
		if (profile) {
			drawerIsVisible = true;
			currentProfile = profile;
		}
	}

	function openProfile (profile) {
		drawerIsVisible = true;
		currentProfile = profile;

		history.pushState(null, profile.username, `#${profile.username}`);
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
<StickyBanner on:click={dialogRef.openDialog}>
	<img src="feedmetj_logo.svg" alt="Feed me Tj"/>
	<h1>
		La comida más rica del mundo se hace en Tijuana<br>
		Encuéntrala aquí!
	</h1>
	<div on:click={dialogRef.openDialog}>
		<LocationCta location={$userLocation} />
	</div>
</StickyBanner>

<LocationDialog bind:this={dialogRef} on:coordinatesChange={refreshProfiles}  />

<div class="grid-container">
  {#if profiles}
    {#each profiles as profile, index}
			<Card
				profile={profile}
				cardAction={() => openProfile(profile)}
				buttonColor="#ff6745"
			/>
    {/each}
  {/if}
</div>

<Drawer bind:isVisible={drawerIsVisible} shaded>
  <Profile profile={currentProfile} />
</Drawer>

