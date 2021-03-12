const mongoose = require('mongoose');
const fetch = require('node-fetch');
const fs = require('fs');
const debug = require('debug')('etl:data')

const seoCategories = require('../static/seoCategories.json')
const { Post } = require('./models')
const LDA = require('./lda')
const config = require('./config.js');

const zonaCentro = {
  lat: 32.5286807,
  lng: -117.0477024,
}

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

function getPosts(category, limit) {
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

async function getPostsByCategory(categories, limit) {
  const promises = categories.map(async (category) => {
    const posts = await getPosts(category, limit)

    return {
      category,
      posts: posts.map(post => presenter(post, category)),
    }
  })
  
  const results = await Promise.all(promises)

  return results.map(({ category, posts }) => ({
    category,
    posts
  }))
}

async function saveHomepage() {
  const categories = seoCategories.map(item => item.slug)
  const limit = 8
  
  const posts = await getPostsByCategory(categories, limit)

  load('homepage', posts)
}

async function saveCategories() {
  const promises = seoCategories.map(async item => {
    const { slug: category } = item
    const limit = 50

    const posts = await getPosts(category, limit)

    const data = [{
      category,
      data: posts.map(post => presenter(post, category))
    }]

    load(category, data)
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
