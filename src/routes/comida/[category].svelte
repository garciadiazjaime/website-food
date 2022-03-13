<script>
	import Cover from '../../components/Cover.svelte'
	import Card from '../../components/Card.svelte'

	import { publish } from "../../support/events"

	export let places = []
	export let category = {}

	publish('update_menu', category.menu)

	const description = `La mejor comida se hace en Tijuana, descubre los mejores ${category.title} para comer Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.`
	const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	const currentMonthTitle = months[new Date().getMonth()]
	
</script>

<script context="module">
	const categoryMeta = {
		bares: {
			title: 'Bares en Tijuana',
			label: 'Bar',
			menu: 'bares',
			api: 'bar',
		},
		cafes: {
			title: 'Cafés en Tijuana',
			label: 'Café',
			menu: 'cafes',
			api: 'cafe',
		},
		restaurantes: {
			title: 'Restaurantes en Tijuana',
			label: 'Restaurante',
			menu: 'restaurantes',
			api: 'restaurant',
		},
		sushi: {
			title: 'Restaurantes de Sushi en Tijuana',
			label: 'Sushi',
			menu: 'sushi',
			api: 'sushi',
		},
		desayuno: {
			title: 'Desayunos en Tijuana',
			label: 'Desayuno',
			menu: 'desayuno',
			api: 'desayuno',
		},
		tacos: {
			title: 'Tacos en Tijuana',
			label: 'Tacos',
			menu: 'tacos',
			api: 'taco',
		},
	}

	export async function preload(page) {
		const { category: categoryParam } = page.params;
		const category = categoryMeta[categoryParam]
		
		const source = 'tijuanamakesmehungry';
		const limit = 33
		const url = `process.env.API_URL/posts/by-category?categories=${category.api}&source=${source}&limit=${limit}`
		const response = await this.fetch(url)
		const places = await response.json()

		return { 
			places,
			category,
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
</style>

<svelte:head>
	<title>Encuentra los mejores {category.title} | {currentMonthTitle} 2022</title>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>

<Cover title={category.title} />

<section>
	<ul>
		{#each places as place, index}
		<li>
			<Card 
				index={index + 1} 
				title={place.fullName}
				link={`https://www.instagram.com/${place.username}/`}
				subtitle={category.label}
				image={place.imageUrl.replace('http:', 'https:')}
				description={place.caption.slice(0, place.caption.indexOf('#'))}
			/>
		</li>
		{/each}
	</ul>
</section>
