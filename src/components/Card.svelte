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
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }
  .info-button {
    margin-top: -42px;
    text-align: right;
    padding-right: 10px;
    margin-bottom: 5px;
  }
  .padbot10 {
    padding-bottom: 10px;
  }
</style>

<Card data-id={brand._id}>
  <div class="card-content">
    <LazyLoad lazy={lazy} dataSrc={getImageURL(brand)} />
    <div class="info-button">
      <FlipCard brand={brand} />
    </div>
    <Title brand={brand} />
    <div class="padbot10">
      <Phones phones={brand.phones} />
      <Location brand={brand} />
    </div>
    <Options options={brand.options} />
  </div>
</Card>
