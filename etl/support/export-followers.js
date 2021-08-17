const saveToJSON = require('./save-to-json')
const {
  Follower
} = require('../models')

async function exportFollowers() {
  const followers = await Follower.find({
    biography: {
      $exists: true
    }
  })
  .sort({
    posts: 0
  })

  saveToJSON('followers', followers)
}

module.exports = exportFollowers
