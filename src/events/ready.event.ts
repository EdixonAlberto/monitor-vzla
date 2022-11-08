import { TEvent } from '@edixon/concord'
import { WebSocketService as ws } from '@SERVICES/WebSocket.service'

export const ready: TEvent = async ({ channels }) => {
  const CHANNEL_ID = process.env.CHANNEL_ID as string
  const channel = channels.get(CHANNEL_ID)

  if (channel) {
    const query = { qty: 'last', source: 'airtm' }

    ws.socket.emit('prices', query)

    ws.socket.on(`prices:${query.qty}:sources:${query.source}`, ({ data }: TData) => {
      const { source, currencies, timestamp } = data[0]
      const { amount, trend } = currencies.find(({ symbol }) => symbol === 'USD')!
      const dateConfig = {
        locale: 'es-VE',
        tz: 'America/Caracas'
      }
      const date = new Date(timestamp).toLocaleDateString(dateConfig.locale, { timeZone: dateConfig.tz })
      const hour = new Date(timestamp).toLocaleTimeString(dateConfig.locale, {
        timeZone: dateConfig.tz,
        timeStyle: 'short'
      })
      const sign = trend.label === 'up' ? '+' : trend.label === 'down' ? '-' : ''

      channel.embeded({
        header: source.name,
        imageHeader: source.logo,
        body: [
          {
            title: 'Precio',
            content: `${amount}${source.symbol}`,
            fieldType: 'column'
          },
          {
            title: 'Tendencia',
            content: `${trend.emoji} ${sign}${trend.percentage}%`,
            fieldType: 'column'
          },
          {
            title: 'Hora',
            content: hour,
            fieldType: 'column'
          },
          {
            title: 'Fuente',
            content: `[${source.urlPublic}](${source.urlPublic})`
          }
        ],
        footer: `Fecha: ${date}`
      })
    })
  } else {
    console.error(`Channel "${CHANNEL_ID}" not found`)
    process.exit(0)
  }
}
