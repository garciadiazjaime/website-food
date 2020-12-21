function getPostsQuery(lngLat, first = 100, since = '', to = '', state = '') {
  return `
    {
      posts(first: ${first}, coordinates: ${JSON.stringify(lngLat) || null}, since: "${since}", to: "${to}", state: "${state}") {
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

function getProfilesQuery({ lngLat, first = 48, state = '', username = '' }) {
  return `
    {
      profile(first: ${first}, coordinates: ${JSON.stringify(lngLat) || null}, state: "${state}", username: "${username}") {
        id
        username
        title
        mediaUrl
        caption
        phones
        keywords
        address
        dist
        rank
        gps
        posts {
          mediaUrl
          caption
        }
      }
    }
  `
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

async function instagramPostImageMutation(mediaUrl) {
  if (!mediaUrl) {
    return null;
  }

  const payload = {
    query: `mutation MutationInstagramPostImage($mediaUrl: String!) {
      updateInstagramPostImage(mediaUrl: $mediaUrl)
    }`,
    variables: {
      mediaUrl,
    },
  };

  await requestHelper(payload);
}

async function requestHelper(payload) {
  const result = await fetch(
    `process.API_URL/feedme`,
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

async function getPosts({ lngLat, first, since, to, state }) {
  const payload = {
    query: getPostsQuery(lngLat, first, since, to, state)
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

async function getProfiles({ lngLat, first = 50, state, username }) {
  return requestHelper({ lngLat, first, state, username })
}

export {
  getPosts,
  getLocations,
  getProfiles,
  instagramPostImageMutation
} 
