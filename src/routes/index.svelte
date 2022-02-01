<script>
	import TacosTijuana from "../components/blog/tijuana-tacos/intro.svelte"
	import TresLugaresBrunch from "../components/blog/3-lugares-brunch/intro.svelte"
	import TresLugaresSushi from "../components/blog/3-lugares-sushi/intro.svelte"
	import PanFrances from "../components/blog/pan-frances/intro.svelte"

	const description = 'La mejor comida se hace en Tijuana, descubre los mejores lugares para comer Ramen, Sushi, Pizza, Poke, Tacos, Mariscos y más.'
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
</style>

<svelte:head>
	<title>Qué comer en Tijuana? Encuentra la mejor comida de Tijuana</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={description}>
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content={description}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>


<div class="content">
	<h1>La mejor comida se hace en Tijuana</h1>

	<ul>
		<li><TresLugaresSushi /></li>

		<li><hr /></li>

		<li><TacosTijuana /></li>

		<li><hr /></li>

		<li><TresLugaresBrunch /></li>

		<li><hr /></li>

		<li><PanFrances /></li>
	</ul>

	<br />

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
			<a href="http://www.playami.com">Qué comer en Playas de Tijuana?</a>
			<br />
			<a href="https://www.mintitmedia.com/">Desarrollo Web en Tijuana</a>
		</div>
	</footer>
</div>
