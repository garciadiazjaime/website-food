function getPlacesQuery() {
  return `
    {
      users {
        _id
        id
        username
        fullName
        profilePicture
        post {
          commentsCount
          permalink
          mediaType
          mediaUrl
          caption
          likeCount
          children {
            media_type
            media_url
            caption
          }
        }
        location {
          name
          slug
          address {
            _id
            street
            zipCode
            city
            country
          }
          latitude
          longitude
        }
      }
    }
  `;
}

async function getBrands() {
  const payload = {
    query: getPlacesQuery()
  };


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
    data: { users }
  } = await result.json();

  return users;
}

exports.getBrands = getBrands
