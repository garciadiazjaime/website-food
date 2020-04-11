<script>
	import Card from '../components/Card.svelte';
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import { getBrands } from '../utils/mintAPIUtil'
	import { extendBrandInformation } from '../utils/brandUtil';

	let brands;
	const initialImagesToLoad = 2;

	// List of tab items with labels and values.
  let tabItems = [
    { label: "Tab 1", value: 1 },
    { label: "Tab 2", value: 2 },
    { label: "Tab 3", value: 3 }
  ];

  // Current active tab
  let currentTab;

  onMount(async () => {
		const data = await getBrands();
		brands = extendBrandInformation(data);
	});

</script>

<style>
	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
	}
	.card-content {
		position: relative;
		padding: 16px;
	}
	.caption {
		position: absolute;
		background-color: white;
		width: calc(100% - 32px);
		height: calc(100% - 32px);
		left: 16px;
		top: 16px;
		padding: 20px 0 0 0;
		box-sizing: border-box;
	}
	.caption:after {
		content: "";
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 0;
		left: 0;
    z-index: 10;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 75%);
	}
	.caption-content {
		height: 100%;
		overflow: scroll;
		padding-bottom: 30px;
		box-sizing: border-box;
	}
	.caption-button {
		position: absolute;
		top: 0;
		right: 0;
		
	}
</style>

<svelte:head>
  <title>...</title>
</svelte:head>

<div class="grid-container">
  {#if brands}
    {#each brands as brand, index}
			{#if brand.post}
				<Card brand={brand} lazy={index > initialImagesToLoad} />
			{/if}
    {/each}
  {/if}
</div>
