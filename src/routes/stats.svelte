<script>
  export let postsByDay
  export let postsByUser
  export let hashtags
  export let locations
  export let topics
  export let labels
</script>

<script context="module">
	export async function preload() {
		let response = await this.fetch('./data/posts_by_day.json')
		const postsByDay = await response.json()

		response = await this.fetch('./data/posts_by_user.json')
		const postsByUser = await response.json()

    response = await this.fetch('./data/hashtags.json')
		const hashtags = await response.json()

    response = await this.fetch('./data/locations.json')
		const locations = await response.json()

    response = await this.fetch('./data/topics.json')
		const topics = await response.json()

    response = await this.fetch('./data/labels.json')
		const labels = await response.json()

		return {
			postsByDay,
			postsByUser,
      hashtags,
      locations,
      topics,
      labels,
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
    overflow-x: scroll;
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
      <th>#</th>
      <th>Fecha</th>
      <th>Total</th>
    </tr>
    {#each postsByDay as post, index}
      <tr>
        <td>{index+1}</td>
        <td>{new Date(post._id).toDateString()}</td>
        <td>{post.count}</td>
      </tr>
    {/each}
  </table>

  <br />

  <h2>Posts publicados por usuario</h2>
  <table>
    <tr>
      <th>#</th>
      <th>Fecha</th>
      <th>Total</th>
      <th>Followers</th>
      <th>Posts</th>
    </tr>
    {#each postsByUser as post, index}
      <tr>
        <td>{index+1}</td>
        <td>{post._id}</td>
        <td>{post.count}</td>
        <td>{post.followedBy}</td>
        <td>{post.postsCount}</td>
      </tr>
    {/each}
  </table>

  <br />

  <h2>Hashtags más usados</h2>
  <table>
    <tr>
      <th>#</th>
      <th>Hashtag</th>
      <th>Total</th>
    </tr>
    {#each hashtags as hashtag, index}
      <tr>
        <td>{index+1}</td>
        <td>{hashtag[0]}</td>
        <td>{hashtag[1]}</td>
      </tr>
    {/each}
  </table>

  <br />

  <h2>Ubicaciones más usadas</h2>
  <table>
    <tr>
      <th>#</th>
      <th>Ubicación</th>
      <th>Total</th>
    </tr>
    {#each locations as location, index}
      <tr>
        <td>{index+1}</td>
        <td>{location.name}</td>
        <td>{location.count}</td>
      </tr>
    {/each}
  </table>

  <br />

  <h2>Topics más usados</h2>
  <table>
    <tr>
      <th>#</th>
      <th>Topic</th>
      <th>Total</th>
    </tr>
    {#each topics as topic, index}
      <tr>
        <td>{index+1}</td>
        <td>{topic[0]}</td>
        <td>{topic[1]}</td>
      </tr>
    {/each}
  </table>

  <br />
  <h2>Labels más usados</h2>
  <table>
    <tr>
      <th>#</th>
      <th>Label</th>
      <th>Total</th>
    </tr>
    {#each labels as label, index}
      <tr>
        <td>{index+1}</td>
        <td>{label[0]}</td>
        <td>{label[1]}</td>
      </tr>
    {/each}
  </table>
</div>  
