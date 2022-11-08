import { Bot, configLoad } from '@edixon/concord'
import { WebSocketService } from '@SERVICES/WebSocket.service'

async function main() {
  try {
    await configLoad()
    const ws = new WebSocketService()
    const bot = new Bot()

    ws.run()
    await bot.start()
  } catch (_) {
    console.error(_)
    process.exit(0)
  }
}

main()
