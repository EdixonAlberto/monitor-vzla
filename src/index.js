const { Bot } = require('@edixon/concord')

new Bot({
  token: process.env.TOKEN
}).start()
