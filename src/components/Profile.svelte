<script>
  import { onMount } from "svelte";
  	import { tick } from 'svelte';
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { profileId, profiles } from '../utils/stores';
  import './Profile.scss';
  let profileDialog;
  let profile = {};
  let posts = [];
  
  export async function openDialog() {
    profileDialog.open();
    await tick();
    profile = $profiles.find(profile => profile.id == $profileId);
    posts = profile.posts;
    console.log(profile);
  }
</script>

<Dialog bind:this={profileDialog} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile">
  <Title id="simple-title">{profile.title}</Title>
  <button class="close"on:click={() => profileDialog.close()} />
  <Content id="simple-content" aria-label="Mapa">
    {profile.dist}<br />
    <img src={profile.mediaUrl} alt={profile.title} width="100"/>
    {#each posts as post}
      {post.caption} <br />
    {/each}
  </Content>
</Dialog>
