import { Telegraf } from 'telegraf'
import { config } from 'dotenv'
import { WebSocketService, Types, DATE_CONFIG } from '@monitor/core'

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

  ws.on(event, async ({ data, error }: Types.Data) => {
    if (error) {
      console.error('[WS]', error)
      return
    }

    // Invertir la lista de precios para que el ultimo mensaje sea el precio de la última fuente
    const priceList = data.reverse()

    const currentDate = new Date()
      .toLocaleString(DATE_CONFIG.locale, {
        timeZone: DATE_CONFIG.tz
      })
      .replace(/:\d{2} /, ' ')

    await bot.telegram.sendMessage(
      CHAT_ID,
      `A continuación se muestran los precios del dolar paralelo hoy ${currentDate}`,
      {
        disable_notification: true
      }
    )

    for (const price of priceList) {
      sendPriceInChannel(bot, CHAT_ID, price)
    }
  })

  if (ws.id) emitPrice(ws.id)

  // TEST
  // sendPriceInChannel(bot, CHAT_ID, (await import('./price.test')).price)
}

async function sendPriceInChannel(bot: Telegraf<MyContext>, chatId: string, price: Types.Price): Promise<void> {
  const MODE_DEV = process.env.NODE_ENV === 'development'
  const { source, currencies, timestamp } = price
  const { amount, trend } = currencies.find(({ symbol }) => symbol === 'USD')!
  const date = new Date(timestamp).toLocaleDateString(DATE_CONFIG.locale, {
    timeZone: DATE_CONFIG.tz
  })
  const hour = new Date(timestamp).toLocaleTimeString(DATE_CONFIG.locale, {
    timeZone: DATE_CONFIG.tz,
    timeStyle: 'short'
  })
  const sign = trend.label === 'up' ? '+' : trend.label === 'down' ? '-' : ''

  const message = /* markdown */ `
*${source.name}*

*Precio:* \`${amount}\`${source.symbol}
*Cambio:* ${sign}${trend.amount}${source.symbol}
*Tendencia:* ${trend.emoji} ${sign}${trend.percentage}%
*Fuente:* \`${source.link.label}\`

${date}  ${hour}
`

  await bot.telegram.sendPhoto(
    chatId,
    {
      url: source.banner
      // source: source.banner
    },
    {
      caption: message,
      disable_notification: MODE_DEV,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: 'Visitar Fuente', url: source.link.url }]]
      }
    }
  )
}

main()
