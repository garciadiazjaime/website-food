<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: #f8f8f8;
		margin: 0 auto;
		box-sizing: border-box;
		height: auto;
	}
</style>

<Nav {segment} />
<main>
	<slot></slot>
</main>
