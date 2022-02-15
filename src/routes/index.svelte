<script>
	import Lazy from 'svelte-lazy';
	import DondeComerTijuana from '../components/blog/donde-comer-tijuana/intro.svelte'
	import TacosTijuana from "../components/blog/tijuana-tacos/intro.svelte"
	import TresLugaresBrunch from "../components/blog/3-lugares-brunch/intro.svelte"
	import TresLugaresSushi from "../components/blog/3-lugares-sushi/intro.svelte"
	import PanFrances from "../components/blog/pan-frances/intro.svelte"

	export let placesByCategory
	const description = 'La mejor comida se hace en Tijuana, descubre los mejores lugares para comer Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.'
	const categoryMap = {
		bar: 'Bares en Tijuana',
		cafe: 'Cafés en Tijuana',
		restaurant: 'Dónde comer en Tijuana?'
	}
</script>

<script context="module">
	export async function preload(page, session) {
		const url = 'process.env.API_URL/posts/by-category'
		const response = await this.fetch(url)
		const placesByCategory = await response.json()

		return { placesByCategory };
	}
</script>

<style>
	.container {
		padding: 0 12px;
	}

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

	.content {
		max-width: 960px;
		margin: 0 auto;
		padding-top: 20px;
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


<div class="content">
	<h1>La mejor comida se hace en Tijuana</h1>

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
					<a href={`https://www.instagram.com/${place.user.username}/`}
						rel="nofollow noreferrer"
						target="_blank">{place.user.fullName}</a>
				</h2>
				<Lazy height={300}>
					<img src={place.imageUrl.replace('http:', 'https:')} alt={place.user.fullName}>
				</Lazy>
				<p>{place.caption}</p>
			</li>
			{/each}
		</ul>
	</section>
	{/each}

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
		Conoce más lugares de <a href="/sushi">Sushi en Tijuana</a>
	</p>

	<p>
		Tijuana es una ciudad en crecimiento, actualmente cuenta con varias zonas que ofrecen una gran variedad de comida.
	</p>

	<footer>
		<p>
			La mejor <strong>comida</strong> se hace en <strong>Tijuana</strong>, descubre los mejores lugares para <strong>comer</strong> Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.
		</p>
		<br />
		<div class="container">
			Síguenos en
			<ul>
				<li><a href="https://www.instagram.com/feedmetijuana/" target="_blank" title="¿Qué comer en Tijuana">Instagram</a></li>
				<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer" title="La mejor comida de Tijuana">Facebook</a></li>
			</ul>
		</div>
		<br />
		<div class="container">
			Proyecto en Colaboración con: <br />
			<a href="https://www.garitacenter.com/">Reporte de Garitas | Linea Tijuana / San Ysidro - Otay</a>
			<br />
			<a href="https://www.playami.com/">¿Qué comer en Playas de Tijuana?</a>
			<br />
			<a href="https://www.noticiasmexico.org/">Últimas Noticias de México</a>
			<br />
			<a href="https://www.comprarcasatijuana.com/">Comprar casa en Tijuana</a>
			<br />>
			<a href="https://www.larutadelvinoensenada.com/">La Ruta del Vino Ensenada</a>
			<br />
			<a href="https://www.mintitmedia.com/">Desarrollo Web en Tijuana</a>
		</div>
	</footer>
</div>
