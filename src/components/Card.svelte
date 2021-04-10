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
  export let delivery;
  export let topics = [];

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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

   strong {	
    font-weight: normal;	
    display: inline-block;	
  }

  strong::after {	
    content: '|';	
    display: inline-block;	
    padding: 0 6px;	
  }	
  strong:last-of-type::after {	
    content: '';	
  }
</style>

<div class="card" data-id={id}>
  <h3><a href={`https://www.instagram.com/${username}/`} target="_blank" rel="nofollow noreferrer" title={`que comer en Tijuana? ${title || username}`}>{title || username}</a></h3>

  <img src={imgUrl} alt={`que comer en Tijuana: ${category}`} title={`que comer en Tijuana: ${category}`} width="640px" height="640px" use:lazyLoad />

  <div class="container">
    {#if description}
    <p class="description">
      {description}
    </p>
    {/if}

    {#each topics as topic}
      <strong>{topic}</strong>
    {/each}

    {#if address}
    <p class="address">
      {#if gps && gps.length }
        <a href={`https://www.google.com/maps/place/${gps[1]},${gps[0]}`} title={`donde comer: ${category} en Tijuana`} target="_blank" rel="nofollow noreferrer">{address}</a>
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
      <a href={`tel:${phone}`} title={`pedir comida: ${title}`} rel="nofollow noreferrer">Llamar por teléfono</a>
    </p>
    {/if}
  </div>
</div>
