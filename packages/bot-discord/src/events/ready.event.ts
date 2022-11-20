import { TEvent } from '@edixon/concord'
import { BotResponse } from '@edixon/concord/dist/core/BotResponse'
import { WebSocketService, Types } from '@monitor/core'

export const ready: TEvent = async ({ channels }) => {
  const CHANNEL_ID = process.env.CHANNEL_ID as string
  const channel = channels.get(CHANNEL_ID)

  if (channel) {
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
        sendPriceInChannel(channel, price)
      }
    })

    if (ws.id) emitPrice(ws.id)
  } else {
    console.error(`[ERROR] - Channel "${CHANNEL_ID}" not found`)
    process.exit(0)
  }
}

async function sendPriceInChannel(channel: BotResponse, price: any): Promise<void> {
  const { source, currencies, timestamp } = price
  const SYMBOL_MONEY = 'USD'
  const { amount, trend } = currencies.find(({ symbol }) => symbol === SYMBOL_MONEY)!
  const dateConfig = {
    locale: 'es-VE',
    tz: 'America/Caracas'
  }
  const date = new Date(timestamp).toLocaleDateString(dateConfig.locale, {
    timeZone: dateConfig.tz
  })
  const hour = new Date(timestamp).toLocaleTimeString(dateConfig.locale, {
    timeZone: dateConfig.tz,
    timeStyle: 'short'
  })
  const sign = trend.label === 'up' ? '+' : trend.label === 'down' ? '-' : ''

  await channel.embeded({
    header: source.name,
    imageHeader: source.logo,
    body: [
      {
        title: 'Precio',
        content: `${amount}${source.symbol}`,
        fieldType: 'column'
      },
      {
        title: 'Cambio',
        content: `${sign}${trend.amount}${source.symbol}`,
        fieldType: 'column'
      },
      {
        title: 'Tendencia',
        content: `${trend.emoji} ${sign}${trend.percentage}%`,
        fieldType: 'column'
      },
      {
        title: 'Moneda',
        content: SYMBOL_MONEY,
        fieldType: 'column'
      },
      {
        title: 'País',
        content: source.country
          .split('')
          .map((l, i) => (i === 0 ? l.toUpperCase() : l))
          .join(''),
        fieldType: 'column'
      },
      {
        title: 'Fuente',
        content: `[${source.urlPublic}](https://${source.urlPublic})`,
        fieldType: 'column'
      }
    ],
    footer: `Consulta ${date} | ${hour}`
  })
}
