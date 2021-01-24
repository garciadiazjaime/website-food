<script context="module">
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
  import Card from '../components/Card.svelte'
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
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container">
  <h1>{title}</h1>

  <div class="grid">
    {#each options.data as option}
      <Card {...option} />
    {/each}
  </div>
</div>
