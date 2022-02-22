<script>
	import Lazy from 'svelte-lazy';
	import DondeComerTijuana from '../components/blog/donde-comer-tijuana/intro.svelte'
	import TacosTijuana from "../components/blog/tijuana-tacos/intro.svelte"
	import TresLugaresBrunch from "../components/blog/3-lugares-brunch/intro.svelte"
	import TresLugaresSushi from "../components/blog/3-lugares-sushi/intro.svelte"
	import PanFrances from "../components/blog/pan-frances/intro.svelte"

	export let placesByCategory
	const description = 'La mejor comida se hace en Tijuana, descubre los mejores restaurantes para comer Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.'
	const categoryMap = {
		bar: 'Bares en Tijuana',
		cafe: 'Cafés en Tijuana',
		restaurant: 'Restaurantes en Tijuana'
	}
	const categoryLabel = {
		bar: 'Bar',
		cafe: 'Café',
		restaurant: 'Restaurante'
	}
</script>

<script context="module">
	export async function preload(page, session) {
		const source = 'tijuanamakesmehungry';
		const limit = 3
		const url = `process.env.API_URL/posts/by-category?&source=${source}&limit=${limit}`
		const response = await this.fetch(url)
		const data = await response.json()

		return { 
			placesByCategory: data.map(placesByCategory => ({
				...placesByCategory,
				places: placesByCategory.places.map(place => ({
					...place,
					caption: place.caption.slice(0, place.caption.indexOf('#'))
				}))	
			})),
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
	<title>Qué comer en Tijuana? Encuentra la mejor comida de Tijuana</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://www.feedmetj.com/banner.webp">
	<meta property="og:url" content="https://www.feedmetj.com/">
	<meta name="description" content={description}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">

	<link rel="apple-touch-icon" href="/logo-192.webp" />
</svelte:head>


<section>
	<h1>Los Mejores Restaurantes de Tijuana</h1>

	{#each placesByCategory as category}
	<section>
		<h3>
			<a href={`comida/${category.name}`}>{categoryMap[category.name]}</a>
		</h3>
		<ul>
			{#each category.places as place, index}
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
				<strong>{categoryLabel[category.name]}</strong>
				<p>{place.caption}</p>
			</li>
			{/each}
		</ul>
	</section>
	{/each}

	<hr />

	<ul>
		<li><DondeComerTijuana /></li>
		
		<li><hr /></li>

		<li><TresLugaresSushi /></li>

		<li><hr /></li>

		<li><TacosTijuana /></li>

		<li><hr /></li>

		<li><TresLugaresBrunch /></li>

		<li><hr /></li>

		<li><PanFrances /></li>
	</ul>

	<br />

	<p>
		Conoce más lugares de <a href="/comida/sushi">Sushi en Tijuana</a>
	</p>
</section>
