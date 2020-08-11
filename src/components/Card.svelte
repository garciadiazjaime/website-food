<script>
  import Card from "@smui/card";
	import LazyLoad from '../components/LazyLoad.svelte';
  import Location from '../components/Location.svelte';
	import Keywords from '../components/Keywords.svelte';
  import Phones from '../components/Phones.svelte';
  import Title from '../components/Title.svelte';
  import Whatsapp from '../components/Whatsapp.svelte';
  import { getWhatsapp } from '../utils/postUtil';
  import { profileId } from '../utils/stores';

  export let profile;
  export let lazy;
  export let openProfile;

  let currentTab;

  function handleClick(id) {
    ga('send', 'event', 'card', 'click', profile.username);
    profileId.set(id);
    openProfile();
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
    color: pink;
  }
  .last-item {
    margin-top: auto;
  }
</style>

<Card data-id={profile.id} class="Card" on:click={() =>handleClick(profile.id)}>
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
