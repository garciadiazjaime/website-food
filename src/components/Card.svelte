<script>
  import Card from "@smui/card";
	import LazyLoad from './LazyLoad.svelte';
  import Location from './Location.svelte';
	import Keywords from './Keywords.svelte';
  import Phones from './Phones.svelte';
  import Title from './Title.svelte';
  import Whatsapp from './Whatsapp.svelte';
  import { getWhatsapp } from '../utils/postUtil';

  export let profile;
  export let lazy;
  export let openProfile;

  let currentTab;

  function handleClick() {
    ga('send', 'event', 'card', 'click', profile.username);
    openProfile(profile);
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
  .last-item {
    margin-top: auto;
  }
</style>

<Card data-id={profile.id} class="Card" on:click={handleClick}>
  <div class="card-content">
    <LazyLoad lazy={lazy} dataSrc={profile.posts[0].mediaUrl ? profile.posts[0].mediaUrl : "/default.png"} />
    <Whatsapp whatsapp={getWhatsapp(profile.caption)} />
    <Title title={profile.title} />
    <Keywords keywords={profile.keywords} />
    <Location address={profile.address} dist={profile.dist}/>
    <div class="last-item">
      <Phones phone={profile.phones[0]} username={profile.username}/>
    </div> 
  </div> 
</Card>
