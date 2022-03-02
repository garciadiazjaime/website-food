<script>
	import Lazy from 'svelte-lazy';
	import DondeComerTijuana from '../components/blog/donde-comer-tijuana/intro.svelte'
	import TacosTijuana from "../components/blog/tijuana-tacos/intro.svelte"
	import TresLugaresBrunch from "../components/blog/3-lugares-brunch/intro.svelte"
	import TresLugaresSushi from "../components/blog/3-lugares-sushi/intro.svelte"
	import PanFrances from "../components/blog/pan-frances/intro.svelte"

	export let placesByCategory
	const title = 'La mejor comida se cocina en Tijuana. Restaurantes, Cafés, Bares'
	const description = 'La mejor comida se hace en Tijuana, descubre los mejores restaurantes para comer Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.'
	const categoryLabel = {
		bar: 'Bar',
		cafe: 'Café',
		restaurant: 'Restaurante'
	}
</script>

<script context="module">
	export async function preload() {
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
	ul {
		padding: 0;
		list-style-type: none;
	}

	li {
		margin: 40px 0;
	}

	img {
		height: 454px;
		width: 100%;
		object-fit: cover;
	}

	.cover {
		padding: 220px 0;
		background-color: #45cbb2;
		color: white;
		text-align: center;	
	}

	h2, h3, p {
		padding: 0 12px;
	}

	a {
		text-decoration: none;
	}

	p {
		word-break: break-word;
	}
</style>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://www.feedmetj.com/banner.webp">
	<meta property="og:url" content="https://www.feedmetj.com/">
	<meta name="description" content={description}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">

	<link rel="apple-touch-icon" href="/logo-192.webp" />
</svelte:head>

<div class="cover">
	<h1>Los Mejores Restaurantes de Tijuana</h1>
</div>

<section>
	{#each placesByCategory as category}
	<ul>
		{#each category.places as place, index}
		<li>
			<h2>
				<a href={`https://www.instagram.com/${place.username}/`}
					rel="nofollow noreferrer"
					target="_blank">{place.fullName}</a>
			</h2>
			<h3>{categoryLabel[category.name]}</h3>
			<Lazy height={300}>
				<img src={place.imageUrl.replace('http:', 'https:')} alt={place.fullName}>
			</Lazy>
			
			<p>{place.caption}</p>
		</li>
		{/each}
	</ul>
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
</section>
