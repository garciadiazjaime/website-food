<script>
	import Lazy from 'svelte-lazy';

	export let index
	export let link
	export let title
	export let subtitle
	export let image
	export let description
	export let address
	export let phone
	export let gmaps

	function outsideLinkClickHandler(link) {
		window.open(link, '_blank')
	}
</script>

<style>
	img {
		height: 454px;
		width: 100%;
		object-fit: cover;
	}

	h2, p {
		padding: 0 12px;
		margin-bottom: 0;
	}

	strong {
		font-weight: normal;
		padding: 0 12px;
	}

	p {
		word-break: break-word;
	}

	small {
		height: 24px;
		width: 24px;
		background-color: #45cbb2;
		color: white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		font-weight: bold;
		margin-left: 12px;
	}

	ul {
		list-style-type: none;
		padding: 0 0 0 12px;
	}
	
	li {
		color: #666;
		font-size: 0.8em;
	}

	.pointer {
		cursor: pointer;
	}
	.pointer:hover {
		text-decoration: underline;
	}
</style>

<small>{index}</small>
<h2 on:click={() => outsideLinkClickHandler(link)} class="pointer">
  {title}
</h2>
<strong>{subtitle}</strong>
<Lazy height={300}>
  <img src={image} alt={title}>
</Lazy>

<p>{description}</p>
<ul>
	<li on:click={() => outsideLinkClickHandler(gmaps)} class="pointer">
		{address}
	</li>
	<li>{phone}</li>
</ul>
