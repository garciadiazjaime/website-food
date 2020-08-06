<script>
  import Card from "@smui/card";
	import LazyLoad from '../components/LazyLoad.svelte';
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
    if (post.mediaUrl) {
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

  function handleClick() {
    ga('send', 'event', 'card', 'click', post.user.username);
  }
</script>
<style>
  .card-content {
		position: relative;
    padding: 8px;
    transition: height .3s;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-content: space-between;
  }
  .info-button {
    margin-top: -39px;
    text-align: right;
    padding-right: 10px;
    margin-bottom: -2px;
  }
  .last-item {
    margin-top: auto;
  }
</style>

<Card data-id={post.id} class="Card" on:click={handleClick}>
  <div class="card-content">
    <LazyLoad lazy={lazy} dataSrc={getImageURL(post)} />
    <Whatsapp post={post} />
    <div class="info-button">
      <FlipCard post={post} />
    </div>
    <Title post={post} />
    <Options post={post} />
    <Location post={post} />
    <div class="last-item">
      <Phones post={post} />
    </div>
  </div>
</Card>
