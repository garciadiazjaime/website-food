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

  let dataSrc = 'error_img.svg'

  const item = profile.posts.find(item => item.mediaUrl)
  if (item) {
    dataSrc = item.mediaUrl
  }

  let currentTab;

  function handleClick() {
    ga('send', 'event', 'card', 'click', profile.username);

    history.pushState(null, profile.username, `#${profile.username}`);

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

<Card class="Card" data-id={profile.id} data-rank={profile.rank} data-dist={profile.dist}}>
  <div class="card-content">
    <div on:click={handleClick}>
      <LazyLoad lazy={lazy} dataSrc={dataSrc} posts={profile.posts}  />
      <Whatsapp whatsapp={getWhatsapp(profile.caption)} />
      <Title title={profile.title} />
    </div>
    <Keywords keywords={profile.keywords} />
    <Location address={profile.address} dist={profile.dist}/>
    <div class="last-item">
      <Phones phone={profile.phones[0]} username={profile.username}/>
    </div> 
  </div> 
</Card>
