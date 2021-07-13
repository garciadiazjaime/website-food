<script>
  export let latestPosts
</script>

<script context="module">
	export async function preload() {
		const response = await this.fetch('./data/latest-posts.json')
		const latestPosts = await response.json()

		return {
			latestPosts
		}
	}
</script>

<style>
	table {
		width: 100%;
    border-collapse: collapse;
	}

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th, td {
    border-bottom: 1px solid;
    text-align: center;
    padding: 6px;
  }

  .container {
    margin: 0 auto;
    overflow-x: scroll;
  }

  img {
    width: 400px;
    height: auto;
  }
</style>

<div class="container">
  <br />
  <h2>Latest Posts</h2>
  <table>
    <tr>
      <th>#</th>
      <th>User</th>
      <th>Followers</th>
      <th># Posts</th>
      <th>Image</th>
      <th>Caption</th>
      <th>Likes</th>
      <th>Comments</th>
      <th>Location</th>
      <th>Date</th>
    </tr>
    {#each latestPosts as post, index}
      <tr data-id={post.id}>
        <td><a href={post.permalink}>{index+1}</a></td>
        <td><a href={`https://www.instagram.com/${post.user.username}`}>{post.user.username}</a></td>
        <td>{post.user.followedBy}</td>
        <td>{post.user.postsCount}</td>
        <td>
          <img src={`/que-comer-en-tijuana/${post.user.username}-${post.id}.jpg`} alt="" />
        </td>
        <td>{post.caption}</td>
        <td>{post.likeCount}</td>
        <td>{post.commentsCount}</td>
        <td>
          {#if post.location && post.location.slug }
          <a href={`https://www.instagram.com/explore/locations/${post.location.id}`}>{post.location.slug}</a>
          {/if}
        </td>
        <td>{new Date(post.createdAt).toLocaleDateString()} <br /> {new Date(post.updatedAt).toLocaleDateString()}</td>
      </tr>
    {/each}
  </table>
</div>  
