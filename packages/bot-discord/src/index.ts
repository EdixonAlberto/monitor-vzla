import { Bot, configLoad } from '@edixon/concord'
import { WebSocketService } from '@monitor/core'

async function main() {
  try {
    await configLoad()
    const webSocket = new WebSocketService()
    const bot = new Bot()

    webSocket.run()
    await bot.start()
  } catch (_) {
    console.error(_)
    process.exit(0)
  }
}

main()
