<script>
	import Lazy from 'svelte-lazy';

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
		const limit = 4
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

	h2, p {
		padding: 0 12px;
		margin-bottom: 0;
	}

	strong {
		font-weight: normal;
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
	<title>{title}</title>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>

<div class="cover">
	<h1>Los Mejores Restaurantes de Tijuana</h1>
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
			<strong>{categoryLabel[place.category]}</strong>
			<Lazy height={300}>
				<img src={place.imageUrl.replace('http:', 'https:')} alt={place.fullName}>
			</Lazy>
			
			<p>{place.caption}</p>
		</li>
		{/each}
	</ul>
</section>
