<script>
	import Card from 'mint-components/src/components/ProfileCard.svelte';
	import Drawer from 'mint-components/src/components/Drawer.svelte';
	import StickyBanner from '../components/StickyBanner.svelte';
	import Profile from '../components/Profile.svelte';

	export let profiles = []
	export let topOptions = []
	export let optionsForSEO = []

	let currentProfile;
	let drawerIsVisible = false;
	
	let FAQPage = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [{
			"@type": "Question",
			"name": "Donde comer en Tijuana",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${profiles.slice(0, 10).map(item => `<li>${item.title}</li>`).join('')}</ul>`
			}
		}, {
			"@type": "Question",
			"name": "Que hay de comer en Tijuana",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${topOptions.map(item => `<li>${item}</li>`).join('')}</ul>`
			}
		}, {
			"@type": "Question",
			"name": "Que comer en Tijuana",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${optionsForSEO.map(item => `<li><a href="/${item.slug}">${item.title}</a></li>`).join('')}</ul>`
			}
		}]
	}

	function openProfile (profile) {
		drawerIsVisible = true;
		currentProfile = profile;
	}

	function getDate() {
		const date = new Date()
		const month = date.getMonth();
		const year = date.getFullYear()
		const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

		return `${months[month]} ${year}`
	}
</script>

<script context="module">
	import { zonaCentro } from '../utils/mapboxAPIUtil';
	import { optionsForSEO } from '../utils/meta'

	const lngLat = [zonaCentro.lng, zonaCentro.lat];

	export async function preload() {
		const filters = encodeURIComponent(JSON.stringify({ lngLat, first: 100, state: 'MAPPED' }))

		const response = await this.fetch(`process.env.API_URL/feedme?filters=${filters}`)

		const profiles = await response.json()

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
			.slice(0, 12)
			.map(item => item[0])
		

		return {
			profiles,
			topOptions,
			optionsForSEO,
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
	<title>#feedmetj | Que comer en Tijuana? - {getDate()}</title>
	<meta property="og:title" content="Feedmetj">
	<meta property="og:description" content="La comida de Tijuana es exquisita, en #feedmetj te respondemos que comer con base en lo publicado en Instagram.">
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content="La comida de Tijuana es exquisita, en #feedmetj te respondemos que comer con base en lo publicado en Instagram.">
</svelte:head>

<StickyBanner>
	<h1>
		Que comer en Tijuana?
	</h1>
	<p>En Feedmetj te recomendamos las mejores opciones de comida en Tijuana con base en lo que se publica en Instagram.</p>
</StickyBanner>

<div class="container">
	<h2>Que hay de comer en Tijuana</h2>
	<ul class="top-options">
		{#each optionsForSEO as option}
		<li><a href={option.slug}>{option.title}</a></li>
		{/each}
	</ul>
</div>

<div class="container">
	<h2>Donde comer en Tijuana?</h2>
</div>

<div class="grid-container">
	{#each profiles as profile, index}
		<Card
			profile={profile}
			cardAction={() => openProfile(profile)}
			buttonColor="#ca4f24"
			showDistance={false}
			alt="Comida Tijuana -"
		/>
	{/each}
</div>

<div class="container">
	<h2>Que comida hay en Tijuana</h2>
	<ul class="top-options">
		{#each topOptions as option}
		<li>{option}</li>
		{/each}
	</ul>

	<strong>Restaurantes y Comida Favorita {getDate()}</strong>
	<ul>
		<li><a href="https://www.instagram.com/takunoya_ramen/" target="_blank" rel="nofollow noreferrer">Takunoya Ramen</li>
		<li><a href="https://www.instagram.com/ohanatjpoke/" target="_blank" rel="nofollow noreferrer">Ohana Poke</a></li>
		<li><a href="https://www.instagram.com/lelieureposteria/" target="_blank" rel="nofollow noreferrer">Le Lieu Reposteria</a></li>
		<li><a href="https://www.instagram.com/kasama_ramen/" target="_blank" rel="nofollow noreferrer">Kasama Ramen</a></li>
	</ul>
</div>

<div class="container">
	La <strong>comida de Tijuana</strong> es exquisita, en #feedmetj te respondemos <strong>que comer</strong> con base en lo publicado en Instagram.
</div>

<div class="container">
	Síguenos en
	<ul>
		<li><a href="https://www.instagram.com/feedmetj/" target="_blank" rel="nofollow noreferrer">Instagram</a></li>
		<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer">Facebook</a></li>
	</ul>
</div>

<Drawer bind:isVisible={drawerIsVisible} shaded>
	<Profile profile={currentProfile} />
</Drawer>

{@html `<script type="application/ld+json">${JSON.stringify(FAQPage)}</script>`}
