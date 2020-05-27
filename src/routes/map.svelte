<script>
	import { onMount } from "svelte";

	import Map from '../components/Map.svelte';
	import MapMarker from '../components/MapMarker.svelte';
	import { getPosts } from '../utils/mintAPIUtil'
	import { getTitle } from '../utils/postUtil'

	let posts;

  onMount(async () => {
		posts = await getPosts();
	});
</script>

<style>
	section {
		width: 100%;
		height: 600px;
	}
</style>

<section>
	{#if posts}
		<Map lat={32.49674} lon={-117.0178467} zoom={11}>
			{#each posts as post }
				{#if post.location && post.location.location && post.location.location.coordinates }
					<MapMarker lat={post.location.location.coordinates[1]} lon={post.location.location.coordinates[0]} label={getTitle(post)} />
				{/if}
			{/each}
		</Map>
	{/if}
</section>
