<script context="module">
  import { zonaCentro } from '../utils/mapboxAPIUtil';

	export async function preload(page, session) {
    const lngLat = [zonaCentro.lng, zonaCentro.lat];
    const { category } = page.params;
    
    const filters = encodeURIComponent(JSON.stringify({ lngLat, first: 100, state: 'MAPPED', category }))

		const response = await this.fetch(`process.env.API_URL/feedme?filters=${filters}`)
    
    const options = await response.json()

		return { title: `Donde comer ${category} en Tijuana`, options };
	}
</script>

<script>
  export let title;
  export let options;
</script>

<style>
  .container {
    padding: 20px;
  }

  .card {
    padding: 6px 0;
    max-width: 400px;
    margin: 0 auto 20px;
    box-shadow: 2px 2px 6px 6px #c8c8c8;
  }

  h2 {
    margin: 0;
    padding: 0 6px 12px;
  }

  img {
    width: 100%;
    height: auto;
  }

  .keywords {
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

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container">
  <h1>{title}</h1>

  <div class="content">
    {#each options as option}
      <div class="card">
        <h2>{option.title}</h2>

        <img src={option.posts[0].mediaUrl} alt={option.title} />

        <div class="keywords">
          {#each option.keywords as keyword}
            <strong>{keyword}</strong>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
