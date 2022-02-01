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
		color: #8C9491;
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
		color: white;
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

	.header {
		background-color: #000;
	}
	
	.logo {
		text-align: center;
		color: white;
		font-size: 40px;
		padding: 20px 0 0;
	}

	.content {
		max-width: 960px;
		margin: 0 auto;
	}
</style>

<div class="header">
	<div class="content">
		<div class="logo">
			feedmetj
		</div>
		<nav>
			<ul>
				<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>qué comer</a></li>
			</ul>
		</nav>
	</div>
</div>
