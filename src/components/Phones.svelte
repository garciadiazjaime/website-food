<script>
  import { onMount } from 'svelte';
  import { getPhoneNumber } from '../utils/postUtil';
  import './Phones.scss';

  export let post;
  let phone;

  function handleClick(event) {
    ga('send', 'event', 'card', 'phone', post.user.username);
  }

  function getPhone() {
    if(post.meta && Array.isArray(post.meta.phones) && post.meta.phones.length){
      return post.meta.phones[0];  // default tab
    }

    return ''
  }

  $: phone = getPhone(post)
</script>

{#if phone}
  <a class="phone" href={`tel:${phone}`} on:click={handleClick} title={`Marcar ${phone}`}}>{getPhoneNumber(phone)}</a>
{/if}

