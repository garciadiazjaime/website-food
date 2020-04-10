<script>
  import Card, { Content, Media } from "@smui/card";
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';
	import Phones from '../components/Phones.svelte';
	import ExpandButton from '../components/ExpandButton.svelte';
	import LazyLoad from '../components/LazyLoad.svelte';
	import Caption from '../components/Caption.svelte';
	import Location from '../components/Location.svelte';
	import Options from '../components/Options.svelte';
	import Tabs from '../components/Tabs.svelte';
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

  function getImageURL(item) {
		if (!item.post) {
			return 
		}

    if (item.post.mediaType === "IMAGE") {
      return item.post.mediaUrl;
    }

    if (Array.isArray(item.post.children) && item.post.children.length) {
      return item.post.children[0].media_url;
    }

    return "/default.png";
  }
</script>

<style>
	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
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
				<Card>
					<Content>
						<LazyLoad lazy={index > initialImagesToLoad} dataSrc={getImageURL(brand)} />
						<Location item={brand} />
						<Options options={brand.options} />
						<Tabs bind:activeTabValue={currentTab} items={tabItems} />
						{#if 1 === currentTab}
							<Phones phones={brand.phones} />
						{/if}

						{#if 2 === currentTab}
							<div>{brand.location.address.street}</div>
						{/if}
						{#if 3 === currentTab}
							<div class="caption" transition:fade="{{ duration: 200 }}">
								{brand.post.caption}
								<button class="caption-button" on:click={() => (currentTab = 1)}>X</button>
							</div>
						{/if}
					</Content>
				</Card>
			{/if}
    {/each}
  {/if}
</div>
