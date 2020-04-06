<script>
  import Card, { Content, PrimaryAction, Media } from "@smui/card";
	import IconButton, { Icon } from "@smui/icon-button";

	import { onMount } from "svelte";
	import Phone from '../components/Phones.svelte';
	import ExpandButton from '../components/ExpandButton.svelte';

  let posts;

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
			post.shortCaption = `${post.caption.substring(0, 50)}`;
			post.collapsed = true;
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
  .caption {
		margin: 0 auto;
		font-size: 12px;
		line-height: 16px;
		word-break: break-all;
  }

	.grid-container {
		display: grid;
		grid-column-gap: 2%;
		grid-row-gap: 20px;
		width: 100%;
		grid-template-columns: 1fr;
	}
	.phone-grid {
		display: grid;
		grid-column-gap: 15px;
		grid-template-columns: 1fr 1fr;
		padding-bottom: 10px;
		border-bottom: 1px solid #dedede;
		margin-bottom: 20px;
	}

  @media (min-width: 426px) {
		.grid-container {
			grid-template-columns: 1fr 1fr;
		}
		.phone-grid {
			grid-template-columns: 100%;
		}
	}

	@media (min-width: 600px) {
		.phone-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 769px) {
		.grid-container {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	@media (min-width: 768px) {
		.grid-container {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	@media (min-width: 1024px) {
		.grid-container {
			grid-template-columns: 1fr 1fr 1fr 1fr;
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
          <Content>
            {#if post.phones}
              <div class="phone-grid">
                {#each post.phones as phone}
									<Phone phoneNumber={phone} />
                {/each}
              </div>
            {/if}
							<p class="caption" on:click={() => post.collapsed = !post.collapsed}>
								{#if post.collapsed}
									{post.shortCaption}
									{:else}
									{post.caption}
								{/if}
								<ExpandButton expand={post.collapsed} />
							</p>
						
          </Content>

        </PrimaryAction>
      </Card>
    {/each}
  {/if}
</div>
