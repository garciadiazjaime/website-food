const fs = require('fs');
const mapSeries = require('async/mapSeries');
const { promisify } = require('util');
const debug = require('debug')('app:image')

const streamPipeline = promisify(require('stream').pipeline);
const fetch = require('node-fetch');

async function saveImagesForPublicPage(posts) {
  debug(`downloading:${posts.length}`)
  let total = 0

  await mapSeries(posts, async (category) => {
    await mapSeries(category.posts, async(post) => {
      const { mediaUrl, username, id } = post

      const imageName = `./static/que-comer-en-tijuana/${username}-${id}.jpg`
      if (!fs.existsSync(imageName)) {
        await downloadImage(mediaUrl, imageName)
        total += 1
      }
    })
  })

  debug(`saved:${total}`)
}

async function saveImages(posts) {
  debug(`downloading:${posts.length}`)
  let total = 0

  await mapSeries(posts, async (post) => {
    const { mediaUrl, user, id } = post

    const imageName = `./static/que-comer-en-tijuana/${user.username}-${id}.jpg`
    if (!fs.existsSync(imageName)) {
      await downloadImage(mediaUrl, imageName)
      total += 1
    }
  })

  debug(`saved:${total}`)
}

async function downloadImage(mediaUrl, imageName) {
  debug(mediaUrl)
  return fetch(mediaUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`unexpected response ${res.statusText}`);
      }

      return streamPipeline(res.body, fs.createWriteStream(imageName));
    });
}

module.exports = {
  saveImagesForPublicPage,
  saveImages
}
