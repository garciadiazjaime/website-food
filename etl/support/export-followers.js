const saveToJSON = require('./save-to-json')
const {
  Follower
} = require('../models')

async function exportFollowers() {
  const followers = await Follower.find({
    biography: {
      $exists: true
    }
  }, {}, {
    skip: 20
  })
  // .sort({
  //   posts: 1,
  //   followers: -1,
  // })
  .sort({
    posts: -1,
    followers: -1,
    is_professional_accountis_professional_account: false,
  })

  saveToJSON('followers', followers)
}

module.exports = exportFollowers
