<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: #f8f8f8;
		padding: 10px;
		margin: 0 auto;
		box-sizing: border-box;
	}
	@media (min-width: 426px) {
		main {
			padding: 15px;
		}
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
