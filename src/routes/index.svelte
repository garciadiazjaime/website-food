<script>
  import Card, { Content, PrimaryAction, Media } from "@smui/card";

	import { onMount } from "svelte";
	import Phone from '../components/Phone.svelte';
	import ExpandButton from '../components/ExpandButton.svelte';
	import { getBrands } from '../utils/mintAPIUtil'
	import { extendBrandInformation } from '../utils/brandUtil'

  let brands;

  onMount(async () => {
		const data = await getBrands();
    
		brands = extendBrandInformation(data)
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
		font-size: 12px;
		line-height: 16px;
		word-break: break-all;
  }

	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
	}
	.phone-grid {
		display: grid;
		grid-column-gap: 5px;
		grid-template-columns: repeat( auto-fit, 105px );
		padding-bottom: 10px;
		border-bottom: 1px solid #dedede;
		margin-bottom: 20px;
	}
</style>

<svelte:head>
  <title>...</title>
</svelte:head>

<div class="grid-container">
  {#if brands}
    {#each brands as item}
			{#if item.post}
				<Card>
					<PrimaryAction on:click={() => doAction('openItemPage')}>

						<Media
							style="background-image: url({getImageURL(item)});"
							aspectRatio="16x9" />
						<Content>
							{#if item.phones}
								<div class="phone-grid">
									{#each item.phones as phone}
										<Phone phoneNumber={phone} />
									{/each}
								</div>
							{/if}
							<p class="caption" on:click={() => item.isCaptionOpen = !item.isCaptionOpen}>
								{#if item.isCaptionOpen}
									{item.post.caption}
								{:else}
									{item.post.shortCaption}
								{/if}
								{#if item.post.caption.length > 50}
									<ExpandButton expand={item.isCaptionOpen} />
								{/if}
							</p>
						</Content>

					</PrimaryAction>
				</Card>
			{/if}
    {/each}
  {/if}
</div>
