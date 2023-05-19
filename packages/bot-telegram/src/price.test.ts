import { Types } from '@monitor/core'

export const prices: Types.Price[] = [
  {
    id: '630bdb4cd8a676e327110b4a',
    source: {
      id: '636fb2540596a2a5698c027d',
      name: 'En Paralelo Vzla',
      logo: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/logos/en-paralelo.png',
      banner: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/banners/en-paralelo.png',
      link: {
        label: '@monitordolarvla',
        url: 'https://twitter.com/monitordolarvla/'
      },
      type: 'fiat',
      country: 'venezuela',
      symbol: 'Bs',
      enabled: true
    },
    currencies: [
      {
        symbol: 'USD',
        amount: 7.8,
        trend: {
          label: 'equal',
          emoji: '🟢',
          amount: 0.1,
          percentage: 0.5
        }
      },
      {
        symbol: 'EUR',
        amount: 7.86,
        trend: {
          label: 'equal',
          emoji: '⚪',
          amount: 0,
          percentage: 0
        }
      }
    ],
    timestamp: '2022-08-28T21:17:00.218+0000',
    createdAt: '2022-08-28T21:17:00.219+0000'
  },
  {
    id: '630bdb4ad8a676e327110b44',
    source: {
      id: '636483fcab475faab4557317',
      name: 'Dolar Today',
      logo: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/logos/dolar-today.png',
      banner: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/banners/dolar-today.png',
      link: {
        label: 'dolartoday.com',
        url: 'https://dolartoday.com'
      },
      type: 'fiat',
      country: 'venezuela',
      symbol: 'Bs',
      enabled: true
    },
    currencies: [
      {
        symbol: 'USD',
        amount: 8,
        trend: {
          label: 'equal',
          emoji: '⚪',
          amount: 1,
          percentage: 4
        }
      },
      {
        symbol: 'EUR',
        amount: 8.78,
        trend: {
          label: 'equal',
          emoji: '⚪',
          amount: 0,
          percentage: 0
        }
      }
    ],
    timestamp: '2022-08-28T21:00:00.000+0000',
    createdAt: '2022-08-28T21:16:58.878+0000'
  },
  {
    id: '638cd946cfd2bd44aedd3ac9',
    source: {
      id: '636483fcab475faab455731b',
      name: 'BCV',
      logo: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/logos/bcv.png',
      banner: 'https://raw.githubusercontent.com/EdixonAlberto/monitor-vzla/main/docs/banners/bcv.png',
      link: {
        label: 'bcv.org.ve',
        url: 'https://www.bcv.org.ve'
      },
      type: 'fiat',
      country: 'venezuela',
      symbol: 'Bs',
      enabled: true
    },
    currencies: [
      {
        symbol: 'USD',
        amount: 13.08,
        trend: {
          label: 'equal',
          emoji: '🔴',
          amount: 0.01,
          percentage: 0.5
        }
      }
    ],
    timestamp: '2022-12-02T17:14:00.000+0000',
    createdAt: '2022-12-04T17:30:46.793+0000'
  }
]
