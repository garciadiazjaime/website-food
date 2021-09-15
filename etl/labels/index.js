const debug = require('debug')('app:labels')
const {
  Post
} = require('../models')
const saveToJSON = require('../support/save-to-json')

const DAYS_AGO = 30
const LIMIT_POSTS = 1000
const LIMIT_LABELS = 100
const LIMIT_TRENDING_LABELS = 5;

const nonAllowLabels = [
  'Food',
  'Plant',
  'Person',
  'Meal',
  'Dish',
  'Human',
  'Text',
  'Clothing',
  'Seasoning',
  'Advertisement',
  'Poster',
  'Paper',
  'Animal',
  'Wood',
  'Brochure',
  'Furniture',
  'Apparel',
  'Jar',
  'Outdoors',
  'Flower',
  'Vase',
  'Face',
  'Milk',
  'Female',
  'Chair',
  'Sweets',
]

function isLabelAllow(label) {
  return !nonAllowLabels.includes(label)
}

function getPosts() {
  const since = new Date()
  since.setDate(since.getDate() - DAYS_AGO)

  return Post.find({
    labels: {
      $exists: true
    },
    createdAt: {
      $gt: since
    }
  })
  .limit(LIMIT_POSTS)
}

function getPostsByLabel(posts) {
  if (!Array.isArray(posts) || !posts.length) {
    return {}
  }

  return posts.reduce((accu, post) => {
    if (!Array.isArray(post.labels) || !post.labels.length) {
      return accu
    }

    post.labels.forEach(label => {
      const { name } = label
      if (!name || !isLabelAllow(name)) {
        return null
      }

      if (!accu[name]) {
        accu[name] = 0
      }

      accu[name] += 1
    })
  
    return accu
  }, {});
}

function labelsSorted(postsByLabel) {
  const labels = Object.keys(postsByLabel)

  if (!labels.length) {
    return []
  }

  return labels.map(label => ([label, postsByLabel[label]])).sort((a, b) => b[1] - a[1])
}

async function getPostFromLabel(labels) {
  if (!Array.isArray(labels) || !labels.length) {
    return []
  }

  const posts = await Promise.all(labels.slice(0, LIMIT_TRENDING_LABELS).map(label => Post.find({
    "labels.name": label[0]
  }).limit(1)))

  return posts.map(([post], index) => ({
    id: post.id,
    captions: post.caption,
    username: post.user.username,
    permalink: post.permalink,
    label: labels[index][0],
  }))
}

async function saveTrendingLabels() {
  debug('==== start ====')

  const posts = await getPosts()
  debug(`posts: ${posts.length}`)

  const postsByLabel = getPostsByLabel(posts)

  labels = labelsSorted(postsByLabel)
  debug(`labels: 100 of ${labels.length}`)

  await saveToJSON('labels', labels.slice(0, LIMIT_LABELS))
  debug('labels saved')

  const postFromLabel = await getPostFromLabel(labels)
  console.log(JSON.stringify(postFromLabel, null, 2))

  debug('==== end ====')
}

module.exports = {
  saveTrendingLabels
}
