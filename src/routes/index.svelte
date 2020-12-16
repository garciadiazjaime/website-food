<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import Card from 'mint-components/src/components/ProfileCard.svelte';
	import Drawer from 'mint-components/src/components/Drawer.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import Profile from '../components/Profile.svelte';
	import { userLocation } from '../utils/stores';
	import { getProfiles } from '../utils/mintAPIUtil';
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	let currentProfile;
	let profiles = [];
	let drawerIsVisible = false;

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
		const lngLat = [zonaCentro.lng, zonaCentro.lat];

		profiles = await getProfiles({ lngLat, state: 'MAPPED' });
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
		grid-template-columns: repeat( auto-fit, minmax(100%, 1fr) );
		margin: 10px;
		padding: 15px;
		min-height: 1000px;
	}

	h1 {
		margin-bottom: 20px;
		color: #313d69;
	}

	h2 {
		margin: 0;
	}

	@media (min-width: 600px) {
		.grid-container {
			grid-template-columns: repeat( auto-fit, minmax(48%, 1fr) );
		}
	}

	@media (min-width: 900px) {
		.grid-container {
			grid-template-columns: repeat( auto-fit, minmax(30%, 1fr) );
		}
	}

	@media (min-width: 1200px) {
		.grid-container {
			grid-template-columns: repeat( auto-fit, minmax(23%, 1fr) );
		}
	}

	.container {
		color: #313d69;
		font-size: 12px;
		padding: 15px 15px 0;
		margin: 0 10px;
	}
</style>

<svelte:head>
  <title>#feedmetj | ¿Qué comer en Tijuana?</title>
	<meta property="og:title" content="FeedMeTj">
	<meta property="og:description" content="Tijuana cuenta con una oferta gastronómica muy grande, en #feedmetj mostramos opciones recientes de comida publicadas por la comunida de Instagram.">
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content="Tijuana cuenta con una oferta gastronómica muy grande, en #feedmetj mostramos opciones recientes de comida publicadas por la comunida de Instagram.">
</svelte:head>

<StickyBanner>
	<h1>
		La comida más rica del mundo se hace en Tijuana<br>
		Encuéntrala aquí!
	</h1>
</StickyBanner>

<div class="container">
	<h2>48 opciones de comida en Tijuana:</h2>
</div>

<div class="grid-container">
  {#if profiles}
    {#each profiles as profile, index}
			<Card
				profile={profile}
				cardAction={() => openProfile(profile)}
				buttonColor="#ff6745"
				showDistance={false}
			/>
    {/each}
  {/if}
</div>

<div class="container">
	Tijuana cuenta con una oferta gastronómica muy grande, en #feedmetj mostramos opciones recientes de comida publicadas por la comunida de Instagram.
</div>

<Drawer bind:isVisible={drawerIsVisible} shaded>
  <Profile profile={currentProfile} />
</Drawer>
