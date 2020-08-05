<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import Card from '../components/Card.svelte';
	import LocationDialog from '../components/LocationDialog.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import LocationCta from '../components/LocationCta.svelte';
	import Profile from '../components/Profile.svelte';
	import { userLocation } from '../utils/stores';
	import { getPosts } from '../utils/mintAPIUtil';
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	let posts;
	let locationDialog;
	let profileDialog;
	let hasAPI
	const initialImagesToLoad = 2;
	const profileContent = {
		title: 'Billares Don Luis',
		address: 'Calle lava #69',
		phone: '(664)422-2222',
		whatsapp: true,
		keywords: ['tacos', 'desayunos', 'café'],
		posts: [
			{
				img: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/115824287_684950312057641_8933160063914805807_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=3HgxQwdLkjUAX-PDlMG&oh=3fd01126ba051779e6c4c4a694dd3088&oe=5F41E597',
				txt: 'Hora de la comida',
			},
			{
				img: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/115824287_684950312057641_8933160063914805807_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=3HgxQwdLkjUAX-PDlMG&oh=3fd01126ba051779e6c4c4a694dd3088&oe=5F41E597',
				txt: 'Hora de la comida',
			},
			{
				img: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/115824287_684950312057641_8933160063914805807_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=3HgxQwdLkjUAX-PDlMG&oh=3fd01126ba051779e6c4c4a694dd3088&oe=5F41E597',
				txt: 'Hora de la comida',
			},
		]
	}

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
	<meta property="og:title" content="Feed Me Tj">
	<meta property="og:description" content="La comida más rica del mundo se hace en Tijuana, encuéntrala aquí">
	<meta property="og:image" content="http://www.feedmetj.com/error_img.svg">
	<meta property="og:url" content="http://www.feedmetj.com/">
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
	<button on:click={profileDialog.openDialog}>Open Profile</button>
</StickyBanner>
<div class="grid-container">
  {#if posts}
    {#each posts as post, index}
			<Card post={post} lazy={hasAPI && index > initialImagesToLoad} />
    {/each}
  {/if}
</div>
<LocationDialog on:coordinatesChange={refreshPosts} bind:this={locationDialog} />
<Profile bind:this={profileDialog} data={profileContent}/>

