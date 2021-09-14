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

	.content {
		max-width: 960px;
		margin: 0 auto;
		padding-top: 20px;
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
	<div class="container">
		<h1>
			Qué comer en Tijuana?
		</h1>
		<p>
			La mejor comida se hace en Tijuana, descubre los mejores lugares para comer.
		</p>
	</div>

	<br />


	<div class="item-list">
		<Card
			username="takunoya_ramen"
			title="Takunoya Ramen"
			category="ramen"
			imgSrc="/que-comer-en-tijuana/comer-ramen-tijuana.jpeg"
		>
			<div>
				Si lo que buscas es <strong>comer Ramen</strong>, Takunoya Ramen cuenta con un menú excelente, por mencionar algunos de sus platillos:
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
				Takunoya lo encuentras en la zona Cacho.
				<br>
				Cuentan con servicio a domicilio.
			</div>
		</Card>

		<Card
			username="artezza_pizza"
			title="Artezza Pizza"
			category="pizza"
			imgSrc="/que-comer-en-tijuana/comer-pizza-tijuana.jpeg"
		>
			<div>
				Si lo que buscas es <strong>comer Pizza</strong>, Artezza Pizza ofrece una gran variedad de pizzas con originalidad y calidad.
				<br /><br />
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
				Cuentan con servicio a domicilio.
			</div>
		</Card>

		<Card
			username="ohanatjpoke"
			title="Ohana Poke"
			category="poke"
			imgSrc="/que-comer-en-tijuana/comer-poke-tijuana.jpeg"
		>
			<div>
				Uno de los mejores lugares para <strong>comer Poke en Tijuana</strong> es Ohana Poke.
				<br /><br />
				Por mencionar algunos de sus Pokes:
				<ul>
					<li>Atún.</li>
					<li>Spicy tuna.</li>
					<li>Tofu.</li>
				</ul>
				Lo interesante del poke es que lo puedes hacer a tu gusto.
				<ul>
					<li>Proteína.</li>
					<li>Toppings.</li>
					<li>Salsas.</li>
					<li>y más!</li>
				</ul>
				Ohana Poke lo encuentras en Colinas de Aguacaliente.
				<br>
				Cuentan con servicio a domicilio.
			</div>
		</Card>

		<Card
			username="sushimimx"
			title="Sushi Sushimimx"
			category="sushi"
			imgSrc="/que-comer-en-tijuana/comer-sushi-tijuana.jpeg"
		>
			<div>
				Si lo que buscas es <strong>comer Sushi</strong>, Sushimimx ofrece rollos de sushi y teriyaki de muy buena calidad en <strong>Tijuana</strong>.
				<br /><br />
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
				Sushimimx cuenta con múltiples ubicaciones: Playas, Plaza Rio, Galerías, Otay y más.
				<br>
				Cuentan con servicio a domicilio.
			</div>
		</Card>

		<Card
			username="lionfishrestaurant"
			title="Mariscos Lion Fish"
			category="mariscos"
			imgSrc="/que-comer-en-tijuana/comer-mariscos-tijuana.jpeg"
		>
			<div>
				Si lo que buscas es <strong>comer Mariscos</strong>, Lion Fish ofrece auténtica cocina de mariscos-fusión en donde el servicio y sazón son principales diferenciadores.
				<br /><br />
				Por mencionar alguno de sus platillos:
				<ul>
					<li>Aguachile.</li>
					<li>Tacos.</li>
					<li>Ceviche.</li>
				</ul>
				Lion Fish lo encuentras en zona Rio.
			</div>
		</Card>

		<Card
			username="seolleim_tijuana"
			title="Seolleim | café Coreano"
			category="café"
			imgSrc="/que-comer-en-tijuana/tomar-cafe-tijuana.jpeg"
		>
			<div>
				El primer local especializado de Sándwich, Toast y Hot Dog al estilo Coreano.
				<br /><br />
				Adicionalmente cuenta con:
				<ul>
					<li>Refresher.</li>
					<li>Jolly pong latte.</li>
					<li>Pastel de zanahoria.</li>
				</ul>
				Seolleim Café lo encuentras en la Cacho.
			</div>
		</Card>

		<Card
			username="maharosarito"
			title="Maha Restaurante"
			category="restaurante"
			imgSrc="/que-comer-en-tijuana/comer-restaurante-tijuana.jpeg"
		>
			<div>
				Descubre la riqueza culinaria de México en Maha! Deleita tus sentidos a través de nuestra propuesta contemporánea de la cocina Mexicana!
				<br /><br />
				Por mencionar algunos platillos de su menú:
				<ul>
					<li>Taco mar y tierra.</li>
					<li>Taco de pulpo zarandeado.</li>
					<li>Tostada de paté de pescado, callo y camarón.</li>
				</ul>
				Maha Restaurante lo encuentras en Rosarito.
			</div>
		</Card>

		<Card
			username="lelieureposteria"
			title="Le Lieu Repostería"
			category="resposteria"
			imgSrc="/que-comer-en-tijuana/comer-resposteria-tijuana.jpeg"
		>
			<div>
				Boutique de Repostería Francesa | Tijuana.
				<br /><br />
				Por mencionar algunas opciones de su menú:
				<ul>
					<li>Eclair de vainilla.</li>
					<li>Tartas de Lavanda.</li>
					<li>Macarons.</li>
				</ul>
				Le Lieu Repostería lo encuentras en la Cacho.
			</div>
		</Card>
		
	</div>

	<br />

	<div class="container">
		<p>
			<strong>Tijuana</strong> es una ciudad en crecimiento, actualmente cuenta con varias zonas que ofrecen una gran variedad de comida.
			Aquí dejamos 5 zonas en las que podrás encontrar buenos lugares para comer:
		</p>
		<ul>
			<li>
				<h2>Septiembre, Mes patrio.</h2>
				<p>
					Se dice que en Tijuana comienza la patria, y que mejor que celebrarlo disfrutando de comida mexicana.
					Aquí te dejamos 3 opciones:
				</p>
				<ul>
					<li><a href="https://www.instagram.com/rootsriorestaurant/" target="_blank" rel="nofollow noreferrer">Roots Río</a></li>
					<li><a href="https://www.instagram.com/rincon.guerrerense/" target="_blank" rel="nofollow noreferrer">Rincon Guerrerense</a></li>
					<li><a href="https://www.instagram.com/madeleinesgalicia/" target="_blank" rel="nofollow noreferrer">Madeleines</a></li>
				</ul>
				<br />
			</li>
			<li>
				<h2>Qué comer en Playas de Tijuana?</h2>
				<p>
					Además de tener buenas opciones de comida cuenta con la playa, la cual siempre es buena para una caminata, especialmente durante el atardecer.
					Si buscas un ambiente relajado y buenos precios, esta es la zona.
				</p>
				<ul>
					<li><a href="https://www.instagram.com/mipizzaalalena/" target="_blank" rel="nofollow noreferrer">Mi Pizza a la leña</a></li>
					<li><a href="https://www.instagram.com/tacoselwero/" target="_blank" rel="nofollow noreferrer">Tacos "El Wero"</a></li>
					<li><a href="https://www.instagram.com/purpurareal.deli/" target="_blank" rel="nofollow noreferrer">Purpura Real</a></li>
				</ul>
				<br />
			</li>
			<li>
				<h2>Qué comer en Centro?</h2>
				<p>
					El centro es un punto de folklore, donde además de opciones de comida se puede disfrutar de una caminata por la emblemática calle Revolución.
					Es una zona de contrastes que bien define una de las caras de Tijuana. Si estas en busca de algo alternativo esta es la zona.
				</p>
				<ul>
					<li><a href="https://www.instagram.com/verdeycrema/" target="_blank" rel="nofollow noreferrer">Verde y Crema</a></li>
					<li><a href="https://www.instagram.com/ruta3tijuana/" target="_blank" rel="nofollow noreferrer">Ruta 3 Sports Bar</a></li>
					<li><a href="https://www.instagram.com/los.panchos.taco.tijuana/" target="_blank" rel="nofollow noreferrer">Los Panchos</a></li>
				</ul>
				<br />
			</li>
			<li>
				<h2>Zona Río</h2>
				<p>
					Zona río se caracteriza por su urbanismo donde se encuentran restaurantes de renombre, adicionalmente hay varios centros comerciales y zonas de entretenimiento para continuar la vuelta.
					Si estas en busca de una opción más moderna esta es la zona.
				</p>
				<ul>
					<li><a href="https://www.instagram.com/asaderobajasonora/" target="_blank" rel="nofollow noreferrer">Asadero Baja Sonora</a> [Burrito de asada]</li>
					<li><a href="https://www.instagram.com/bunkerfoodcrew.rio/" target="_blank" rel="nofollow noreferrer">Bunker Food Crew Río</a> [Arepa]</li>
					<li><a href="https://www.instagram.com/rootsriorestaurant/" target="_blank" rel="nofollow noreferrer">Roots Río</a> [Pappardelle en crema de azafrán]</li>
				</ul>
			</li>
			<li>
				<h2>Zona Insurgentes.</h2>
				<p>
					Esta zona ha crecido mucho en los últimos años y de igual forma lo ha hecho su oferta gastronómica. Podría parecer lejos para algunas personas, sin embargo vale la pena, pues las opciones de comida son buenas y por lo regular a buen precio.
				</p>
				<ul>
					<li><a href="https://www.instagram.com/asaderobajasonora/" target="_blank" rel="nofollow noreferrer">Asadero Baja Sonora</a></li>
					<li><a href="https://www.instagram.com/finca.argentina/" target="_blank" rel="nofollow noreferrer">Finca Argentina</a></li>
					<li><a href="https://www.instagram.com/sukiyaki_comida_japonesa/" target="_blank" rel="nofollow noreferrer">Sukiyaki Comida japonesa</a></li>
				</ul>
			</li>
			<li>
				<h2>El valle de Guadalupe?</h2>
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
			<li><a href="https://www.instagram.com/feedmetj/" target="_blank" title="¿Qué comer en Tijuana">@feedmetj</a></li>
			<li><a href="https://www.facebook.com/Feedmetj-104064654962934" target="_blank" rel="nofollow noreferrer" title="La mejor comida de Tijuana">Facebook</a></li>
		</ul>
	</div>
</div>
