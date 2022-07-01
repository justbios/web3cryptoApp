export class SocketManager {
  static socketClient: WebSocket;
  static isSocketOpen: boolean = false;
  static socketChanel: any;
  private static instance: SocketManager;

  constructor(token: string, urlSocket: string) {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }
    SocketManager.instance = this;
    if (!SocketManager.socketClient) {
      SocketManager.socketClient = new WebSocket(urlSocket);

      SocketManager.socketClient.onopen = () => {
        SocketManager.isSocketOpen = true;
        try {
          SocketManager.socketClient.send(JSON.stringify({ action: 'SUBSCRIBE', token }));
        } catch (err) {
          console.log('=-=-=-=-=-=-', err);
        }
      };

      SocketManager.socketClient.onclose = (event) => {
        console.log('SOCKET CLOSED', event);
        SocketManager.isSocketOpen = false;
      };
    }
    return SocketManager.socketClient;
  }

  static wsSendEcho(value: any) {
    SocketManager.socketClient.send(JSON.stringify({ action: 'ECHO', data: value.toString() }));
  }

  static wsSendPing() {
    SocketManager.socketClient.send(JSON.stringify({ action: 'PING' }));
  }

  static wsSendToken(token: string) {
    try {
      if (SocketManager.isSocketOpen) {
        SocketManager.socketClient.send(JSON.stringify({ action: 'SUBSCRIBE', token }));
      }
    } catch (err) {
      console.log('=-=-=-=-=-=-', err);
    }
  }

  static removeSocket() {
    if (SocketManager.hasSocket()) {
      SocketManager.socketClient.close();
    }
  }

  static hasSocket() {
    return !!SocketManager.socketClient;
  }

  static addSocketChanel(eventChannel: any) {
    if (!SocketManager.socketChanel) {
      SocketManager.socketChanel = eventChannel;
    }
    return SocketManager.socketChanel;
  }

  static HasSocketChanel() {
    return !!SocketManager.socketChanel;
  }

  static RemoveSocketChanel() {
    if (SocketManager.HasSocketChanel()) {
      SocketManager.socketChanel.close();
      SocketManager.socketChanel = undefined;
    }
  }
}
