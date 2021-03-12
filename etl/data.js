const mongoose = require('mongoose');
const fetch = require('node-fetch');
const fs = require('fs');
const debug = require('debug')('etl:data')

const seoCategories = require('../static/seoCategories.json')
const { Post } = require('./models')
const LDA = require('./lda')
const config = require('./config.js');

const zones = [{
  title: 'Zona Centro',
  fullTitle: 'Zona Centro',
  slug: 'zona-centro',
  coordinates: [-117.0364, 32.5309]
}, {
  title: 'Zona Rio',
  fullTitle: 'Zona Rio',
  slug: 'zona-rio',
  coordinates: [-117.0176, 32.5247 ]
}, {
  title: 'Otay',
  fullTitle: 'Otay',
  slug: 'otay',
  coordinates: [-116.9699, 32.5298]
}, {
  title: 'Playas de Tijuana',
  fullTitle: 'Playas de Tijuana',
  slug: 'playas',
  coordinates: [-117.1161, 32.5207]
}]

function load(filename, rawData) {
  const data = JSON.stringify(rawData);
  fs.writeFileSync(`./static/data/${filename}.json`, data);
}

const phoneRegexs = [
  /[\(]?[\d]{3}[\)]?[\s|-]?[\d]{3}[\s|\.|-]?[\d]{4}/,
  /\d\s\d{2}\s\d{4}/,
  /\d{3}-\d{4}/,
  /\([\d]{3}\)-[\d]{3}-[\d]{2}-[\d]{2}/,
  /\d{3}-\d{3}-\d{2}-\d{2}/,
]

function getPhone(description, index = 0) {
  if (index >= phoneRegexs.length) {
    return null
  }

  const results = phoneRegexs[index].exec(description)

  if (!Array.isArray(results)) {
    return getPhone(description, index + 1)
  }

  return results[0].replace(/\D/g, '')
}

const deliveryTexts = [
  'para llevar',
  'servicioadomicilio',
  'ordena vía',
  'ordena via',
  'uber eats',
  'ubereats',
  'didi food',
  'didifood',
]

function hasDelivery(caption, index = 0) {
  if (index >= deliveryTexts.length) {
    return false
  }

  if (caption.toLowerCase().includes(deliveryTexts[index])) {
    return true
  }

  return hasDelivery(caption,  index + 1)
}

function getTopics(post) {
  const { caption, accessibility, user, id, location } = post

  const documents = `${caption} ${accessibility} ${user.fullName} ${location && location.name || ''}`.match( /[^\.!\?]+[\.!\?]+/g );
  const [topics] = LDA(documents, 1, 3, ['es']);

  return topics.reduce((accu, { term }) => {
    accu.push(term)

    return accu
  }, [])
}

function presenter(data, category) {
  const caption = data.caption.split('#').map(item => item.trim()).filter(item => item.includes(' ')).join(' ')
  const description = `${caption.slice(0, 280)}${caption.length > 280 ? '...' : ''}`

  const post = {
    id: data.id,
    username: data.user.username,
    title: data.user.fullName || data.user.username,
    mediaUrl: data.mediaUrl,
    phone: getPhone(data.caption),
    delivery: hasDelivery(data.caption),
    category,
    description,
    date: data.createdAt,
    topics: getTopics(data),
  }

  if (data.location) {
    const address = JSON.parse(data.location.address)
    if (address) {
      post.address = address.street_address || data.location.name
    }

    if (data.location.gps) {
      post.gps = data.location.gps.coordinates
    }
  }

  return post
}

function getPostsByCategory(category, limit) {
  return Post.aggregate([
    {
      $match: { 
        $or:[{ source: 'tijuanamakesmehungry' }, { source: 'tijuanafood' }], 
        mediaType: 'GraphImage',
        $text: { $search: category },
      },
    },
    {
      $group: {
        _id: "$user.id",
        id: { 
          $first : "$id" ,
        },
        caption: {
          $first: "$caption",
        },
        accessibility: {
          $first: "$accessibility",
        },
        createdAt: {
          $first: "$createdAt",
        },
        location: {
          $first: "$location",
        },
        mediaUrl: {
          $first: "$mediaUrl",
        },
        permalink: {
          $first: "$permalink",
        },
        user: {
          $first: "$user",
        },
      }
    },
    {
      $sort: { createdAt: -1 },
    },
    { $limit : limit },
  ])
}

function getPostsByLocation(coordinates, limit) {
  const radiusInMTS = 1000 * 3.5;

  return Post.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates,
        },
        distanceField: "dist.calculated",
        maxDistance: radiusInMTS,
        spherical: true
      }
    },
    {
      $match: {
        $or:[{ source: 'tijuanamakesmehungry' }, { source: 'tijuanafood' }],
        mediaType: 'GraphImage',
      },
    },
    {
      $group: {
        _id: "$user.id",
        id: {
          $first : "$id" ,
        },
        caption: {
          $first: "$caption",
        },
        accessibility: {
          $first: "$accessibility",
        },
        createdAt: {
          $first: "$createdAt",
        },
        location: {
          $first: "$location",
        },
        mediaUrl: {
          $first: "$mediaUrl",
        },
        permalink: {
          $first: "$permalink",
        },
        user: {
          $first: "$user",
        },
      }
    },
    {
      $sort: { createdAt: -1 },
    },
    { $limit : limit },
  ])
}

async function getPosts(categories, geoZones, limit) {
  const categoryPromise = categories.map(async ({ title, fullTitle, slug }) => {
    const posts = await getPostsByCategory(slug, limit)

    return {
      title,
      fullTitle,
      slug,
      posts: posts.map(post => presenter(post, slug)),
    }
  })

  const locationPromises = geoZones.map(async ({ coordinates, title, fullTitle, slug }) => {
    const posts = await getPostsByLocation(coordinates, limit)

    return {
      title,
      fullTitle,
      slug,
      posts: posts.map(post => presenter(post, slug)),
    }
  })

  return Promise.all([...categoryPromise, ...locationPromises])
}

async function saveHomepage() {
  const limit = 4
  
  const posts = await getPosts(seoCategories, zones, limit)

  load('homepage', posts)
}

async function saveCategories() {
  const promises = seoCategories.map(async ({ title, fullTitle, slug }) => {
    const limit = 50

    const posts = await getPostsByCategory(slug, limit)

    const data = [{
      title,
      fullTitle,
      slug,
      data: posts.map(post => presenter(post, slug))
    }]

    load(slug, data)
  })

  return Promise.all(promises)
}

function createDirectory() {
  const dir = './static/data'

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

function openDB() {
  return mongoose.connect(config.get('db.url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

async function main() {
  await openDB();

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
