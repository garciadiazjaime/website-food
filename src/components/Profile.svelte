<script>
  import { onMount } from "svelte";
  import { tick } from 'svelte';
  import Dialog, { Title, Content } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Location from './Location.svelte';
  import Phones from './Phones.svelte';
  import Name from './Title.svelte';
  import './Profile.scss';
  let profileDialog;
  let profile;
  let posts = [];
  
  export function openDialog(currentProfile) {
    profile = currentProfile;
    profileDialog.open();
  }
</script>

<Dialog bind:this={profileDialog} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile">
  {#if profile}
    <Title id="simple-title">
      <Name title={profile.title} />
      <Location address={profile.address} dist={profile.dist}/>
      {profile.dist}<br />
      {profile.address}<br />
      {profile.phones}
    </Title>
    <button class="close"on:click={() => profileDialog.close()} />
    <Content id="simple-content" aria-label="Mapa">
      <img src={profile.mediaUrl} alt={profile.title} width="100" />
      {#each profile.posts as post}
        {post.caption} <br />
      {/each}
    </Content>
  {/if}
</Dialog>
