<script context="module">
  import { zonaCentro } from '../utils/mapboxAPIUtil';

	export async function preload(page, session) {
    const { category } = page.params;

		let response = await this.fetch(`./data/${category}.json`)
    const options = await response.json()

    response = await this.fetch('./seoCategories.json')
		const optionsForSEO = await response.json()

    const item = optionsForSEO.find(item => item.slug === category)

    const option = item ?  item.title : category

		return { title: `Donde comer ${option} en Tijuana`, options };
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

  .grid {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }

  @media screen and (min-width: 992px) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(24%, 1fr));
    }
  }

  .card {
    padding: 6px 0;
    box-shadow: 2px 2px 6px 6px #c8c8c8;
    width: 100%;
  }

  h2 {
    margin: 0;
    padding: 0 6px 12px;
  }

  img {
    height: 180px;
    min-height: 180px;
    width: 100%;
    object-fit: cover;
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

  <div class="grid">
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
