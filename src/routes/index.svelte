<script>
	import Card from '../components/Card.svelte'
</script>

<style>
.container {
		padding: 0 12px;
	}

	.item-list {
		margin: 0 12px;
	}

	@media (max-width: 800px) {
		.item-list {
			margin: 0;
		}
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
		width: 100%;
		height: auto;
	}
</style>

<svelte:head>
	<title>Qué comer en Tijuana? Encuentra la mejor comida de Tijuana</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={`La mejor comida se hace en Tijuana, descubre los mejores lugares para comer Ramen, Pizza, Poke, Tacos, Mariscos y más.`}>
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content={`La mejor comida se hace en Tijuana, descubre los mejores lugares para comer Ramen, Pizza, Poke, Tacos, Mariscos y más.`}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>

<div class="content">
	<div class="item-list">
		<ul>
			<li>
				<img src="/que-comer-en-tijuana/citron.mx/pan-frances.jpeg" 
					alt="pan-frances" 
					width="750"
					height="938"
				/>

				<h2>Delicioso Pan Francés en Tijuana</h2>
				<p>
					Citrón es un café que se encuentra en avenida Alba Roja.
				</p>
				<p>
					El lugar se distingue por su toque artístico, cada detalle importa, y esto se puede apreciar tanto en su atmósfera como en su cocina.
				</p>
				<p>
					Cuentan con estacionamiento y no es necesario reservación.
				</p>
				<p>
					<a href="https://www.instagram.com/citron.mx/" target="_blank" rel="nofollow noreferrer">@citron.mx</a>
				</p>
			</li>
		</ul>
	</div>

	<br />

	<div class="container">
		Síguenos en
		<ul>
			<li><a href="https://www.instagram.com/feedmetj/" target="_blank" title="¿Qué comer en Tijuana">@feedmetj</a></li>
			<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer" title="La mejor comida de Tijuana">Facebook</a></li>
		</ul>
	</div>
</div>
