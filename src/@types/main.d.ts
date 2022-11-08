type TData = {
  response: string
  data: TPrice[]
}

type TPrice = {
  id: string
  source: {
    id: string
    name: string
    logo: string
    urlPublic: string
    type: 'fiat' | 'crypto'
    country: string
    symbol: string
    enabled: boolean
  }
  currencies: TCurrencie[]
  timestamp: Date
  createdAt: Date
}

type TCurrencie = {
  symbol: 'USD' | 'EUR'
  amount: number
  trend: TTrend
}

type TTrend = {
  label: 'up' | 'down' | 'equal'
  emoji: '🟢' | '🔴' | '⚪'
  amount: number
  percentage: number
}
