import { userLocation } from '../utils/stores';
import { getLocationName, zonaCentro } from './mapboxAPIUtil';

async function setUserLocation() {
  const coordinates = JSON.parse(window.localStorage.getItem('@location'))

  const location = coordinates ? await getLocationName(coordinates.lng, coordinates.lat) : zonaCentro.title

  userLocation.set(location);
}

export {
  setUserLocation
}
