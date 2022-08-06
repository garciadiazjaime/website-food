<script>
	import DondeComerTijuana from '../components/blog/donde-comer-tijuana/intro.svelte'
	import TacosTijuana from "../components/blog/tijuana-tacos/intro.svelte"
	import TresLugaresBrunch from "../components/blog/3-lugares-brunch/intro.svelte"
	import TresLugaresSushi from "../components/blog/3-lugares-sushi/intro.svelte"
	import PanFrances from "../components/blog/pan-frances/intro.svelte"

	const title = 'Recomendaciones de comida en Tijuana.'
	const description = 'Descubre los mejores Restaurantes de Tijuana.'
</script>

<style>
	ul {
		padding: 0;
		list-style-type: none;
	}

	li {
		margin: 40px 0;
	}

	.cover {
		padding: 220px 0;
		background-color: #45cbb2;
		color: white;
		text-align: center;	
	}
</style>

<svelte:head>
	<title>{title}</title>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>

<div class="cover">
	<h1>Recomendaciones de comida en Tijuana</h1>
</div>

<section>
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
