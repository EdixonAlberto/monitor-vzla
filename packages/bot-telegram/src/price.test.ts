import { Types } from '@monitor/core'

export const price: Types.Price = {
  id: '1',
  source: {
    id: '1',
    name: 'En Paralelo Vzla',
    urlPublic: 'https://www.instagram.com/enparalelovzla3',
    logo: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/logos/en-paralelo.png',
    symbol: 'Bs',
    type: 'fiat',
    country: 'Venezuela',
    enabled: true
  },
  currencies: [
    {
      symbol: 'USD',
      amount: 15,
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
