<script>
  import Card from "@smui/card";
	import LazyLoad from '../components/LazyLoad.svelte';
	import Caption from '../components/Caption.svelte';
  import Location from '../components/Location.svelte';
  import Title from '../components/Title.svelte';
	import Options from '../components/Options.svelte';
  import Phones from '../components/Phones.svelte';
  import FlipCard from '../components/FlipCard.svelte';

  export let brand;
  export let lazy;

  let currentTab;

  function getImageURL(item) {
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

<Card data-id={brand._id}>
  <div class="card-content">
    <LazyLoad lazy={lazy} dataSrc={getImageURL(brand)} />
    <Title item={brand} />
    <Options options={brand.options} />
    <Phones phones={brand.phones} />
    <Location brand={brand} />
    <FlipCard brand={brand} />
  </div>
</Card>
