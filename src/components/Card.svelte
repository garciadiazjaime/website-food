<script>
  import Card, { Media } from "@smui/card";
  import { fade } from 'svelte/transition';
	import Phones from '../components/Phones.svelte';
	import LazyLoad from '../components/LazyLoad.svelte';
	import Caption from '../components/Caption.svelte';
	import Location from '../components/Location.svelte';
	import Options from '../components/Options.svelte';
  import Tabs from '../components/Tabs.svelte';

  export let brand;
  export let lazy;
  
  let tabItems = [
    { label: "Tab 1", value: 1 },
    { label: "Tab 2", value: 2 },
    { label: "Tab 3", value: 3 }
  ];

  // Current active tab
  let currentTab;

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

{#if brand.post}
  <Card>
      <div class="card-content">
        <LazyLoad lazy={lazy} dataSrc={getImageURL(brand)} />
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
            <div class="caption-content">{brand.post.caption}</div>
            <button class="caption-button" on:click={() => (currentTab = 1)}>X</button>
          </div>
        {/if}
      </div>
  </Card>
{/if}