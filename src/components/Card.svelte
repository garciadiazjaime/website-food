<script>
  import Card from "@smui/card";
	import LazyLoad from '../components/LazyLoad.svelte';
  import Location from '../components/Location.svelte';
	import Keywords from '../components/Keywords.svelte';
  import Phones from '../components/Phones.svelte';
  import FlipCard from '../components/FlipCard.svelte';
  import Title from '../components/Title.svelte';
  import Whatsapp from '../components/Whatsapp.svelte';
  import { getWhatsapp } from '../utils/postUtil';

  export let profile;
  export let lazy;

  let currentTab;

  function getPhone(profile) {
    if(profile && Array.isArray(profile.phones) && profile.phones.length) {
      return profile.phones[0];  // default tab
    }
    return '';
  };

  function getUsername(profile) {
    if(profile && Array.isArray(profile.username)) {
      return profile.username;  // default tab
    }
    return '';
  }

  function getImageURL(profile) {
    if (profile.posts && Array.isArray(profile.posts) && profile.posts[0].mediaUrl) {

      return profile.posts[0].mediaUrl;
    }
    return "/default.png";
  }
  
  function getCaption(profile) {
    if (profile.posts && Array.isArray(profile.posts) && profile.posts[0].caption) {
      return profile.posts[0].caption;
    }
  }

  function getTitle(profile) {
    if(profile.title) {
      return profile.title;
    }
  }

  function getKeywords(profile) {
    if(profile.keywords && Array.isArray(profile.keywords) && profile.keywords.length) {
      return profile.keywords;
    }
  }

  function handleClick() {
    ga('send', 'event', 'card', 'click', getUsername(profile));
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

<Card data-id={profile.id} class="Card" on:click={handleClick}>
  <div class="card-content">
    <LazyLoad lazy={lazy} dataSrc={getImageURL(profile)} />
    <Whatsapp whatsapp={getWhatsapp(getCaption(profile))} />
    <div class="info-button">
      <FlipCard caption={getCaption(profile)} />
    </div>
    <Title title={getTitle(profile)} />
    {#if getKeywords(profile)}
      <Keywords keywords={getKeywords(profile)} />
    {/if}
    <Location address={profile.address} dist={profile.dist}/>
    <div class="last-item">
      <Phones phone={getPhone(profile)} username={getUsername(profile)}/>
    </div> 
  </div> 
</Card>
