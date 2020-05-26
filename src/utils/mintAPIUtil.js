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
          location {
            coordinates
          }
          address {
            street
            zipCode
            city
            country
          }
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

exports.getPosts = getPosts
