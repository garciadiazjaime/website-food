<script>
	import Lazy from 'svelte-lazy';
	import Cover from '../../components/Cover.svelte'
	
	import { publish } from "../../support/events"

	export let name
	export let instagram
	export let image
	export let description
	export let address
	export let phone
	export let gmaps

	publish('update_menu', 'restaurant')
</script>

<script context="module">
	export async function preload(page) {
		const { slug } = page.params;
		
		const response = await this.fetch(`/restaurants/${slug}.json`)
        const restaurant = await response.json()

		return { 
			...restaurant
		};
	}
</script>

<style>
	img {
		height: 454px;
		width: 100%;
		object-fit: cover;
	}

	p {
		padding: 0 12px;
		margin-bottom: 0;
	}

	a {
		text-decoration: none;
	}

	p {
		word-break: break-word;
	}

	ul {
		list-style-type: none;
		padding: 0 0 0 12px;
	}
	
	li {
		color: #666;
		font-size: 0.8em;
	}
</style>

<svelte:head>
	<title>{name}</title>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>

<Cover title={name} />
<br /><br />
<section>
	<Lazy height={300}>
		<picture>
			<source src={image} type="image/webp">
			<source src={image.replace('webp', 'jpeg')} type="image/jpeg"> 
			<img src={image.replace('webp', 'jpeg')} alt={name}>
		</picture>
	</Lazy>
	
	<p>{description}</p>
	<ul>
		<li><a href={gmaps} rel="nofollow noreferrer" target="_blank">{address}</a></li>
		<li>{phone}</li>
		<li>
			<a href={instagram} alt={`instagram ${name}`} rel="nofollow noreferrer" target="_blank">
				@{instagram.split('.com/')[1].replace('/', '')}
			</a>
		</li>
	</ul>	  
</section>
