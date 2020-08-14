<script>
  import { onMount } from "svelte";
  import { tick } from 'svelte';
  import Dialog, { Title, Content } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Location from './Location.svelte';
  import Keywords from './Keywords.svelte';
  import Phones from './Phones.svelte';
  import Name from './Title.svelte';
  import LazyLoad from './LazyLoad.svelte';
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
    background: white;
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 0;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
		margin: 10px;
  }
  .content {
    background-color: #f8f8f8;
    box-shadow: inset 0 4px 9px -7px rgba(0,0,0,0.2);
  }
  .post {
    margin: 25px 0 0;
    padding-bottom: 15px;
    border-bottom: solid 1px #f0f0f0;
  }
  .post:first-child {
    margin-top: 0;
  }
  .caption {
    margin-top: 20px;
  }
  @media (min-width: 426px) {
		.grid-container {
			padding: 15px;
		}
	}
</style>

<Dialog bind:this={dialogRef} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile">
  {#if profile}
    <div class='grid-container'>
      <Name title={profile.title} />
      <Keywords keywords={profile.keywords} />
      <Location address={profile.address} dist={profile.dist}/>
      <Phones phone={profile.phones[0]} username={profile.username}/>
    </div>
    <button class="close" on:click={dialogRef.close} />
    <div class="content">
      <Content id="simple-content" aria-label="Mapa">
        {#each profile.posts as post}
          {#if post.mediaUrl}
            <div class="post">
              <LazyLoad dataSrc={post.mediaUrl} />
              <div class="caption">
                {removeHashtags(post.caption)}
              </div>
            </div>
            {/if}
        {/each}
      </Content>
    </div>
  {/if}
</Dialog>
