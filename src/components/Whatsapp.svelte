<script>
	import { getWhatsapp } from '../utils/postUtil'
  export let post = [];
  export let text = '';
  let whatsapp = getWhatsapp(post.caption);
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
  @media (min-width: 768px) {
    .whatsapp-btn {
      display: none;
    }
  }
</style>
{#if whatsapp}
  <a class="whatsapp-btn" href={`https://wa.me/${whatsapp}${text ? `text=${text}` : '' }`} title="Enviar mensaje por Whatsapp" target="_blank">
    <img class="icon" src="/whatsapp.svg" alt="Enviar mensaje por Whatsapp" aria-hidden />
  </a>
{/if}
