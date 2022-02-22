<script>
	import Lazy from 'svelte-lazy';
	export let places = []
	export let category = ''
	const categoryTitle = {
		bar: 'Bares en Tijuana',
		cafe: 'Cafés en Tijuana',
		restaurant: 'Restaurantes en Tijuana',
		sushi: 'Restaurantes de Sushi en Tijuana',
	}

	const description = `La mejor comida se hace en Tijuana, descubre los mejores ${categoryTitle[category]} para comer Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.`
	const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	const currentMonthTitle = months[new Date().getMonth()]
	
</script>

<script context="module">
	export async function preload(page, session) {
		const { category } = page.params;
		const source = 'tijuanamakesmehungry';
		const limit = 33
		const url = `process.env.API_URL/posts/by-category?category=${category}&source=${source}&limit=${limit}`
		const response = await this.fetch(url)
		const places = await response.json()

		return { 
			places: places.map(place => ({
				...place,
				caption: place.caption.slice(0, place.caption.indexOf('#'))
			})),
			category 
		};
	}
</script>

<style>
	h1 {
		margin: 12px 0;
	}

	ul {
		padding: 0;
		margin: 0;
	}
	li {
    list-style-type: none;
  }

	img {
		height: 300px;
		width: 100%;
		object-fit: cover;
	}

	a {
		text-decoration: none;
	}
</style>

<svelte:head>
	<title>Encuentra los mejores {categoryTitle[category]} | {currentMonthTitle} 2022</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://www.feedmetj.com/banner.webp">
	<meta property="og:url" content="https://www.feedmetj.com/">
	<meta name="description" content={description}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">

	<link rel="apple-touch-icon" href="/logo-192.webp" />
</svelte:head>


<section>
	<h1>{categoryTitle[category]}</h1>

	<ul>
		{#each places as place, index}
		<li>
			<h2>
				{index + 1} -
				<a href={`https://www.instagram.com/${place.username}/`}
					rel="nofollow noreferrer"
					target="_blank">{place.fullName}</a>
			</h2>
			<Lazy height={300}>
				<img src={place.imageUrl.replace('http:', 'https:')} alt={place.fullName}>
			</Lazy>
			<p>{place.caption}</p>
		</li>
		{/each}
	</ul>
</section>
