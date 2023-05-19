import { Telegraf } from 'telegraf'
import { config } from 'dotenv'
import { WebSocketService, Types, DATE_CONFIG } from '@monitor/core'

async function main() {
  config()

  const { CHAT_ID, TOKEN } = process.env as { [key: string]: string }
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

  ws.on(event, async ({ data, error }: Types.Data) => {
    if (error) {
      console.error('[WS]', error)
      return
    }
    sendPricesInChannel(bot, CHAT_ID, data)
  })

  if (ws.id) emitPrice(ws.id)

  // TEST
  // const priceList = (await import('./price.test')).prices
  // sendPricesInChannel(bot, CHAT_ID, priceList)
}

async function sendPricesInChannel(bot: Telegraf<MyContext>, chatId: string, priceList: Types.Price[]): Promise<void> {
  const MODE_DEV: boolean = process.env.NODE_ENV === 'development'
  const currentDate = new Date().toLocaleString(DATE_CONFIG.locale, {
    timeZone: DATE_CONFIG.tz
  })
  let message: string = `Precios del dolar paralelo hoy ${currentDate}\n`

  // Prepare message
  for (const price of priceList) {
    const { source, currencies, timestamp } = price
    const { amount, trend } = currencies.find(({ symbol }) => symbol === 'USD')!
    const hour = new Date(timestamp).toLocaleTimeString(DATE_CONFIG.locale, {
      timeZone: DATE_CONFIG.tz,
      timeStyle: 'short'
    })
    const sign = trend.label === 'up' ? '+' : trend.label === 'down' ? '-' : ''

    message += /* markdown */ `
*${source.name}*
-----------------------------
*Precio:* \`${amount.toFixed(2)}\`${source.symbol}
*Cambio:* ${sign}${trend.amount.toFixed(2)}${source.symbol}
*Tendencia:* ${trend.emoji} ${sign}${trend.percentage.toFixed(2)}%
*Hora:* ${hour}
*Fuente:* [${source.link.label}](${source.link.url})

`
  }

  // Send message
  await bot.telegram.sendMessage(
    chatId,
    {
      text: message,
      parse_mode: 'Markdown' as any
    },
    {
      disable_notification: MODE_DEV,
      disable_web_page_preview: true
    }
  )
}

main()
