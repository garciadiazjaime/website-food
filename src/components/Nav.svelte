<script>
	export let segment;
</script>

<style>
	.hide {
		display: none;
	}
	nav {
		font-weight: 300;
		padding: 0 1em;
		background: white;
		color: #313d69;
		border-bottom: solid 2px #bd471d;
	}
	ul {
		margin: 0;
		padding: 0;
	}

	ul:after {
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
		color: #bd471d;
		border-bottom-color: #bd471d;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		border: solid 2px transparent;
	}

	.logo {
		margin: 5px 5px 0 0;
	}

	@media (min-width: 375px) {
		.logo {
				margin-right: 10px;
		}
	}
</style>
<nav>
	<ul>
		<li><img class="logo" src="fmt_icon.svg" alt="Feed me Tj" height="40px" width="48px"/></li>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>comida</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='/about'>proyecto</a></li>
		<li class="hide"><a aria-current='{segment === "map" ? "page" : undefined}' href='/map'>mapa</a></li>
		<li class="hide"><a aria-current='{segment === "stats" ? "page" : undefined}' href='/stats'>datos</a></li>
	</ul>
</nav>
