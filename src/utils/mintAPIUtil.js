function getPostsQuery(lngLat, first = 100, since = '', to = '') {
  return `
    {
      posts(first: ${first}, coordinates: ${JSON.stringify(lngLat) || null}, since: "${since}", to: "${to}") {
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

function getLocationQuery(first = 500) {
  return `
    {
      locations(first: ${first}) {
        id
        name
        slug
        location {
          coordinates
        }
      }
    }
  `;
}

async function requestHelper(payload) {
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

  return await result.json()
}

async function getPosts({ lngLat, first, since, to }) {
  const payload = {
    query: getPostsQuery(lngLat, first, since, to)
  };

  const {
    data: { posts }
  } = await requestHelper(payload)

  return posts;
}

async function getLocations(first) {
  const payload = {
    query: getLocationQuery(first)
  };

  const { 
    data: { locations }
  } = await requestHelper(payload)

  return locations;
}

export {
  getPosts,
  getLocations
} 
