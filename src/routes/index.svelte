<script>
	import Cover from '../components/Cover.svelte'
	import Card from '../components/Card.svelte'

	export let places
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
		const limit = 5
		const categories = 'restaurant,cafe,bar'
		const url = `process.env.API_URL/posts/by-category?categories=${categories}&source=${source}&limit=${limit}`
		const response = await this.fetch(url)
		const places = await response.json()

		return {
			places
		}
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
	<title>{title}</title>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>

<Cover title="Los Mejores Restaurantes de Tijuana" />

<section>
	<ul>
		{#each places as place, index}
		<li>
			<Card 
				index={index + 1} 
				title={place.fullName}
				link={`https://www.instagram.com/${place.username}/`}
				subtitle={categoryLabel[place.category]}
				image={place.imageUrl.replace('http:', 'https:')}
				description={place.caption.slice(0, place.caption.indexOf('#'))}
			/>
		</li>
		{/each}
	</ul>
</section>
