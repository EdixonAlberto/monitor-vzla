const { Instagrapi } = require('instagrapi')

class MonitorService {
  usernameIG = ''
  instagrapi = null

  constructor() {
    this.usernameIG = 'enparaleloenvzla'
    this.instagrapi = new Instagrapi({
      sessionId: process.env.SESSION_ID
    })
  }

  async getPriceMonitorDollar() {
    let postUrl = ''
    let monitorData = ''

    try {
      const profile = await this.instagrapi.getProfile(this.usernameIG)
      const lastPosts = await this.instagrapi.getLastPosts(this.usernameIG)

      for (let i = 0; i < lastPosts.length; i++) {
        const post = lastPosts[i]

        if (!monitorData) {
          const content = post.content

          if (content) {
            const start = content.search(/🗓️/)

            if (start > -1) {
              postUrl = post.postUrl
              const end = content.search(/\n(@|#)/)
              monitorData = content.substring(start, end).trim()
            }
          }
        } else break
      }

      return monitorData
        ? {
            url: postUrl,
            account: profile.username,
            avatar: profile.image.standard,
            price: this.formatPrice(monitorData)
          }
        : null
    } catch (error) {
      console.error('ERROR-GET-PRICE', error.message)
      return null
    }
  }

  formatPrice(rawData) {
    const data = rawData.split(' ').map(item => item.trim())

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
