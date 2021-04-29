<script context="module">
	export async function preload(page) {
    const { category } = page.params;

		let response = await this.fetch(`./data/${category}.json`)
    const [{ posts }] = await response.json()

    response = await this.fetch('./seoCategories.json')
		const postForSEO = await response.json()

    const item = postForSEO.find(item => item.slug === category)

		return { title: item.fullTitle, category, posts };
	}
</script>

<script>
  import Card from '../components/Card.svelte'
  export let title;
  export let posts;
  export let category
</script>

<style>
  .grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 12px;
		grid-template-columns: repeat( auto-fit, minmax(100%, 1fr) );
		margin: 10px;
		padding: 15px;
	}

	h1 {
		margin-bottom: 20px;
		color: #2A2F33;
	}

	@media (min-width: 600px) {
		.grid-container {
			grid-template-columns: repeat( auto-fit, minmax(48%, 1fr) );
		}
	}

	@media (min-width: 900px) {
		.grid-container {
			grid-template-columns: repeat( auto-fit, minmax(30%, 1fr) );
		}
	}

	@media (min-width: 1200px) {
		.grid-container {
			grid-template-columns: repeat( auto-fit, minmax(23%, 1fr) );
		}
	}

	.container {
		color: #2A2F33;
		font-size: 20px;
		padding: 15px 15px 0;
		margin: 0 10px;
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container">
  <h1>{title}</h1>
  <div class="grid-container">
    {#each posts as post}
      <Card
        id={post.id}
        username={post.username}
        title={post.title}
        mediaUrl={post.mediaUrl}
        address={post.address}
        gps={post.gps}
        phone={post.phone}
        category={category}
        description={post.description}
        date={post.date}
      />
    {/each}
  </div>
</div>
