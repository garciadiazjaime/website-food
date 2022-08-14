const mapSeries = require('async/mapSeries');
const fs = require('fs')
const fetch = require('node-fetch')
const debug = require('debug')('app:download:restaurants')

async function getList() {
    const response = await fetch('https://mint-api-central.herokuapp.com/restaurant/');
    const restaurants = await response.json()

    fs.writeFileSync('./static/restaurants.json', JSON.stringify(restaurants))
    debug(`list done: ${restaurants.length}`)

    return restaurants
}

async function setDetails({ slug }){
    const response = await fetch(`https://mint-api-central.herokuapp.com/restaurant/${slug}`);
    const restaurant = await response.json()

    fs.writeFileSync(`./static/restaurants/${restaurant.slug}.json`, JSON.stringify(restaurant))
    debug(`saved: ${restaurant.slug}`)
}

async function main() {
    debug('starting')
    const restaurants = await getList()

    await mapSeries(restaurants, setDetails)

    debug('end')
}

main()
