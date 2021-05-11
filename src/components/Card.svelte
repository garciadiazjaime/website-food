<script>
  export let id;
  export let username;
	export let title;
  export let address;
  export let gps;
  export let phone;
  export let category;
  export let delivery;

  let imgUrl = ''

  let observer = null

  if (process.browser) {
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  function onIntersect(entries) {
    if (!imgUrl && entries[0].isIntersecting) {
      imgUrl = `/que-comer-en-tijuana/${username}-${id}.jpg`
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
    box-shadow: 1px 1px 2px 2px #8C8C9C;
    width: 100%;
  }

  h3 {
    margin: 0;
    padding: 0 6px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h3 a {
    text-transform: lowercase;
  }

  img {
    height: auto;
    width: 100%;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }

  .container {
    word-break: break-word;
    padding: 0 6px;
  }
</style>

<div class="card" data-id={id}>
  <h3><a href={`https://www.instagram.com/${username}/`} target="_blank" rel="nofollow noreferrer" title={`que comer en tijuana: ${title || username}`}>{title || username}</a></h3>

  <img src={imgUrl} alt={`que comer en tijuana: ${category}`} title={`que comer en tijuana: ${category}`} width="640px" height="640px" use:lazyLoad />

  <div class="container">
    {#if address}
    <p class="address">
      {#if gps && gps.length }
        <a href={`https://www.google.com/maps/place/${gps[1]},${gps[0]}`} title={`que comer en tijuana: ${category}`} target="_blank" rel="nofollow noreferrer">{address}</a>
      {:else}
        {address || ''}
      {/if}
    </p>
    {/if}

    {#if delivery}
    <p>
      Servicio a domicilio!
    </p>
    {/if}

    {#if phone}
    <p>
      <a href={`tel:${phone}`} title={`que comer en tijuana: ${title}`} rel="nofollow noreferrer">Llamar por teléfono</a>
    </p>
    {/if}
  </div>
</div>
