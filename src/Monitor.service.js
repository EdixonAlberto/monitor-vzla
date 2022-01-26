const { Instagrapi } = require('instagrapi')

class MonitorService {
  usernameIG = 'enparalelovzla'
  instagrapi

  constructor() {
    this.instagrapi = new Instagrapi({
      sessionId: process.env.SESSION_ID
    })
  }

  async getPriceMonitorDollar() {
    let postUrl = ''
    let monitorData = ''

    const profile = await this.instagrapi.getProfile(this.usernameIG)
    const lastPosts = await this.instagrapi.getLastPosts(this.usernameIG)

    for (let i = 0; i < lastPosts.length; i++) {
      const post = lastPosts[i]

      if (!monitorData) {
        const content = post.content

        if (content) {
          const start = content.search(/\nActualización:/)

          if (start > -1) {
            postUrl = post.postUrl
            const end = content.search(`\n@${this.usernameIG}`)
            monitorData = content.substring(start + 19, end - 4)
          }
        }
      } else break
    }

    return {
      url: postUrl,
      account: profile.username,
      avatar: profile.image.standard,
      price: this.formatPrice(monitorData)
    }
  }

  formatPrice(rawData) {
    const data = rawData.split(' ').map((item) => item.trim())

    const price = {
      amount: parseFloat(data[7].replace(',', '.')),
      chg: {
        amount: parseFloat(data[11].replace(',', '.')),
        percentage: data[9],
        trend: {
          text: data[8] === '🔻' ? 'down' : 'up',
          icon: data[8]
        }
      },
      time: data[3] + data[4],
      date: data[1]
    }

    return price
  }
}

module.exports = { MonitorService }
