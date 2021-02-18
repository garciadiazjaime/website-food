<script>
  export let id;
  export let username;
	export let title;
	export let mediaUrl;
  export let address;
  export let gps;
  export let phone;
  export let category;
  export let description;

  let imgUrl = ''

  let observer = null

  if (process.browser) {
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  function onIntersect(entries) {
    if (!imgUrl && entries[0].isIntersecting) {
      imgUrl = mediaUrl
    }
  }


  function lazyLoad(node) {
    observer && observer.observe(node);
    return {
      destroy() {
        observer && observer.unobserve(node)
      }
    }
  }
</script>

<style>
  .card {
    padding: 6px 0;
    box-shadow: 2px 2px 6px 6px #c8c8c8;
    width: 100%;
  }

  h3 {
    margin: 0;
    padding: 0 6px 12px;
  }

  img {
    height: 180px;
    min-height: 180px;
    width: 100%;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }

  .description {
    word-break: break-word;
  }
</style>

<div class="card" data-id={id}>
  <h3><a href={`https://www.instagram.com/${username}/`} target="_blank" rel="nofollow noreferrer" title={`donde comer ${category}: ${title || username}`}>{title || username}</a></h3>

  <img src={imgUrl} alt={`donde comer ${category} en Tijuana`} use:lazyLoad />

  {#if phone}
  <p>
    <a href={`tel:${phone}`} title={`pedir comida de: ${title}`} rel="nofollow noreferrer">{phone}</a>
  </p>
  {/if}

  {#if description}
  <p class="description">
    {description}
  </p>
  {/if}

  {#if address}
  <p class="address">
    {#if gps && gps.length }
      <a href={`https://www.google.com/maps/place/${gps[1]},${gps[0]}`} title={`donde comer: ${category}`} target="_blank" rel="nofollow noreferrer">{address}</a>
    {:else}
      {address || ''}
    {/if}
  </p>
  {/if}
</div>
