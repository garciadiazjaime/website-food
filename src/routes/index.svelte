<script>
	import { onMount } from "svelte";
	import Card from 'mint-components/src/components/ProfileCard.svelte';
	import Drawer from 'mint-components/src/components/Drawer.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import Profile from '../components/Profile.svelte';

	export let profiles = []
	export let topPlacesHTML = ''
	export let topOptionsHTML = ''
	export let topOptions = []

	let currentProfile;
	let drawerIsVisible = false;
	
	let FAQPage = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [{
			"@type": "Question",
			"name": "¿Lugares para comer en Tijuana?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${topPlacesHTML}</ul>`
			}
		}, {
			"@type": "Question",
			"name": "¿Qué hay de comer en Tijuana?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${topOptionsHTML}</ul>`
			}
		}]
	}

	function openProfile (profile) {
		drawerIsVisible = true;
		currentProfile = profile;
	}

	function getTitle() {
		const date = new Date()
		const month = date.getMonth();
		const year = date.getFullYear()
		const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

		return `#feedmetj | ¿Qué comer en Tijuana? - ${months[month]} ${year}`
	}
</script>

<script context="module">
	import { zonaCentro } from '../utils/mapboxAPIUtil';

	const lngLat = [zonaCentro.lng, zonaCentro.lat];

	export async function preload() {
		const filters = encodeURIComponent(JSON.stringify({ lngLat, first: 100, state: 'MAPPED' }))

		const response = await this.fetch(`process.env.API_URL/feedme?filters=${filters}`)

		const profiles = await response.json()

		const topPlacesHTML = profiles.slice(0, 10).map(item => `<li>${item.title}</li>`).join('')
		const topOptionsMap = profiles.reduce((accu, item) => {
			item.keywords.forEach(keyword => {
				if (!accu[keyword]) {
					accu[keyword] = 0
				}
				accu[keyword] += 1
			})
			return accu
		}, {})
		const topOptions = Object.keys(topOptionsMap)
			.map(key => [key, topOptionsMap[key]])
			.sort((a, b) => a[1] - b[1])
			.slice(0, 10)
			.map(item => item[0])
		
		const topOptionsHTML = topOptions.map(item => `<li>${item}</li>`).join('')

		return {
			profiles,
			topPlacesHTML,
			topOptions,
			topOptionsHTML,
		}
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
		font-size: 20px;
		padding: 15px 15px 0;
		margin: 0 10px;
	}


	ul.top-options {
		list-style: none;
		padding: 0;
	}

	ul.top-options li {
		display: inline-block;
		margin-right: 6px;
		text-transform: capitalize;
	}

	ul.top-options li::after {
		content: '|';
		display: inline;
		margin-left: 6px;
	}

	ul.top-options li:last-of-type::after {
		content: ''
	}
</style>

<svelte:head>
	{@html `<title>${getTitle()}</title>`}
	<meta property="og:title" content="FeedMeTj">
	<meta property="og:description" content="Tijuana cuenta con una oferta grande de comida, en #feedmetj mostramos opciones recientes de comida publicadas por la comunida de Instagram.">
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content="Tijuana cuenta con una oferta grande de comida, en #feedmetj mostramos opciones recientes de comida publicadas por la comunida de Instagram.">

	{@html `<script type="application/ld+json">${JSON.stringify(FAQPage)}	</script>`}
</svelte:head>


<StickyBanner>
	<h1>
		¿Qué comer en Tijuana? <br />
	</h1>
	<p>En Feedmetj te recomendamos las mejores opciones de comida en Tijuana con base en lo que se publica en Instagram.</p>
</StickyBanner>

<div class="container">
	<h2>¿Qué se cocina en Tijuana?</h2>
	<ul class="top-options">
		{#each topOptions as option}
		<li>{option}</li>
		{/each}
	</ul>
	<h2>Opciones de comida en Tijuana:</h2>
</div>

<div class="grid-container">
	{#each profiles as profile, index}
		<Card
			profile={profile}
			cardAction={() => openProfile(profile)}
			buttonColor="#ca4f24"
			showDistance={false}
		/>
	{/each}
</div>

<div class="container">
	Tijuana cuenta con una oferta grande de comida, en #feedmetj mostramos opciones recientes de comida publicadas por la comunida de Instagram.
</div>

<Drawer bind:isVisible={drawerIsVisible} shaded>
	<Profile profile={currentProfile} />
</Drawer>
