<script>
  import Card, { Content, PrimaryAction, Media } from "@smui/card";
  import IconButton, { Icon } from "@smui/icon-button";

	import { onMount } from "svelte";
	import Phone from '../components/Phones.svelte';

  let posts;

  const getPhone = caption =>
    caption.match(
      /\d?\d?[\s-]?(\(?(\d{3})\)?)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g
    );

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

    const result = await fetch(
      `http://api.mintitmedia.com/instagram/graphiql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const {
      data: { posts }
    } = await result.json();

    return posts;
  }

  onMount(async () => {
		const data = await getPosts();
    data.map(post => {
      post.phones = post.caption.match(
        /\d?\d?[\s-]?(\(?(\d{3})\)?)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g
			);
			post.shortCaption = `${post.caption.substring(0, 150)} ...`;
    });

    posts = data;
  });

  function getType(type) {
    if (type === "CAROUSEL_ALBUM") {
      return "Album";
    }

    return "Image";
  }

  function getImageURL(post) {
    if (post.mediaType === "IMAGE") {
      return post.mediaUrl;
    }

    if (Array.isArray(post.children) && post.children.length) {
      return post.children[0].media_url;
    }

    return "/default.png";
  }

  function doAction(action) {
    console.log("You did an action: " + action);
  }

  export { posts };
</script>

<style>
  h1,
  figure,
  p {
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
		/* margin: 1em auto; */
		margin: 0;
  }

	.grid-container {
		display: grid;
		grid-column-gap: 2%;
		grid-row-gap: 20px;
		width: 100%;
		grid-template-columns: 1fr;
		background: pink;
	}

  @media (min-width: 426px) {
		.grid-container {
			grid-template-columns: 1fr 1fr;
		}
	}

</style>

<svelte:head>
  <title>...</title>
</svelte:head>
<div class="grid-container">
  {#if posts}
    {#each posts as post}
      <Card>
        <PrimaryAction on:click={() => doAction('openItemPage')}>

          <Media
            style="background-image: url({getImageURL(post)});"
            aspectRatio="16x9" />
          <Content class="mdc-typography--body2">
            {#if post.phones}
              <div>
                {#each post.phones as phone}
									<Phone phoneNumber={phone} />
                {/each}
              </div>
            {/if}
						
            	<!-- {post.shortCaption} -->
							This is a long sentece, I'm trying to figure out why this div is breaking my alignment, hopefully this is long enough.
						
          </Content>

        </PrimaryAction>
      </Card>
    {/each}
  {/if}
</div>
