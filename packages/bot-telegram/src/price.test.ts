import { Types } from '@monitor/core'

export const price: Types.Price = {
  id: '1',
  source: {
    id: '1',
    name: 'En Paralelo Vzla',
    link: {
      label: 'dolartoday.com',
      url: 'https://twitter.com/monitordolarvla'
    },
    logo: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/logos/en-paralelo.png',
    banner: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/banners/en-paralelo.png',
    symbol: 'Bs',
    type: 'fiat',
    country: 'Venezuela',
    enabled: true
  },
  currencies: [
    {
      symbol: 'USD',
      amount: 15.2,
      trend: {
        label: 'up',
        amount: 0.22,
        percentage: 1.92,
        emoji: '🟢'
      }
    }
  ],
  timestamp: new Date(),
  createdAt: new Date()
}
