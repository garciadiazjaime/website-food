<script>
  import Card, { Content, PrimaryAction, Media } from "@smui/card";
	import IconButton, { Icon } from "@smui/icon-button";

	import { onMount } from "svelte";
	import Phone from '../components/Phones.svelte';
	import ExpandButton from '../components/ExpandButton.svelte';

  let brands;

  function getPlacesQuery() {
    return `
			{
				users {
					_id
					id
					username
					fullName
					profilePicture
					post {
						commentsCount
						permalink
						mediaType
						mediaUrl
						caption
						likeCount
						children {
							media_type
							media_url
							caption
						}
					}
					location {
						name
						slug
						address {
							_id
							street
							zipCode
							city
							country
						}
						latitude
						longitude
					}
				}
			}
		`;
  }

  async function getBrands() {
    const payload = {
      query: getPlacesQuery()
    };


		const apiUrl = 'http://api.mintitmedia.com'
    const result = await fetch(
      `${apiUrl}/instagram/graphiql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const {
      data: { users }
		} = await result.json();

    return users;
	}

	function cleanPhoneNumber(phone) {
		let n = phone.replace(/[()\s-]/g,"");
		let areaCode = '';
		if(n.length >= 10) {
		areaCode = `(${n.substr(n.length -10, 3)})`;
		}
		const first3 = n.substr(n.length - 7, 3);
		const last4 = n.substr(n.length - 4, 4);
		n = `${areaCode}${first3}-${last4}`;
		return n;
	}

  onMount(async () => {
		const data = await getBrands();
    data.map(item => {
			if (!item.post) {
				return
			}

			item.phones = [];
      const phones = item.post.caption.match(
        /\d?\d?[\s-]?(\(?(\d{3})\)?)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g
			);
			if(phones) {
				phones.map(phone => item.phones.push(cleanPhoneNumber(phone)));
			}
			item.post.shortCaption = `${item.post.caption.substring(0, 50)}`;
			item.collapsed = true;
    });

    brands = data;
  });

  function getType(type) {
    if (type === "CAROUSEL_ALBUM") {
      return "Album";
    }

    return "Image";
  }

  function getImageURL(item) {
		if (!item.post) {
			return
		}

    if (item.post.mediaType === "IMAGE") {
      return item.post.mediaUrl;
    }

    if (Array.isArray(item.post.children) && item.post.children.length) {
      return item.post.children[0].media_url;
    }

    return "/default.png";
  }

  function doAction(action) {
    console.log("You did an action: " + action);
	}
  export { brands };
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
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		grid-template-columns: repeat( auto-fit, minmax(247px, 1fr) );
	}
	.phone-grid {
		display: grid;
		grid-column-gap: 5px;
		grid-template-columns: repeat( auto-fit, 105px );
		padding-bottom: 10px;
		border-bottom: 1px solid #dedede;
		margin-bottom: 20px;
	}

</style>

<svelte:head>
  <title>...</title>
</svelte:head>
<div class="grid-container">
  {#if brands}
    {#each brands as item}
			{#if item.post}
				<Card>
					<PrimaryAction on:click={() => doAction('openItemPage')}>

						<Media
							style="background-image: url({getImageURL(item)});"
							aspectRatio="16x9" />
						<Content>
							{#if item.phones}
								<div class="phone-grid">
									{#each item.phones as phone}
										<Phone phoneNumber={phone} />
									{/each}
								</div>
							{/if}
								<p class="caption" on:click={() => item.collapsed = !item.collapsed}>
									{#if item.collapsed}
										{item.post.shortCaption}
										{:else}
										{item.post.caption}
									{/if}
									{#if item.post.caption.length > 50}
										<ExpandButton expand={item.collapsed} />
									{/if}
								</p>
							
						</Content>

					</PrimaryAction>
				</Card>
			{/if}
    {/each}
  {/if}
</div>
