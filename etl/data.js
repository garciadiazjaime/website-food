const fetch = require('node-fetch');
const fs = require('fs');
const debug = require('debug')('etl:data')

const config = require('./config.js');

const zonaCentro = {
  lat: 32.5286807,
  lng: -117.0477024,
}

const lngLat = [zonaCentro.lng, zonaCentro.lat];

async function extract(url) {
  const response = await fetch(url)

  return response.json()
}

function load(filename, rawData) {
  const data = JSON.stringify(rawData);
  fs.writeFileSync(`./static/data/${filename}.json`, data);
}

async function saveHomepage() {
  let filters = encodeURIComponent(JSON.stringify({ lngLat, first: 100, state: 'MAPPED' }))
  
  const profiles = await extract(`${config.get('apiUrl')}/feedme?filters=${filters}`)
  load('homepage', profiles)
}

async function saveCategories() {
  const rawdata = fs.readFileSync('./static/seoCategories.json');
  const optionsForSEO = JSON.parse(rawdata);

  const promises = optionsForSEO.map(async category => {
    filters = encodeURIComponent(JSON.stringify({ lngLat, first: 100, state: 'MAPPED', category: category.slug }))

    const profiles = await extract(`${config.get('apiUrl')}/feedme?filters=${filters}`)

    load(category.slug, profiles)
  })

  return Promise.all(promises)
}

function createDirectory() {
  const dir = './static/data'

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

async function main() {
  createDirectory()

  await saveHomepage()
  
  await saveCategories()
}


if (require.main === module) {
  main().then(() => {
    debug('data generated')
    process.exit(0);
  });
}
