<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';

	import Card from '../components/Card.svelte';
	import { getBrands } from '../utils/mintAPIUtil'

	let brands;
	const initialImagesToLoad = 2;

  onMount(async () => {
		brands = await getBrands();
	});
</script>

<style>
	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
	}
</style>

<svelte:head>
  <title>...</title>
</svelte:head>

<div class="grid-container">
  {#if brands}
    {#each brands as brand, index}
			<Card brand={brand} lazy={index > initialImagesToLoad} />
    {/each}
  {/if}
</div>
