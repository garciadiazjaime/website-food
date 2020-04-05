<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: white;
		padding: .5em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	@media (min-width: 426px) {
		main {
			padding: 20px;
		}
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>