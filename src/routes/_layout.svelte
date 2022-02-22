<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main, footer {
		position: relative;
		background-color: #fff;
		margin: 0 auto;
		box-sizing: border-box;
		height: auto;
		font-size: 2em;
		font-family: Trebuchet MS, sans-serif;

		max-width: 960px;
		padding-top: 20px;
	}
</style>

<Nav {segment} />
<main>
	<slot></slot>
</main>


<footer>
	<p>
		Tijuana es una ciudad en crecimiento, actualmente cuenta con varias zonas que ofrecen una gran variedad de comida.
	</p>
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
		<br />
		<a href="https://www.larutadelvinoensenada.com/">La Ruta del Vino Ensenada</a>
		<br />
		<a href="https://www.mintitmedia.com/">Desarrollo Web en Tijuana</a>
	</div>
</footer>
