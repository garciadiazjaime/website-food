const fs = require('fs')
const fetch = require('node-fetch')
const debug = require('debug')('app:download:restaurants')

async function main() {
    debug('starting')
    const response = await fetch('https://mint-api-central.herokuapp.com/restaurant/');
    const restaurants = await response.json()

    fs.writeFileSync('./static/data/restaurants.json', JSON.stringify(restaurants))
    debug('end')
}

main()
