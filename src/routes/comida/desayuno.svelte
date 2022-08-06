<script>
	import Cover from '../../components/Cover.svelte'
	import Card from '../../components/Card.svelte'

	import { publish } from "../../support/events"

	export let places = []
	export let category = {}

	publish('update_menu', category.menu)

	const description = `Los mejores lugares pare desayunar en Tijuana.`
	const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	const currentMonthTitle = months[new Date().getMonth()]
	
</script>

<script context="module">

	export async function preload(page) {
		const places = [{
            fullName: 'La Espadaña',
            title: 'La Espadaña',
            link: 'https://www.instagram.com/laespadanatijuana/',
            subtitle: 'Comida mexicana desde 1990',
            image: '/desayuno/espadana.jpeg',
            description: 'Donde queremos que desayune, coma y cene, casi como en su casa.',
            phone: '(664) 634 1488',
            address: 'Boulevard Sanchez Taboada 10813, Zona Rio.',
            gmaps: 'https://goo.gl/maps/yntnksKBcYd3mZ6c7',
        }, {
            fullName: 'Marenca Restaurante',
            title: 'Marenca Restaurante',
            link: 'https://www.instagram.com/marencaoficial/',
            subtitle: 'Sabemos lo que te gusta, y lo llevamos a tu mesa.',
            image: '/desayuno/marenca.jpeg',
            description: 'Sabemos lo que te gusta, y lo llevamos a tu mesa.',
            phone: '(664) 634 6419',
            address: 'Paseo de los Héroes 70, Zona Río.',
            gmaps: 'https://g.page/MarencaOficial',
        }, {
            fullName: 'El Yogurt Place',
            title: 'El Yogurt Place',
            link: 'https://www.instagram.com/elyogurtplace/',
            subtitle: 'Disfruta de nuestros deliciosos desayunos.',
            image: '/desayuno/yogurt-place.jpeg',
            description: 'El Yogurt Place inició como un sueño que nunca creímos sería realidad. Era un sueño de un lugar con frutas, verduras, cereales, granos y semillas convertidas en deliciosas creaciones para cuidar de tu salud y vida.',
            phone: '(664) 680 2006',
            address: 'Cantera 360, Playas De Tijuana',
            gmaps: 'https://goo.gl/maps/XLFrYi27L9oMV8Wk6',
        }, {
            fullName: 'Riochia7 La Cabaña del Artista',
            title: 'Riochia7 La Cabaña del Artista',
            link: 'https://www.instagram.com/riochia7/',
            subtitle: '',
            image: '/desayuno/riochia7.jpeg',
            description: 'Arte culinario natural y fresco que creamos todos los días.',
            phone: '(664) 381 5069',
            address: 'Independencia 6213, Colonia Castillo.',
            gmaps: 'https://g.page/LaCasaDelArtistaCafeRiochia7',
        }, {
            fullName: 'Malvet',
            title: 'Malvet',
            link: 'https://www.instagram.com/malvetmx/',
            subtitle: '',
            image: '/desayuno/malvet.jpeg',
            description: 'Desayunos y Brunch desde el corazón de nuestra cocina hasta tu mesa.',
            phone: '(664) 378 3428',
            address: 'Paseo Playas de Tijuana 1287',
            gmaps: 'https://goo.gl/maps/8mcSCWjXV4yptZ5p8',
        }, {
            fullName: 'Café de la Flor',
            title: 'Café de la Flor',
            link: 'https://www.instagram.com/cafedelaflor/',
            subtitle: '',
            image: '/desayuno/cafe-flor.jpeg',
            description: 'La compañia es el mejor alimento.',
            phone: '(664) 681 8633',
            address: 'Av. Sonora 69 Fracc. Chapultepec.',
            gmaps: 'https://g.page/LaFlorChapultepec',
        } ,{
            fullName: 'La Esquinita Cocina Mexicana',
            title: 'La Esquinita Cocina Mexicana',
            link: 'https://www.instagram.com/laesquinitacocinamexicana/',
            subtitle: '',
            image: '/desayuno/esquinita-cocina-mexicana.jpeg',
            description: 'Donde hay comida, hay felicidad.',
            phone: '(664) 720 1929',
            address: 'Av. Andrés Quintana Roo 1781.',
            gmaps: 'https://goo.gl/maps/6KefQhoEBZ7qe4RJ6',
        } ,{
            fullName: 'Praga cafe',
            title: 'Praga cafe',
            link: 'https://www.instagram.com/cafepragatj/',
            subtitle: '',
            image: '/desayuno/praga-cafe.jpeg',
            description: 'Vegan Sandwich, Pan de centeno oscuro, berenjena asada, alfalfa, aguacate, lechuga romana, tomate, pesto de albahaca, acompañado de puré de papa.',
            phone: '(664) 685 7793',
            address: 'Av. Revolución 1070, Zona Centro.',
            gmaps: 'https://goo.gl/maps/pqYvi3r5AjFgahhw5',
        } ,{
            fullName: 'San Miguel Restaurant',
            title: 'San Miguel Restaurant',
            link: 'https://www.instagram.com/sanmiguelrestaurante/',
            subtitle: '',
            image: '/desayuno/san-miguel-restaurante.jpeg',
            description: 'Te Esperamos de jueves a martes.',
            phone: '(664) 609 9480',
            address: 'Parque Azteca Norte 294, Playas de Tijuana.',
            gmaps: 'https://g.page/sanmiguelplayas',
        } ,{
            fullName: 'Alma Verde',
            title: 'Alma Verde',
            link: 'https://www.instagram.com/almaverdemx/',
            subtitle: '',
            image: '/desayuno/alma-verde.jpeg',
            description: 'La misión de Alma Verde es ofrecer productos de calidad, por ello utilizamos alimentos orgánicos, saludables y con muy buen sabor.',
            phone: '(664) 972 9607',
            address: 'Av. Hipódromo 19, Hipódromo',
            gmaps: 'https://goo.gl/maps/ixiaVWP3vEwFaixr7',
        }]

		return { 
			places,
			category: {
                title: 'Desayunos en Tijuana',
                label: 'Desayuno',
                menu: 'desayuno',
                api: 'desayuno',
            }
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
	<title>Encuentra los mejores {category.title} | {currentMonthTitle} 2022</title>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>

<Cover title={category.title} />

<section>
	<ul>
		{#each places as place, index}
		<li>
			<Card 
				index={index + 1} 
				title={place.fullName}
				link={place.link}
				subtitle={category.label}
				image={place.image}
				description={place.description}
                address={place.address}
                phone={place.phone}
                gmaps={place.gmaps}
			/>
		</li>
		{/each}
	</ul>
</section>
