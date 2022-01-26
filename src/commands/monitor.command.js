const { MonitorService } = require('../monitor.service')

module.exports.monitor = async ({ response }) => {
  const monitorService = new MonitorService()

  const { url, avatar, account, price } = await monitorService.getPriceMonitorDollar()

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
        content: `[Publicacion en Instagram](${url})`
      }
    ],
    footer: `Fecha: ${price.date}`
  })
}
