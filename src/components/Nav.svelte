<script>
	import './Nav.scss';
	export let segment;
</script>

<nav>
	<ul>
		<li><img class="logo" src="feedmetj_logo.svg" alt="Feed me Tj" width="100"/></li>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>directorio</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='/about'>proyecto</a></li>
		<li><a aria-current='{segment === "map" ? "page" : undefined}' href='/map'>mapa</a></li>
		<li><a aria-current='{segment === "stats" ? "page" : undefined}' href='/stats'>datos</a></li>
	</ul>
</nav>
