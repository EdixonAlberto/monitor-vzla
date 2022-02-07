const { MonitorService } = require('../Monitor.service')
const { IntervalService } = require('../Interval.service')

module.exports.monitor = async ({ response }) => {
  const monitorService = new MonitorService()
  const interval = new IntervalService(['09:30', '13:30'])

  try {
    await response.general('>> START <<')
    interval.start(notifyPriceUpdated(monitorService, response))
  } catch (error) {
    console.error(error)
    response.general('>> ERROR <<')
  }
}

function notifyPriceUpdated(monitor, response) {
  return async () => {
    const monitorDollar = await monitor.getPriceMonitorDollar()
    if (!monitorDollar) return

    const { url, avatar, account, price } = monitorDollar

    response.embeded({
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
