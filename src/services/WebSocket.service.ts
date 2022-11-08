import { io, Socket } from 'socket.io-client'

export class WebSocketService {
  private URL_WS = process.env.WS_URL as string
  public static socket: Socket

  constructor() {}

  run() {
    WebSocketService.socket = io(this.URL_WS, {
      // path,
      // transports
      // auth: {
      //   token: ''
      // }
    })

    this.events()
  }

  events(ws = WebSocketService.socket) {
    ws.on('connect', () => {
      console.log(`[WS] - Client "${WebSocketService.socket.id}" connected`)
    })

    ws.on('disconnect', (reason: any) => {
      console.log(`[WS] - Client disconnected, reason: ${reason}`)
    })

    ws.on('exception', (error: any) => {
      console.log('[WS] -', error)
    })
  }
}
