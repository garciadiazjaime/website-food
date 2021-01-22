<script context="module">
  import { zonaCentro } from '../utils/mapboxAPIUtil';

	export async function preload(page, session) {
    const { category } = page.params;

		let response = await this.fetch(`./data/${category}.json`)
    const [options] = await response.json()

    response = await this.fetch('./seoCategories.json')
		const optionsForSEO = await response.json()

    const item = optionsForSEO.find(item => item.slug === category)

    const option = item ?  item.title : category

		return { title: item.fullTitle, options };
	}
</script>

<script>
  import Tile from '../components/Tile.svelte'
  export let title;
  export let options;

  function clickHandler(option) {
    window.open(`https://www.instagram.com/${option.username}/`, "_blank");
  }
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
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container">
  <h1>{title}</h1>

  <div class="grid">
    {#each options.data as option}
      <Tile place={option} />
    {/each}
  </div>
</div>
