<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main, footer {
		position: relative;
		max-width: 56em;
		background-color: white;
		margin: 0 auto;
		box-sizing: border-box;
		font-size: 1.2em;
	}
	ul {
		padding: 0;
		list-style-type: none;
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

	<div>
		Síguenos en
		<ul>
			<li><a href="https://www.instagram.com/feedmetijuana/" target="_blank" title="Restaurantes en Tijuana">Instagram</a></li>
			<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" title="Restaurantes en Tijuana">Facebook</a></li>
		</ul>
	</div>

	<br />

	<div>
		<p>
			Proyecto en Colaboración con: 
		</p>
		<div>
			<ul>
				<li><a href="https://www.garitacenter.com/">Reporte de Garitas Tijuana</a></li>
				<li><a href="https://www.playami.com/">Restaurantes en Playas de Tijuana</a></li>
				<li><a href="https://www.larutadelvinoensenada.com/">La Ruta del Vino Ensenada</a></li>
				<li><a href="https://www.noticiasmexico.org/">Últimas Noticias de México</a></li>
				<li><a href="https://www.comprarcasatijuana.com/">Comprar Casa en Tijuana</a></li>
				<li><a href="https://www.mintitmedia.com/">Desarrollo Web en Tijuana</a></li>
			</ul>
		</div>
	</div>
</footer>
