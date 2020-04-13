import * as sapper from '@sapper/app';

mapboxgl.accessToken = process.mapboxToken

const key = {};
window.key = key

sapper.start({
	target: document.querySelector('#sapper')
});
