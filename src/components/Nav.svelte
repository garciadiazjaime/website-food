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
		background-color: #FFF;
		color: #2A2F33;
		border-bottom: solid 2px #8C9491;
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
		color: #8C9491;
		border-bottom-color: #8C9491;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		border: solid 2px transparent;
	}

	li {
		padding: 0;
	}

	.logo {
		width: 100px;
	}

	svg {
		position: relative;
		top: 13px;
	}

	tspan {
		font-weight: 200;
		font-size: 20px;
	}

	@media (max-width: 420px) {
		svg {
			top: 10px;
		}
	}
</style>
<nav>
	<ul>
		<li class="logo">
			<svg viewBox="0 0 100 40">
				<g>
					<g transform="translate(16, 12)">
						<text fill="#5e616a">
							<tspan x="8" y="10">feedmetj</tspan>
						</text>
					</g>
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1"
						fill="#5e616a" id="svg_icon.primary" x="0" y="4" width="22" height="22">
						<g fill="#5e616a">
							<path
								d="M 7 5 L 7 12 C 7 13.644531 8.355469 15 10 15 L 10 27 L 12 27 L 12 15 C 13.644531 15 15 13.644531 15 12 L 15 5 L 13 5 L 13 12 C 13 12.566406 12.566406 13 12 13 L 12 5 L 10 5 L 10 13 C 9.433594 13 9 12.566406 9 12 L 9 5 Z M 19 5 L 19 27 L 21 27 L 21 19.625 L 25 17.625 L 25 10 C 25 7.25 22.75 5 20 5 Z M 21 7.40625 C 22.113281 7.84375 23 8.722656 23 10 L 23 16.375 L 21 17.375 Z "
								fill="#5e616a"></path>
						</g>
					</svg>
				</g>
			</svg>
		</li>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>qué comer</a></li>
		<li><a aria-current='{segment === "nosotros" ? "page" : undefined}' href='/nosotros'>nosotros</a></li>
		<li class="hide"><a aria-current='{segment === "map" ? "page" : undefined}' href='/map'>mapa</a></li>
		<li class="hide"><a href='/stats'>stats</a></li>
		<li class="hide"><a href='/rifa'>rifa</a></li>
		<li class="hide"><a href='/latest'>latest</a></li>
		<li class="hide"><a href='/miri.mendozaa'>miri.mendozaa</a></li>
		<li class="hide"><a href='/rifa/ganador/YW5heWFzNw=='>ganador</a></li>
	</ul>
</nav>
