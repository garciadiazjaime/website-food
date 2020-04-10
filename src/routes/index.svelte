<script>
  import Card, { Content, PrimaryAction, Media } from "@smui/card";
	import { onMount } from "svelte";
	import Phones from '../components/Phones.svelte';
	import ExpandButton from '../components/ExpandButton.svelte';
	import LazyLoad from '../components/LazyLoad.svelte';
	import Caption from '../components/Caption.svelte';
	import Location from '../components/Location.svelte';
	import Options from '../components/Options.svelte';
	import { getBrands } from '../utils/mintAPIUtil'
	import { extendBrandInformation } from '../utils/brandUtil';

	let brands;
	let verOferta = false;
	const initialImagesToLoad = 0;

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

  function doAction(action) {
    console.log("You did an action: " + action);
	}
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
    {#each brands as item, index}
			{#if item.post}
				<Card>
					<Content>
					{#if verOferta}
						<Caption caption={item.post.caption} />
						{:else}
							<LazyLoad lazy={index > initialImagesToLoad} dataSrc={getImageURL(item)} placeholder="loading.gif" />
							<Location item={item} />
							<Options options={item.options} />
							<Phones phones={item.phones} />
					{/if}
					</Content>
				</Card>
			{/if}
    {/each}
  {/if}
</div>
