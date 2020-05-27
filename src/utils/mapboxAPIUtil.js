const decimals = 2;

async function getLocationName(lng, lat) {
  if (!lng || !lat) {
    return null
  }

  const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng.toFixed(decimals)},${lat.toFixed(decimals)}.json?access_token=${process.mapboxToken}`);
  const { features } = await result.json()

  if(!Array.isArray(features) || !features.length) {
    return null
  }

  return features[0].text;
}

export {
  getLocationName
}
