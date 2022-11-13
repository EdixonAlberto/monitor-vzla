import { io, Socket } from 'socket.io-client'

export class WebSocketService {
  private URL_WS = process.env.WS_URL as string
  public static socket: Socket

  constructor() {}

  public run() {
    WebSocketService.socket = io(this.URL_WS, {})
    this.events()
  }

  private events(ws = WebSocketService.socket) {
    ws.on('connect', () => {
      console.log(`[WS] - Client connected: "${ws.id}"`)
    })

    ws.on('disconnect', (reason: string) => {
      console.log(`[WS] - Client disconnected, reason: "${reason}"`)
    })

    ws.on('exception', (error: any) => {
      console.log('[WS] -', error)
    })
  }
}
