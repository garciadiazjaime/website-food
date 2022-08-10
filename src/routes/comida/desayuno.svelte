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

	export async function preload() {
		const response = await this.fetch('/data/restaurants.json')
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
				title={place.name}
				link={place.instagram}
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
