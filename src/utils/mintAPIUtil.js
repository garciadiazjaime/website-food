const stubBrands = require('../../stubs/getBrands')

function getPlacesQuery() {
  return `
    {
      brands(state:"MAPPED") {
        _id
        id
        username
        fullName
        profilePicture
        options
        phones
        rank
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

async function getBrands(env = 'production') {
  const payload = {
    query: getPlacesQuery()
  };

  if (!env) {
    return stubBrands.data.brands;
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
    data: { brands }
  } = await result.json();

  return brands;
}

exports.getBrands = getBrands
