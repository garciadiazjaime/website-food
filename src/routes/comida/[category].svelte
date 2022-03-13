<script>
	import Lazy from 'svelte-lazy';

	import { publish } from "../../support/events"

	export let places = []
	export let category = ''

	publish('update_menu', category)

	const categoryTitle = {
		bares: 'Bares en Tijuana',
		cafes: 'Cafés en Tijuana',
		restaurantes: 'Restaurantes en Tijuana',
		sushi: 'Restaurantes de Sushi en Tijuana',
		desayuno: 'Desayunos en Tijuana',
		tacos: 'Tacos en Tijuana',
	}
	const categoryLabel = {
		bares: 'Bar',
		cafes: 'Café',
		restaurantes: 'Restaurante',
		sushi: 'Sushi',
		desayuno: 'Desayuno',
		tacos: 'Tacos',
	}

	const description = `La mejor comida se hace en Tijuana, descubre los mejores ${categoryTitle[category]} para comer Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.`
	const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	const currentMonthTitle = months[new Date().getMonth()]
	
</script>

<script context="module">
	export async function preload(page) {
		const { category } = page.params;
		const categoryAdjusted = {
			bares: 'bar',
			cafes: 'cafe',
			restaurantes: 'restaurant',
			sushi: 'sushi',
			desayuno: 'desayuno',
			tacos: 'taco',
		}
		
		const source = 'tijuanamakesmehungry';
		const limit = 33
		const url = `process.env.API_URL/posts/by-category?categories=${categoryAdjusted[category]}&source=${source}&limit=${limit}`
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

	small {
		height: 24px;
		width: 24px;
		background-color: #45cbb2;
		color: white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		font-weight: bold;
		margin-left: 12px;
	}
</style>

<svelte:head>
	<title>Encuentra los mejores {categoryTitle[category]} | {currentMonthTitle} 2022</title>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>


<div class="cover">
	<h1>{categoryTitle[category]}</h1>
</div>

<section>

	<ul>
		{#each places as place, index}
		<li>
			<small>{index + 1}</small>
			<h2>
				<a href={`https://www.instagram.com/${place.username}/`}
					rel="nofollow noreferrer"
					target="_blank">{place.fullName}</a>
			</h2>
			<h3>{categoryLabel[category]}</h3>
			<Lazy height={300}>
				<img src={place.imageUrl.replace('http:', 'https:')} alt={place.fullName}>
			</Lazy>
			<p>{place.caption}</p>
		</li>
		{/each}
	</ul>
</section>
