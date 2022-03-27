import { Bot } from '@edixon/concord'

new Bot({
  token: process.env.TOKEN,
  commandsPath: './dist/commands'
}).start()
