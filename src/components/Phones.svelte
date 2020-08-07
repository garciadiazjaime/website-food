<script>
  import { onMount } from 'svelte';
  import { formatPhoneNumber } from '../utils/postUtil';
  import './Phones.scss';

  export let phone;
  export let username;

  function handleClick(event) {
    ga('send', 'event', 'card', 'phone', username);
  }

</script>

{#if phone}
  <a class="phone" href={`tel:${phone}`} on:click={handleClick} title={`Marcar ${phone}`}}>{formatPhoneNumber(phone)}</a>
{/if}

