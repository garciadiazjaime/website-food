const mongoose = require('mongoose');
const fetch = require('node-fetch');
const fs = require('fs');
const debug = require('debug')('etl:data')

const seoCategories = require('../static/seoCategories.json')
const { Post } = require('./models')
const config = require('./config.js');

const zonaCentro = {
  lat: 32.5286807,
  lng: -117.0477024,
}

function load(filename, rawData) {
  const data = JSON.stringify(rawData);
  fs.writeFileSync(`./static/data/${filename}.json`, data);
}

function presenter(data, category) {
  const caption = data.caption.split('#').map(item => item.trim()).filter(item => item.includes(' ')).join(' ')
  const description = `${caption.slice(0, 280)}${caption.length > 280 ? '...' : ''}`

  const post = {
    id: data.id,
    username: data.user.username,
    title: data.user.fullName || data.user.username,
    mediaUrl: data.mediaUrl,
    phone: '',
    category,
    description,
    date: data.createdAt,
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
  return Post.find({ 
      $or:[{ source: 'tijuanamakesmehungry' }, { source: 'tijuanafood' }],
      $text: { $search: category },
      location: { $exists: true },
      mediaType: 'GraphImage',
    })
    .limit(limit)
    .sort({ createdAt: -1 })
}

async function getPostsByCategory(categories, limit) {
  const promises = categories.map(async(category) => {
    const posts = await getPosts(category, limit * 2)

    return {
      category,
      posts,
    }
  })
  
  const results = await Promise.all(promises)

  const postsIds = {}

  return results.reduce((accu, { category, posts }) => {
    const item = {
      category,
      data: []
    }

    posts.forEach(post => {
      if (!postsIds[post.id] && item.data.length < limit) {
        postsIds[post.id] = true
        item.data.push(presenter(post, category))
      }
    })

    accu.push(item)

    return accu
  }, [])
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
