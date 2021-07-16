<script>
	import Card from '../components/Card.svelte'
</script>

<style>
	h1 {
		margin-bottom: 20px;
		color: #2A2F33;
	}

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
		padding: 0 0 0 24px;
	}
	li {
    list-style-type: '- ';
  }
</style>

<svelte:head>
	<title>Encuentra la mejor comida de Tijuana</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={`La mejor comida se hace en Tijuana, descubre los mejores lugares para comer.`}>
	<meta property="og:image" content="http://www.feedmetj.com/sharing-banner.jpg">
	<meta property="og:url" content="http://www.feedmetj.com/">
	<meta name="description" content={`La mejor comida se hace en Tijuana, descubre los mejores lugares para comer.`}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>

<br />

<div class="container">
	<h1>
		La mejor comida se hace en Tijuana.
	</h1>
</div>

<br />


<div class="item-list">
	<Card
		username="takunoya_ramen"
		title="Takunoya Ramen"
		category="ramen"
		imgSrc="/images/ramen.jpeg"
	>
		<div>
			Takunoya cuenta con un menú excelente que permite degustar <strong>comida Japonesa</strong>. 
			<br />
			Por mencionar algunos de sus platillos:
			<ul>
				<li>Ramen Miso.</li>
				<li>Ramen frio.</li>
				<li>Ramen Tonkotsu.</li>
				<li>Ramen Miso Veggie.</li>
			</ul>
			Algo de celebrar son sus noodles frescos hechos en casa.
			<br />
			Además de Ramen también puedes pedir:
			<ul>
				<li>Yakisoba.</li>
				<li>Curry.</li>
				<li>Wonton.</li>
				<li>y más!</li>
			</ul>
			Takunoya lo encuentras en zona Cacho.
			<br>
			Adicionalmente cuentan con servicio a domicilio a través de las plataformas: Uber Eats, DiDi Food y Rappi.
		</div>
	</Card>

	<Card
		username="artezza_pizza"
		title="Artezza Pizza"
		category="pizza"
		imgSrc="/images/pizza.jpeg"
	>
		<div>
			Pizzería 100% Mexicana. Ofrece una gran variedad de pizzas con originalidad y calidad.
			<br />
			Por mencionar algunas de sus pizzas:
			<ul>
				<li>Pepperoni.</li>
				<li>Italiana.</li>
				<li>Pollo con chipotle.</li>
			</ul>
			Además de pizzas también puedes pedir:
			<ul>
				<li>Espagueti.</li>
				<li>Artezzitos Bites.</li>
				<li>y más!</li>
			</ul>
			Artezza Pizza lo encuentras en Lomas de la Presa.
			<br>
			Adicionalmente cuentan con servicio a domicilio.
		</div>
	</Card>

	<Card
		username="ohanatjpoke"
		title="Ohana Poke"
		category="poke"
		imgSrc="/images/poke.jpeg"
	>
		<div>
			Un poke distinto, hecho con las manos de una gran familia.
			<br />
			Por mencionar algunas de sus pokes:
			<ul>
				<li>Atún.</li>
				<li>Spicy tuna.</li>
				<li>Tofu.</li>
			</ul>
			Lo interesante del poke es que lo puedes escoger a tu gusto.
			<ul>
				<li>Proteína.</li>
				<li>Toppings.</li>
				<li>Salsas.</li>
				<li>y más!</li>
			</ul>
			Ohana Poke lo encuentras en Colinas de Aguacaliente.
			<br>
			Adicionalmente cuentan con servicio a domicilio a través de las plataformas: Uber Eats, DiDi Food y Rappi.
		</div>
	</Card>

	<Card
		username="sushimimx"
		title="Sushimimx"
		category="sushi"
		imgSrc="/images/sushi.jpeg"
	>
		<div>
			Creadores de los mejores sushis y teriyakis de Tijuana.
			<br />
			Por mencionar algunos de sus rollos:
			<ul>
				<li>FunkaRoll.</li>
				<li>MojadoRoll.</li>
				<li>Crunchy Roll.</li>
			</ul>
			Además de Sushi también puedes pedir:
			<ul>
				<li>Brochetas.</li>
				<li>Sopa Miso.</li>
				<li>Udón.</li>
				<li>y más!</li>
			</ul>
			Sushimimx en múltiples ubicaciones: Playas, Plaza Rio, Galerías, Otay y más.
			<br>
			Adicionalmente cuentan con servicio a domicilio.
		</div>
	</Card>

	<Card
		username="lionfishrestaurant"
		title="Lion Fish"
		category="mariscos"
		imgSrc="/images/mariscos.jpeg"
	>
		<div>
			Auténtica cocina de mariscos-fusión en donde el servicio y sazón son principales diferenciadores.
			<br />
			Por mencionar alguno de sus platillos:
			<ul>
				<li>Aguachile.</li>
				<li>Tacos.</li>
				<li>Ceviche.</li>
			</ul>
			Lion Fish lo encuentras en zona Rio.
		</div>
	</Card>
	
</div>

<div class="container">
	<p>
		Tijuana es una ciudad en crecimiento, actualmente cuenta con varias zonas que ofrecen una gran variedad de comida.
		Aquí dejamos 5 zonas en las que podrás encontrar buenos lugares para comer:
	</p>
	<ul>
		<li>
			<strong>Playas de Tijuana</strong>
			<p>
				Además de tener buenas opciones de comida cuenta con la playa, la cual siempre es buena para una caminata, especialmente durante el atardecer.
				Si buscas un ambiente relajado y buenos precios, esta es la zona.
			</p>
		</li>
		<li>
			<strong>Centro</strong>
			<p>
				El centro es un punto de folklore, donde además de opciones de comida se puede disfrutar de una caminata por la emblemática calle Revolución.
				Es una zona de contrastes que bien define una de las caras de Tijuana. Si estas en busca de algo alternativo esta es la zona.
			</p>
		</li>
		<li>
			<strong>Rio</strong>
			<p>
				Zona rio se caracteriza por su urbanismo donde se encuentran restaurantes de renombre, adicionalmente hay varios centros comerciales y zonas de entretenimiento para continuar la vuelta.
				Si estas en busca de una opción más moderna esta es la zona.
			</p>
		</li>
		<li>
			<strong>Insurgentes</strong>
			<p>
				Esta zona ha crecido mucho en los últimos años y de igual forma lo ha hecho su oferta gastronómica. Podría parecer lejos para algunas personas, sin embargo vale la pena, pues las opciones de comida son buenas y por lo regular a buen precio.
			</p>
		</li>
		<li>
			<strong>El Valle de Guadalupe</strong>
			<p>
				El valle se encuentra en Ensenada, apróximadamente a una hora de distancia, por tanto se puede considerar como una alternativa. 
				El valle es una zona entre montañas que cuenta con su propio clima. La oferta gastronómica es más sofisticada y en general los precios son altos, sin embargo la experiencia lo vale.
			</p>
		</li>
	</ul>
</div>

<div class="container">
	Síguenos en
	<ul>
		<li><a href="https://www.instagram.com/feedmetj/" target="_blank" rel="nofollow noreferrer" title="¿Qué comer en Tijuana">Instagram</a></li>
		<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer" title="La mejor comida de Tijuana">Facebook</a></li>
	</ul>
</div>
