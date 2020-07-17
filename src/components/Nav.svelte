<script>
	import './Nav.scss';
	export let segment;
</script>

<style>
	.hide {
		display: none;
	}
</style>
<nav>
	<ul>
		<li><img class="logo" src="fmt_icon.svg" alt="Feed me Tj" height="40"/></li>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>directorio</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='/about'>proyecto</a></li>
		<li class="hide"><a aria-current='{segment === "map" ? "page" : undefined}' href='/map'>mapa</a></li>
		<li class="hide"><a aria-current='{segment === "stats" ? "page" : undefined}' href='/stats'>datos</a></li>
	</ul>
</nav>
