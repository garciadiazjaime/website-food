function getPostsQuery(lngLat, first = 100, since = '') {
  return `
    {
      posts(first: ${first}, coordinates: ${JSON.stringify(lngLat) || null}, since: "${since}") {
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

function getLocationQuery() {
  return `
    {
      locations(first: 200) {
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

async function getPosts({ lngLat, first, since }) {
  const payload = {
    query: getPostsQuery(lngLat, first, since)
  };

  const {
    data: { posts }
  } = await requestHelper(payload)

  return posts;
}

async function getLocations() {
  const payload = {
    query: getLocationQuery()
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
