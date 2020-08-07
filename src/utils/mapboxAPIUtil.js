const decimals = 2;

const zonaCentro = {
  lat: 32.5286807,
  lng: -117.0477024,
  zoom: 11,
  title: 'Zona Centro'
}

async function getLocationName(lng, lat) {
  if (!lng || !lat) {
    return null
  }

  const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng.toFixed(decimals)},${lat.toFixed(decimals)}.json?access_token=${process.mapboxToken}`);
  const { features } = await result.json()

  if(!Array.isArray(features) || !features.length) {
    return null
  }
  let location;
  features.map(feature => {
    if(feature.place_type[0] === 'address') {
      location = feature.text;
    }
  });
  console.log(features[0].text);
  if (!location) {
    location = features[0].text;
  }
  return location;
}

export {
  getLocationName,
  zonaCentro
}
