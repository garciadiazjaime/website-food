<script>
  import Card, { Content, PrimaryAction, Media } from "@smui/card";

	import { onMount } from "svelte";
	import Phone from '../components/Phone.svelte';
	import ExpandButton from '../components/ExpandButton.svelte';
	import Location from '../components/Location.svelte';
	import { getBrands } from '../utils/mintAPIUtil'
	import { extendBrandInformation } from '../utils/brandUtil';

	let brands;
	const shortCaptionLength = 144;

  onMount(async () => {
		const data = await getBrands();
    
		brands = extendBrandInformation(data, shortCaptionLength);
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
  .caption {
		margin: 0 auto;
		font-size: 16px;
		line-height: 1.2;
		word-break: break-all;
  }

	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
	}
	.location-container {
		position: absolute;
		top: 15px;
		left: 15px;
	}
	.phone-grid {
		display: grid;
		margin: -38px 15px 0;
		z-index:10;
		grid-column-gap: 5px;
		grid-template-columns: repeat( auto-fit, 105px );
	}
</style>

<svelte:head>
  <title>...</title>
</svelte:head>

<div class="grid-container">
  {#if brands}
    {#each brands as item}
			{#if item.post}
				<div style="position: relative;">
					<Card>
						<Media
							style="background-image: url({getImageURL(item)});"
							aspectRatio="16x9" />
							<div class="location-container">
								{#if item.location}
									<Location title={item.location.name} address={item.location.address.street} />
								{:else}
									<Location title={item.fullName ? item.fullName : item.username} />
								{/if}
							</div>
						{#if item.phones}
							<div class="phone-grid">
								{#each item.phones as phone}
									<Phone phoneNumber={phone} />
								{/each}
							</div>
						{/if}
						<Content>
							{#if item.post.shortCaption}
								<p class="caption" on:click={() => item.isCaptionOpen = !item.isCaptionOpen}>
									{#if !item.isCaptionOpen}
										{item.post.shortCaption}...
										{:else}
											{item.post.caption}
									{/if}
									<ExpandButton expand={item.isCaptionOpen} />
								</p>
								{:else}
									<p class="caption">
										{item.post.caption}
									</p>
							{/if}
						</Content>
					</Card>
				</div>
			{/if}
    {/each}
  {/if}
</div>
