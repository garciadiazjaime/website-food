<script>
  import Card from "@smui/card";
	import LazyLoad from '../components/LazyLoad.svelte';
	import Caption from '../components/Caption.svelte';
  import Location from '../components/Location.svelte';
  import Title from '../components/Title.svelte';
	import Options from '../components/Options.svelte';
  import Phones from '../components/Phones.svelte';
  import FlipCard from '../components/FlipCard.svelte';
  import Whatsapp from '../components/Whatsapp.svelte';

  export let post;
  export let lazy;

  let currentTab;

  function getImageURL(post) {
    if (post.mediaType === "IMAGE") {
      return post.mediaUrl;
    }

    if (Array.isArray(post.children) && post.children.length) {
      const media = post.children.find(item => item.media_type === 'IMAGE')
      if (media && media.media_url) {
        return media.media_url;
      }
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

<Card data-id={post._id}>
  <div class="card-content">
    <LazyLoad lazy={lazy} dataSrc={getImageURL(post)} />
    <Whatsapp post={post} />
    <div class="info-button">
      <FlipCard post={post} />
    </div>
    <Title post={post} />
    <div class="padbot10">
      <Phones post={post} />
      <Location post={post} />
    </div>
    <Options post={post} />
  </div>
</Card>
