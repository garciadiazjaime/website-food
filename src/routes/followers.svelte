<script>
  export let followers
  let page = 1
  let itemsPerPage = 20
  const items = [...followers.slice(0, page * itemsPerPage)]
</script>

<script context="module">
	export async function preload() {
		const response = await this.fetch('./data/followers.json')
		const followers = await response.json()

		return {
			followers
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
</style>

<div class="container">
  <br />
  <h2>Followers</h2>
  <table>
    <tr>
      <th>#</th>
      <th>User</th>
      <th>Biography</th>
      <th>category_name</th>
      <th>posts</th>
      <th>followers</th>
      <th>following</th>
      <th>is_business</th>
      <th>is_professional</th>
      <th>is_verified</th>
    </tr>
    {#each items as follower, index}
      <tr data-id={follower.id}>
        <td>{index+1}</td>
        <td>
          <a href={`https://www.instagram.com/${follower.username}`} target="_blank">{follower.username}</a>
          <br />
          {follower.fullName}
        </td>
        <td>{follower.biography || ''}</td>
        <td>{follower.category_name || ''}</td>
        <td>{follower.posts}</td>
        <td>{follower.followers}</td>
        <td>{follower.following}</td>
        <td>{follower.is_business_account}</td>
        <td>{follower.is_professional_accountis_professional_account}</td>
        <td>{follower.is_verified}</td>
      </tr>
    {/each}
  </table>
</div>  
