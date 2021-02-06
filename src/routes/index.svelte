<script>
	import Card from '../components/Card.svelte'

	import StickyBanner from '../components/StickyBanner.svelte'

	export let profiles = []
	export let topOptions = []
	export let seoCategories = []

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
				"text": `<ul>${seoCategories.map(item => `<li><a href="/${item.slug}">${item.title}</a></li>`).join('')}</ul>`
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

	function getCategoryTitle(slug) {
		return seoCategories.find(item => item.slug === slug).fullTitle
	}
</script>

<script context="module">
	export async function preload() {
		let response = await this.fetch('./data/homepage.json')
		const profiles = await response.json()

		response = await this.fetch('./seoCategories.json')
		const seoCategories = await response.json()

		const allProfiles = profiles.reduce((accu, item) => {
			accu.push(...item.data)

			return accu
		}, [])

		const topOptionsMap = allProfiles.reduce((accu, item) => {
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
			seoCategories,
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

	ul.top-options a {
		display: inline-block;
		height: 48px;
	}
</style>

<svelte:head>
	<title>La mejor comida en Tijuana. Que comer {getDate()}</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={`La mejor comida se haze en Tijuana. Que comer: ${seoCategories.slice(0, 5).map(item => `${item.title}`).join(' ')}. Disfruta la gastronomia local.`}>
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content={`La mejor comida se haze en Tijuana. Que comer: ${seoCategories.slice(0, 5).map(item => `${item.title}`).join(' ')}. Disfruta la gastronomia local.`}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
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
		{#each seoCategories as option}
		<li><a href={`/${option.slug}`} title={option.fullTitle}>{option.title}</a></li>
		{/each}
	</ul>
</div>

<div class="container">
	{#each profiles as profileByCategory}
		<h2>{getCategoryTitle(profileByCategory.category)}</h2>
		<div class="grid-container">
		
			{#each profileByCategory.data as profile}
				<Card
					id={profile.id}
					username={profile.username}
					title={profile.title}
					mediaUrl={profile.mediaUrl}
					address={profile.address}
					gps={profile.gps}
					keywords={profile.keywords}
					phone={profile.phone}
					category={profileByCategory.category}
				/>
			{/each}

		</div>
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
		<li><a href="https://www.instagram.com/kasama_ramen/" target="_blank" rel="nofollow noreferrer">Kasama Ramen</a></li>
	</ul>
</div>

<div class="container">
	<strong>Que comer en Tijuana</strong>. Descubre la mejor comida y disfruta la gastronomia local.
</div>

<div class="container">
	Síguenos en
	<ul>
		<li><a href="https://www.instagram.com/feedmetj/" target="_blank" rel="nofollow noreferrer" title="que comer en tijuana">Instagram</a></li>
		<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer" title="la mejor comida de tijuana">Facebook</a></li>
	</ul>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(FAQPage)}</script>`}
