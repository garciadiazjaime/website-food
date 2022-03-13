<script>
	import Lazy from 'svelte-lazy';

	export let index
  export let link
  export let title
  export let subtitle
  export let image
  export let description
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

	a {
		text-decoration: none;
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
</style>

<small>{index}</small>
<h2>
  <a href={link}
    rel="nofollow noreferrer"
    target="_blank">{title}</a>
</h2>
<strong>{subtitle}</strong>
<Lazy height={300}>
  <img src={image} alt={title}>
</Lazy>

<p>{description}</p>
