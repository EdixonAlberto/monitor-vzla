import { Bot, configLoad } from '@edixon/concord'
import { WebSocketService } from '@monitor/core'

async function main() {
  try {
    await configLoad()
    const webSocket = new WebSocketService()
    // TODO: Mejorar esto despues
    const eventsPath = process.env.NODE_ENV === 'production' ? 'packages/bot-discord/dist/events' : undefined
    const bot = new Bot({ eventsPath })

    webSocket.run()
    await bot.start()
  } catch (_) {
    console.error(_)
    process.exit(0)
  }
}

main()
