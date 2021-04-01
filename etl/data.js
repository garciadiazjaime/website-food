const mongoose = require('mongoose');
const fs = require('fs');
const mapSeries = require('async/mapSeries');
const debug = require('debug')('app:data')

const seoCategories = require('../static/seoCategories.json')
const { Post } = require('./models')
const LDA = require('./lda')
const config = require('./config.js');

const zones = [{
  title: 'Dónde comer en el Centro?',
  fullTitle: 'Dónde comer en el Centro?',
  slug: 'zona-centro',
  coordinates: [-117.0364, 32.5309]
}, {
  title: 'Qué comer en Zona Rio?',
  fullTitle: 'Qué comer en Zona Rio?',
  slug: 'zona-rio',
  coordinates: [-117.0176, 32.5247 ]
}, {
  title: 'Si andas en Otay',
  fullTitle: 'Si andas en Otay',
  slug: 'otay',
  coordinates: [-116.9699, 32.5298]
}, {
  title: 'Como Playas no hay dos',
  fullTitle: 'Como Playas no hay dos',
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

function getTopics(post, terms = 3) {
  const { caption, accessibility, user, id, location } = post

  const content = [caption || '']

  if (accessibility) {
    content.push(accessibility)
  }

  if (user && user.fullName) {
    content.push(user.fullName)
  }

  if (location && location.name) {
    content.push(`${location.name}.`)
  }

  const documents = content.join('.').match( /[^\.!\?]+[\.!\?]+/g );
  const [topics] = LDA(documents || [content], 1, terms, ['es']);

  if (!topics) {
    debug(`NO_TOPICS:${id}`)
    return []
  }

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
    dist: data.dist,
    userId: data.user.id,
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

function getPostsByCategory(category, limit, postsBySection = []) {
  const userIDsTaken = postsBySection.reduce((accu, item) => {
    item.posts.forEach(post => {
      accu[post.userId] = true
    })

    return accu
  }, {})

  const since = new Date()
  since.setDate(since.getDate() - 30)

  return Post.aggregate([
    {
      $match: { 
        $or:[{ source: 'tijuanamakesmehungry' }, { source: 'tijuanafood' }], 
        mediaType: 'GraphImage',
        $text: { $search: category },
        'user.id': {
          $nin: Object.keys(userIDsTaken)
        },
        createdAt: {
          $gt: since
        }
      },
    },
    {
      $sort: { createdAt: -1 },
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
    { $limit : limit },
  ])
}

function getPostsByLocation(coordinates, limit) {
  const radiusInMTS = 1000 * 3.5;
  const since = new Date()
  since.setDate(since.getDate() - 14)

  return Post.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates,
        },
        distanceField: "dist",
        maxDistance: radiusInMTS,
        spherical: true
      }
    },
    {
      $match: {
        $or:[{ source: 'tijuanamakesmehungry' }, { source: 'tijuanafood' }],
        mediaType: 'GraphImage',
        createdAt: { $gte : since }
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
        dist: {
          $first: "$dist",
        },
      }
    },
    {
      $sort: { dist: 1 },
    },
    { $limit : limit },
  ])
}

async function getPosts(categories, geoZones, limit) {
  const postsBySection = []

  await mapSeries(categories, async ({ title, fullTitle, slug }) => {
    const posts = await getPostsByCategory(slug, limit, postsBySection)

    postsBySection.push({
      title,
      fullTitle,
      slug,
      posts: posts.map(post => presenter(post, slug)),
    })
  })

  await mapSeries(geoZones, async ({ coordinates, title, fullTitle, slug }) => {
    const posts = await getPostsByLocation(coordinates, limit)

    postsBySection.push({
      title,
      fullTitle,
      slug,
      posts: posts.map(post => presenter(post, slug)),
    })
  })

  return postsBySection
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

async function updateTopics() {
  const posts = await Post.find({ topics: { $exists: false }}).sort({ createdAt: -1 }).limit(500)
  debug(`posts_found:${posts.length}`)

  const promises = posts.map(post => {
    post.topics = getTopics(post, 10)

    return post.save()
  })
  
  await Promise.all(promises)
  
  debug(`updated:${promises.length}`)
}

async function main() {
  await openDB();

  createDirectory()

  await saveHomepage()
  
  await saveCategories()

  await updateTopics()
}

if (require.main === module) {
  main().then(() => {
    debug('data generated')
    process.exit(0);
  });
}

module.exports = {
  getTopics
}
