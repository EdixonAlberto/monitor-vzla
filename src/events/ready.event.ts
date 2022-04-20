import { TEvent } from '@edixon/concord'
import { BotResponse } from '@edixon/concord/dist/core/BotResponse'
import { MonitorService } from 'services/Monitor.service'
import { IntervalService } from 'services/Interval.service'

export const ready: TEvent = async ({ channels }) => {
  const monitorService = new MonitorService()
  const interval = new IntervalService(['09:30', '13:30'])
  const channel = channels.get('827708188907929673')

  try {
    if (channel) {
      interval.start(notifyPriceUpdated(monitorService, channel))
    } else throw new Error('Channel "827708188907929673" not found')
  } catch (error) {
    console.error((error as Error).message)
  }
}

function notifyPriceUpdated(monitor: MonitorService, channel: BotResponse): () => Promise<void> {
  return async () => {
    const monitorDollar = await monitor.getPriceMonitorDollar()
    if (!monitorDollar) return

    const { url, avatar, account, price } = monitorDollar

    channel.embeded({
      header: {
        text: 'Monitor Dolar',
        url: `https://www.instagram.com/${account}`
      },
      imageHeader: avatar,
      body: [
        {
          title: 'Precio',
          content: price.amount.toString() + 'Bs',
          fieldType: 'column'
        },
        {
          title: 'Tendencia',
          content: price.chg.trend.icon + price.chg.percentage,
          fieldType: 'column'
        },
        {
          title: 'Hora',
          content: price.time,
          fieldType: 'column'
        },
        {
          title: 'Fuente',
          content: `[@${account}](${url})`
        }
      ],
      footer: `Fecha: ${price.date}`
    })
  }
}
