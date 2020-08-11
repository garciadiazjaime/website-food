<script>
  import { onMount } from "svelte";
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { profileId, profiles } from '../utils/stores';
  import './Profile.scss';
  let profileDialog;
  let profile;
  
  //const { title } = profiles.find(profile => profile.id == $profileId);
  
  export function openDialog() {
    profileDialog.open();
    console.log($profiles);
  }
</script>

<Dialog bind:this={profileDialog} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile">
  <Title id="simple-title">{profile.title}</Title>
  <button class="close"on:click={() => profileDialog.close()} />
  <Content id="simple-content" aria-label="Mapa">
     Content
  </Content>
</Dialog>
