<script>
  import { onMount } from 'svelte';
  import { getPhoneNumber } from '../utils/postUtil';

  export let post;
  let phone;

  function handleClick(event) {
    ga('send', 'event', 'phone', 'click', post.user.username, post.id);
  }

  function getPhone() {
    if(post.meta && Array.isArray(post.meta.phones) && post.meta.phones.length){
      return post.meta.phones[0];  // default tab
    }

    return ''
  }

  $: phone = getPhone(post)
</script>

<style>
	a.cta {
    background-color: #ff5926;
    display: block;
    border-radius: 4px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    color: white;
    font-size: 18px;
    font-weight: 500;
    line-height: 1;
    padding: 12px 0;
    text-align: center;
    text-decoration: none;
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
  }
  a.cta:hover {
    color: #fff;
  }
  img {
    width: 18px;
    height: 18px;
  }
</style>

{#if phone}
  <a class="cta" href={`tel:${phone}`} on:click={handleClick} title={`Call number ${phone}`}}>{getPhoneNumber(phone)}</a>
{/if}

