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

	const title = `Encuentra los mejores ${category.title} | ${currentMonthTitle} 2022`
</script>

<script context="module">

	export async function preload() {
		const response = await this.fetch('/restaurants.json')
        const places = await response.json()

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

	.share-social-media {
		position: fixed;
		right: 12px;
		bottom: 12px;
	}

	.share-social-media a {
		text-decoration: none;
		border-radius: 3px;
		padding: 16px 24px;
		background: #1877f2;
		color: white;
		z-index: 10;
	}
</style>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title}>
	<meta property="og:description" content={description}>
	<meta property="og:url" content="https://www.feedmetj.com/comida/desayuno/">
	<meta name="description" content={description}>

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": [{
				"@type": "Question",
				"name": "Dónde desayunar en Tijuana?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": `<ul>
						<li><h3>La Espadaña</h3><p>Donde queremos que desayune, coma y cene, casi como en su casa.</p></li>
						<li><h3>Marenca Restaurante</h3><p>Sabemos lo que te gusta, y lo llevamos a tu mesa.</p></li>
						<li><h3>El Yogurt Place</h3><p>Desayunos con frutas, verduras, cereales, granos y semillas convertidas en deliciosas creaciones para cuidar de tu salud y vida.</p></li>
					</ul>
					`
				}
			}]
		}
	</script>
</svelte:head>

<Cover title={title} />

<section>
	<ul>
		{#each places as place, index}
		<li>
			<Card 
				index={index + 1} 
				title={place.name}
				link={`/comida/${place.slug}`}
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

<div class="share-social-media">
	<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.feedmetj.com%2Fcomida%2Fdesayuno%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Compartir</a>
</div>
