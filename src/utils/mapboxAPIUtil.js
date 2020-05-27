async function getLocationName(lng, lat) {
  const dec = 2;
  lng = lng.toFixed(dec);
  lat = lat.toFixed(dec);
  const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.mapboxToken}`);
  return result.json();
}

exports.getLocationName = getLocationName;
