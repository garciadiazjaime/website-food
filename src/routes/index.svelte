<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>...</title>
</svelte:head>

{#if posts }
	{#each posts as post}
	<Card style="width: 360px;">
		<PrimaryAction on:click={() => doAction('openItemPage')}>
			
			<Media style="background-image: url({getImageURL(post)});" aspectRatio="16x9">
			</Media>
			<Content class="mdc-typography--body2">
				{post.caption}
			</Content>

		</PrimaryAction>
	</Card>
	{/each}
{/if}

<script>
	import Card, { Content, PrimaryAction, Media } from '@smui/card';
  import IconButton, {Icon} from '@smui/icon-button';
	
	import { onMount } from 'svelte';

	let posts

	function getPlacesQuery() {
		return `
				query Post {
					posts {
						_id
						commentsCount
						permalink
						mediaType
						mediaUrl
						caption
						id
						likeCount
						children {
							id
							media_type
							media_url
							caption
						}
						city
						source
						state
						createdAt
						updatedAt
					}
				}
			`;
	}

	async function getPosts() {
		const payload = {
			query: getPlacesQuery()
		};

		const result = await fetch(`http://api.mintitmedia.com/instagram/graphiql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const {
			data: { posts }
		} = await result.json();

		return posts;
	}

	onMount(async () => {
		const data = await getPosts()

		posts = data
	});

	function getType(type) {
		if (type === 'CAROUSEL_ALBUM') {
			return "Album"
		}

		return "Image"
	}

	function getImageURL(post) {
		if (post.mediaType === 'IMAGE') {
			return post.mediaUrl
		}

		if (Array.isArray(post.children) && post.children.length) {
			return post.children[0].media_url
		}

		return "/default.png"
	}

	function doAction(action) {
    console.log('You did an action: '+action);
  }

	export { posts };
</script>
