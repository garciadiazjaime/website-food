<script>
  import { onMount } from "svelte";
  import { tick } from 'svelte';
  import Dialog, { Title, Content } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Location from './Location.svelte';
  import Phones from './Phones.svelte';
  import Name from './Title.svelte';
  import './Profile.scss';
  import { removeHashtags } from '../utils/postUtil';
  let dialogRef;
  let profile;
  let posts;
  
  export function openProfile(currentProfile) {
    profile = currentProfile;
    posts = profile.posts;
    dialogRef.open();
  }
</script>
<style>
  .grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 12px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
		margin: 10px;
  }
  @media (min-width: 426px) {
		.grid-container {
			padding: 15px;
		}
	}
</style>

<Dialog bind:this={dialogRef} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile">
  {#if profile}
    <Title id="simple-title">
      <div class='grid-container'>
        <Name title={profile.title} />
        <Location address={profile.address} dist={profile.dist}/>
        <Phones phone={profile.phones[0]} username={profile.username}/>
      </div>
    </Title>
    <button class="close" on:click={dialogRef.close} />
    <Content id="simple-content" aria-label="Mapa">
      {#each profile.posts as post}
        <img src={post.mediaUrl} alt={profile.title} width="100" />
        {removeHashtags(post.caption)} <br />
      {/each}
    </Content>
  {/if}
</Dialog>
