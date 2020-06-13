function getStatsByDay(posts) {
  if (!Array.isArray(posts) || !posts.length) {
    return []
  }

  const users = {}

  const data = posts.reduce((accu, post) => {
    const date = new Date(parseInt(post.createdAt))
    const day = date.getDate()

    if (!accu.byDay[day]) {
      accu.byDay[day] = {
        date: new Date(date.toDateString()),
        posts: 0,
        users: 0,
      }
    }
    accu.byDay[day].posts += 1
    accu.summary.posts.value += 1

    const user = post.user.username
    if (!users[user]) {
      users[user] = true
      accu.byDay[day].users += 1
    }

    const {
      location
    } = post
    if (location && location.address && location.address.street) {
      accu.summary.address.value += 1
    }

    const {
      options,
      phones
    } = post.meta
    if (Array.isArray(options) && options.length) {
      accu.summary.options.value += 1
    }

    if (Array.isArray(phones) && phones.length) {
      accu.summary.phones.value += 1
    }

    return accu
  }, {
    byDay: {},
    summary: {
      posts: {
        value: 0,
        label: 'Posts'
      },
      address: {
        value: 0,
        label: 'Dirección'
      },
      options: {
        value: 0,
        label: 'Opciones'
      },
      phones: {
        value: 0,
        label: 'Teléfono'
      },
    }
  })

  const byDay = []
  for (let day in data.byDay) {
    byDay.push({
      ...data.byDay[day]
    })
  }
  byDay.sort((a, b) => a.date - b.date)

  const summary = Object.keys(data.summary)
    .map(key => data.summary[key])
    .sort((a, b) => b.value - a.value)

  return {
    byDay,
    summary
  }
}

function getHashtags(posts) {
  if (!Array.isArray(posts) || !posts.length) {
    return null
  }
  const regex = /#\w+/g
  const hashtags = posts.reduce((accu, item) => {
    const options = item.caption.match(regex)

    if (Array.isArray(options) && options.length) {
      options.forEach(value => {
        if (!accu[value]) {
          accu[value] = 0
        }

        accu[value] += 1
      })
    }

    return accu
  }, {})


  const results = Object.keys(hashtags).reduce((accu, key) => {
    accu.push({
      label: key, 
      value: hashtags[key]
    })

    return accu
  }, [])

  return results.sort((a, b) => b.value - a.value).slice(0, 10)
}

export {
  getStatsByDay,
  getHashtags
}
