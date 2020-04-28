<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition';

	import Card from '../components/Card.svelte';
	import { getPosts } from '../utils/mintAPIUtil'

	let posts;
	const initialImagesToLoad = 2;

  onMount(async () => {
		posts = await getPosts();
	});
</script>

<style>
	.grid-container {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
	}
</style>

<svelte:head>
  <title>Frescomer | What's coooking in Tj</title>
</svelte:head>

<div class="grid-container">
  {#if posts}
    {#each posts as post, index}
			<Card post={post} lazy={index > initialImagesToLoad} />
    {/each}
  {/if}
</div>
