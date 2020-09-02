<script>
  import { onMount } from "svelte";
  import { tick } from 'svelte';
  import Dialog, { Content } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
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
    min-height: 105px;
    background: white;
    padding: 0 40px 0 10px;
  }

  .content {
    background-color: #f8f8f8;
    box-shadow: inset 0 4px 9px -7px rgba(0,0,0,0.2);
    overflow-y: scroll;
    height: calc(100vh - 105px);
  }
  .grid-posts {
    display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
  }
  .post {
    padding-bottom: 15px;
    border-bottom: solid 1px #d8d8d8;
  }
  .post:first-child {
    margin-top: 0;
  }
  .caption {
    margin-top: 20px;
  }

  @media (min-width: 600px) {
    .header {
      min-height: 63px;
    }
    .content{
      height: 90vh;
      height: calc(100vh - 63px);
    }
    .header-element {
      display: inline-block;
      width: 50%;
    }
    .grid-posts {
      grid-template-columns: repeat( auto-fit, minmax(1fr, 247px) );
    }
  }
  @media (min-width: 769px) {
    .header-element {
      width: 40%;
    }
    .header-element:first-child {
      width: 60%;
    }
  }
</style>

<Dialog bind:this={dialogRef} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile" on:MDCDialog:closed={closeHandler}>
  {#if profile}
    <div class="header">
      <div class="header-element">
        <Title title={profile.title} />
      </div><div class="header-element">
        <Phones phone={profile.phones[0]} username={profile.username}/>
      </div>
      <button class="close" on:click={dialogRef.close} />
    </div>
    <div class="content">
      <Content id="simple-content" aria-label="Posts">
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
