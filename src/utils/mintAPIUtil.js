const stubPosts = require('../../stubs/getPosts')

function getPostsQuery() {
  return `
    {
      posts(first: 100, state:"MAPPED") {
        _id
        id
        permalink
        mediaType
        mediaUrl
        caption
        children {
          media_type
          media_url
        }
        user {
          username
          fullName
          profilePicture
        }
        location {
          name
          slug
          latitude
          longitude
          address {
            street
            zipCode
            city
            country
          }
          latitude
          longitude
        }
        meta {
          options
          phones
          rank
        }
        updatedAt
        createdAt
      }
    }
  `;
}

async function getPosts(env = 'production') {
  const payload = {
    query: getPostsQuery()
  };

  if (!env) {
    return stubPosts.data.brands;
  }

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
    data: { posts }
  } = await result.json();

  return posts;
}

exports.getPosts = getPosts
