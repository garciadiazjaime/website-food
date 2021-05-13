<script>
	import Card from '../components/Card.svelte'

	import StickyBanner from '../components/StickyBanner.svelte'

	export let posts = []
	export let seoCategories = []

	const topPlaces = posts.reduce((accu, item) => {
		item.posts.slice(0, 1).forEach(place => {
			accu.push(place.title)
		})
		return accu
	}, [])

	let FAQPage = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [{
			"@type": "Question",
			"name": "Los mejores Restaurantes de Tijuana",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${topPlaces.map(item => `<li>${item}</li>`).join('')}</ul>`
			}
		}, {
			"@type": "Question",
			"name": "¿Que comer en Tijuana?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": `<ul>${seoCategories.map(item => `<li><a href="/${item.slug}">${item.title}</a></li>`).join('')}</ul>`
			}
		}]
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
		margin: 24px 0;
	}

	h1 {
		margin-bottom: 20px;
		color: #2A2F33;
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
		color: #2A2F33;
		font-size: 20px;
		padding: 15px 15px 0;
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
	<title>Que comer en Tijuana? Encuentra la mejor comida de Tijuana</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={`La mejor comida se hace en Tijuana, encuentra que comer en los mejores Restaurantes. Te recomendamos: Sushi, Mariscos, Tacos, Pizza, Cafes y mas.`}>
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content={`La mejor comida se hace en Tijuana, encuentra que comer en los mejores Restaurantes. Te recomendamos: Sushi, Mariscos, Tacos, Pizza, Cafes y mas.`}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>

<div class="container">
	<h1>
		¿Que comer en Tijuana?
	</h1>
	<p>En Feedmetj te recomendamos las mejores opciones de comida en Tijuana con base en lo que se publica en Instagram.</p>
</div>

<div class="container">
	<ul class="top-options">
		{#each seoCategories as option}
		<li><a href={`/${option.slug}`} title={option.fullTitle}>{option.title}</a></li>
		{/each}
	</ul>
</div>

<br />

<div class="container">
	{#each posts as { fullTitle, slug, posts } }
		<h2>{fullTitle}</h2>
		<div class="grid-container">
		
			{#each posts as post}
				<Card
					id={post.id}
					username={post.username}
					title={post.title}
					category={slug}
				/>
			{/each}

		</div>
		<br />
	{/each}
</div>

<div class="container">
	<strong>¿Que comer en Tijuana?</strong>
	<p>
		Tijuana es una ciudad en crecimiento, actualmente cuenta con varias zonas que ofrecen una gran variedad de comida.
		Aquí dejamos 5 zonas en las que podrás encontrar buenos lugares para comer:
	</p>
	<ul>
		<li>
			<strong>Playas de Tijuana</strong>
			<p>
				Además de tener buenas opciones de comida cuenta con la playa, la cual siempre es buena para una caminata, especialmente durante el atardecer.
				Si buscas un ambiente relajado y buenos precios, esta es la zona.
			</p>
		</li>
		<li>
			<strong>Centro</strong>
			<p>
				El centro es un punto de folklore, donde además de opciones de comida se puede disfrutar de una caminata por la emblemática calle Revolución.
				Es una zona de contrastes que bien define una de las caras de Tijuana. Si estas en busca de algo alternativo esta es la zona.
			</p>
		</li>
		<li>
			<strong>Rio</strong>
			<p>
				Zona rio se caracteriza por su urbanismo donde se encuentran restaurantes de renombre, adicionalmente hay varios centros comerciales y zonas de entretenimiento para continuar la vuelta.
				Si estas en busca de una opción más moderna esta es la zona.
			</p>
		</li>
		<li>
			<strong>Insurgentes</strong>
			<p>
				Esta zona ha crecido mucho en los últimos años y de igual forma lo ha hecho su oferta gastronómica. Podría parecer lejos para algunas personas, sin embargo vale la pena, pues las opciones de comida son buenas y por lo regular a buen precio.
			</p>
		</li>
		<li>
			<strong>El Valle de Guadalupe</strong>
			<p>
				El valle se encuentra en Ensenada, apróximadamente a una hora de distancia, por tanto se puede considerar como una alternativa. 
				El valle es una zona entre montañas que cuenta con su propio clima. La oferta gastronómica es más sofisticada y en general los precios son altos, sin embargo la experiencia lo vale.
			</p>
		</li>
	</ul>
</div>

<div class="container">
	<small>Que comer en Tijuana | La mejor comida se hace en Tijuana, encuentra que comer en Tijuana en los mejores Restaurantes.
	<br /> Te recomendamos: Sushi, Mariscos, Tacos, Pizza, Cafes y mas.</small>
</div>

<div class="container">
	Síguenos en
	<ul>
		<li><a href="https://www.instagram.com/feedmetj/" target="_blank" rel="nofollow noreferrer" title="¿Que comer en Tijuana">Instagram</a></li>
		<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer" title="La mejor comida de Tijuana">Facebook</a></li>
	</ul>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(FAQPage)}</script>`}
