<script>
  import Card, { Media } from "@smui/card";
	import LazyLoad from '../components/LazyLoad.svelte';
	import Caption from '../components/Caption.svelte';
	import Location from '../components/Location.svelte';
	import Options from '../components/Options.svelte';
  import TabPanels from '../components/TabPanels.svelte';

  export let brand;
  export let lazy;

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
    transition: height .3s;
	}
</style>

{#if brand.post}
  <Card data-id={brand._id}>
      <div class="card-content">
        <LazyLoad lazy={lazy} dataSrc={getImageURL(brand)} />
        <Location item={brand} />
        <Options options={brand.options} />
        <TabPanels brand={brand} />
      </div>
  </Card>
{/if}