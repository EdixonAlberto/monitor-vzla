import { Telegraf } from 'telegraf'
import { config } from 'dotenv'
import { WebSocketService, Types } from '@monitor/core'

async function main() {
  config()
  const CHAT_ID = process.env.CHAT_ID as string
  const TOKEN = process.env.TOKEN as string
  const webSocketService = new WebSocketService()
  const bot = new Telegraf<MyContext>(TOKEN)

  webSocketService.run()
  bot.launch()

  const { socket: ws } = WebSocketService
  const query = { qty: 'last', source: '' }
  const event = `prices:${query.qty}:sources:${query.source}`

  const emitPrice = (clientId: string) => {
    ws.emit('prices', <Types.Payload>{
      clientId,
      query
    })
    console.log('[WS] - Event emited: "prices"')
  }

  ws.on('connect', () => emitPrice(ws.id))

  ws.on(event, ({ data }: Types.Data) => {
    for (const price of data) {
      sendPriceInChannel(bot, CHAT_ID, price)
    }
  })

  if (ws.id) emitPrice(ws.id)
}

async function sendPriceInChannel(bot: Telegraf<MyContext>, chatId: string, price: Types.Price): Promise<void> {
  await bot.telegram.sendMessage(chatId, price.currencies[0].amount.toString())
}

main()
