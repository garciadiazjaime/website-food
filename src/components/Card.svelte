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

  function handleClick() {
    ga('send', 'event', 'card', 'click', profile.username);
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
    <LazyLoad lazy={lazy} dataSrc={profile.posts[0].mediaUrl ? profile.posts[0].mediaUrl : "/default.png"} />
    <Whatsapp whatsapp={getWhatsapp(profile.caption)} />
    <div class="info-button">
      <FlipCard>
        <p>This component is going away soon</p>
      </FlipCard>
    </div>
    <Title title={profile.title} />
    <Keywords keywords={profile.keywords} />
    <Location address={profile.address} dist={profile.dist}/>
    <div class="last-item">
      <Phones phone={profile.phones[0]} username={profile.username}/>
    </div> 
  </div> 
</Card>
