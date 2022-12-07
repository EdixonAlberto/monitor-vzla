export namespace Types {
  export type Data = {
    response: string
    data: Price[]
    error?: string
  }

  export type Price = {
    id: string
    source: {
      id: string
      name: string
      logo: string
      banner: string
      urlPublic: string
      type: 'fiat' | 'crypto'
      country: string
      symbol: string
      enabled: boolean
    }
    currencies: Currencie[]
    timestamp: Date
    createdAt: Date
  }

  export type Currencie = {
    symbol: 'USD' | 'EUR'
    amount: number
    trend: Trend
  }

  export type Trend = {
    label: 'up' | 'down' | 'equal'
    emoji: '🟢' | '🔴' | '⚪'
    amount: number
    percentage: number
  }

  export type Payload = {
    clientId: string
    query: { qty: string; source: string }
  }
}
