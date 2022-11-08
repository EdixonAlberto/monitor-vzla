import { TCommand } from '@edixon/concord'

export const mock: TCommand = async ({ channels }) => {
  const CHANNEL_ID = process.env.CHANNEL_ID as string
  const channel = channels.get(CHANNEL_ID)

  channel &&
    channel.embeded({
      header: 'Airtm',
      imageHeader: 'https://drive.google.com/uc?id=1hQOcOa2xazHhyzsobIvGwk7RpDwwDY_X&export=download',
      body: [
        {
          title: 'Precio',
          content: `9.96Bs`,
          fieldType: 'column'
        },
        {
          title: 'Tendencia',
          content: `🟢 +1.91%`,
          fieldType: 'column'
        },
        {
          title: 'Hora',
          content: '1:30 p. m',
          fieldType: 'column'
        },
        {
          title: 'Fuente',
          content: `[https://rates.airtm.io](https://rates.airtm.io)`,
          fieldType: 'column'
        }
      ]
      // footer: 'Fecha: 7/11/2022'
    })
}
