<script>
	import Card from '../components/Card.svelte'

	import StickyBanner from '../components/StickyBanner.svelte'

	export let posts = []
	export let seoCategories = []

	const topPlaces = posts.reduce((accu, item) => {
		item.posts.slice(0, 2).forEach(place => {
			accu.push(place.title)
		})
		return accu
	}, [])

	let FAQPage = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [{
			"@type": "Question",
			"name": "Los mejores restaurantes de Tijuana",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${topPlaces.map(item => `<li>${item}</li>`).join('')}</ul>`
			}
		}, {
			"@type": "Question",
			"name": "¿Qué comer en Tijuana?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${seoCategories.map(item => `<li><a href="/${item.slug}">${item.title}</a></li>`).join('')}</ul>`
			}
		}]
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
	export async function preload() {
		let response = await this.fetch('./data/homepage.json')
		const posts = await response.json()

		response = await this.fetch('./seoCategories.json')
		const seoCategories = await response.json()

		return {
			posts,
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
	<title>¿Qué comer en Tijuana? Los mejores Restaurantes {getDate()}</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={`La mejor comida se hace en Tijuana. ¿Qué comer? ${seoCategories.slice(0, 5).map(item => `${item.title}`).join(' ')}. Disfruta de la gastronomia local en los mejores Restaurantes.`}>
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content={`La mejor comida se hace en Tijuana. ¿Qué comer? ${seoCategories.slice(0, 5).map(item => `${item.title}`).join(' ')}. Disfruta de la gastronomia local en los mejores Restaurantes.`}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>

<StickyBanner>
	<h1>
		¿Qué comer en Tijuana?
	</h1>
	<p>En Feedmetj te recomendamos las mejores opciones de comida en Tijuana con base en lo que se publica en Instagram.</p>
</StickyBanner>

<div class="container">
	<h2>¿Qué hay de comer en Tijuana?</h2>
	<ul class="top-options">
		{#each seoCategories as option}
		<li><a href={`/${option.slug}`} title={option.fullTitle}>{option.title}</a></li>
		{/each}
	</ul>
</div>

<div class="container">
	{#each posts as { fullTitle, slug, posts } }
		<h2>{fullTitle}</h2>
		<div class="grid-container">
		
			{#each posts as post}
				<Card
					id={post.id}
					username={post.username}
					title={post.title}
					mediaUrl={post.mediaUrl}
					address={post.address}
					gps={post.gps}
					phone={post.phone}
					category={slug}
					description={post.description}
					date={post.date}
					delivery={post.delivery}
					topics={post.topics}
				/>
			{/each}

		</div>
	{/each}
</div>

<div class="container">
	<strong>¿Qué comer en Tijuana?</strong>. Disfruta de la gastronomia local en los mejores Restaurantes.
</div>

<div class="container">
	Síguenos en
	<ul>
		<li><a href="https://www.instagram.com/feedmetj/" target="_blank" rel="nofollow noreferrer" title="¿Qué comer en Tijuana">Instagram</a></li>
		<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer" title="la mejor comida de Tijuana">Facebook</a></li>
	</ul>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(FAQPage)}</script>`}
