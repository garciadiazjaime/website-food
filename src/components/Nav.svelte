<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	.logo {
		background: url('frescomer_icon_lg.png');
		display: inline-block;
		background-size: cover;
		width: 40px;
		height: 40px;
		margin: 5px 0;
	}
	@media (min-width: 450px) {
		.logo {
			background-image: url('frescomer_logo.png');
			height:45px;
			margin: 4px 0 0;
			width: 136px;
		}
	}
</style>

<nav>
	<ul>
		<li><div class="logo"></div></li>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>directorio</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='/about'>proyecto</a></li>
		<li><a aria-current='{segment === "map" ? "page" : undefined}' href='/map'>mapa</a></li>
		<li><a aria-current='{segment === "stats" ? "page" : undefined}' href='/stats'>datos</a></li>
	</ul>
</nav>
