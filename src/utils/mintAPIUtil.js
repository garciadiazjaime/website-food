function getPostsQuery(lngLat) {
  return `
    {
      posts(first: 100, state:"MAPPED", coordinates: ${JSON.stringify(lngLat)}) {
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
        dist {
          calculated
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

async function getPosts(lngLat) {
  const payload = {
    query: getPostsQuery(lngLat)
  };
  
  const result = await fetch(
    `process.API_URL/instagram/graphiql`,
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

export {
  getPosts
} 
