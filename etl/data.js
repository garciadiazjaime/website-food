const fetch = require('node-fetch');
const fs = require('fs');
const debug = require('debug')('etl:data')

const seoCategories = require('../static/seoCategories.json')
const config = require('./config.js');

const zonaCentro = {
  lat: 32.5286807,
  lng: -117.0477024,
}

async function extract(url) {
  const response = await fetch(url)

  return response.json()
}

function load(filename, rawData) {
  const data = JSON.stringify(rawData);
  fs.writeFileSync(`./static/data/${filename}.json`, data);
}

async function getProfiles(first, categories) {
  const state = 'MAPPED'
  return await extract(`${config.get('apiUrl')}/feedme?lng=${zonaCentro.lng}&lat=${zonaCentro.lat}&first=${first}&state=${state}&categories=${categories}`)
}

async function saveHomepage() {
  const categories = seoCategories.map(item => item.slug).join(',')
  const first = 4
  
  const profiles = await getProfiles(first, categories)

  load('homepage', profiles)
}

async function saveCategories() {
  const promises = seoCategories.map(async category => {
    const categories = category.slug
    const first = 48

    const profiles = await getProfiles(first, categories)

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
