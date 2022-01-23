const { Bot } = require('@edixon/concord')
const { MonitorService } = require('./monitor.service')

new Bot({
  token: process.env.TOKEN
}).start()
