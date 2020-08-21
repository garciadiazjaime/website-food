<script>
  import { onMount } from "svelte";
  import { tick } from 'svelte';
  import Dialog, { Content } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Location from './Location.svelte';
  import Keywords from './Keywords.svelte';
  import Phones from './Phones.svelte';
  import Title from './Title.svelte';
  import LazyLoad from './LazyLoad.svelte';
  import './Profile.scss';
  import { removeHashtags } from '../utils/postUtil';
  let dialogRef;
  let profile;
  let posts;

  function closeHandler() {
    history.pushState(null, null, window.location.origin);
  }
  
  export function openProfile(currentProfile) {
    profile = currentProfile;
    posts = profile.posts;
    dialogRef.open();
  }
</script>
<style>
  .header {
    height: 23vh;
  }
  .grid-header {
    background: white;
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 0;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
    margin: 0 10px 10px 10px;
    grid-auto-flow: column;
  }
  .content {
    background-color: #f8f8f8;
    box-shadow: inset 0 4px 9px -7px rgba(0,0,0,0.2);
    overflow-y: scroll;
    height: 77vh;
  }
  .grid-posts {
    display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
  }
  .post {
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
    .header {
      height: 17vh;
    }
    .content {
      height: 83vh;
    }
		.grid-header {
      margin-right: 60px;
    }
    .phone-container {
      margin-top: 12px;
    }
	}
</style>

<Dialog bind:this={dialogRef} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile" on:MDCDialog:closed={closeHandler}>
  {#if profile}
    <div class="header">
      <div class='grid-header'>
        <div>
          <Title title={profile.title} />
          <Keywords keywords={profile.keywords} />
          <Location address={profile.address} dist={profile.dist}/>
        </div>
        <div class="phone-container">
          <Phones phone={profile.phones[0]} username={profile.username}/>
        </div>
      </div>
      <button class="close" on:click={dialogRef.close} />
    </div>
    <div class="content">
      <Content id="simple-content" aria-label="Mapa">
        <div class="grid-posts">
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
        </div>
      </Content>
    </div>
  {/if}
</Dialog>
