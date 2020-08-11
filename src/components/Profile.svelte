<script>
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import './Profile.scss';
  let profileDialog;
  export let profile;

  const { title } = profile ? profile : {title: ''};

  export function openDialog() {
    profileDialog.open();
  }
</script>

<Dialog bind:this={profileDialog} aria-labelledby="simple-title" aria-describedby="simple-content" class="dialog profile">
  <Title id="simple-title">{title}</Title>
  <button class="close"on:click={() => profileDialog.close()} />
  <Content id="simple-content" aria-label="Mapa">
     Content
  </Content>
</Dialog>
