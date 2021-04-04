<script>
  export let postsByDay
  export let postsByUser
  
</script>

<script context="module">
	export async function preload() {
		let response = await this.fetch('./data/posts_by_day.json')
		const postsByDay = await response.json()

		response = await this.fetch('./data/posts_by_user.json')
		const postsByUser = await response.json()

		return {
			postsByDay,
			postsByUser,
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
    max-width: 800px;
    margin: 0 auto;
  }
</style>

<svelte:head>
  <script defer src="https://d3js.org/d3.v5.min.js"></script>
</svelte:head>

<div class="container">
  <br />
  <h2>Posts publicados por día</h2>
  <table>
    <tr>
      <th>Fecha</th>
      <th>#</th>
    </tr>
    {#each postsByDay as post, index}
      <tr>
        <td>{post._id}</td>
        <td>{post.count}</td>
      </tr>
    {/each}
  </table>

  <br />

  <h2>Posts publicados por usuario</h2>
  <table>
    <tr>
      <th>Fecha</th>
      <th>#</th>
      <th>Followers</th>
      <th>Posts</th>
    </tr>
    {#each postsByUser as post, index}
      <tr>
        <td>{post._id}</td>
        <td>{post.count}</td>
        <td>{post.followedBy}</td>
        <td>{post.postsCount}</td>
      </tr>
    {/each}
  </table>
</div>  
