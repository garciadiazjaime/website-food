<script>
  export let whatsapp;
  export let text = '';
  
  function handleClick(event) {
    ga('send', 'event', 'card', 'whatsapp', post.user.username);
  }
</script>
<style>
  .icon {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .whatsapp-btn {
    position: absolute;
    top: 12px;
    right: 14px;
    width: 50px;
    height: 50px;
  }
</style>
{#if whatsapp}
  <a class="whatsapp-btn" on:click={handleClick} href={`https://wa.me/${whatsapp}${text ? `text=${text}` : '' }`} title="Enviar mensaje por Whatsapp" target="_blank">
    <img class="icon" src="/whatsapp.svg" alt="Enviar mensaje por Whatsapp" aria-hidden />
  </a>
{/if}
