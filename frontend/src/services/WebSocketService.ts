type MessageHandler<T> = (msg: T) => void;

export class WebSocketService<T> {
  private socket: WebSocket | null = null;
  private handlers: MessageHandler<T>[] = [];
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("[WS] Connected:", this.url);
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as T;
      this.handlers.forEach(h => h(data));
    };

    this.socket.onclose = () => {
      console.log("[WS] Disconnected — retry in 2s");
      setTimeout(() => this.connect(), 2000);
    };
  }

  send(message: T) {
    if (this.isConnected()) {
      this.socket!.send(JSON.stringify(message));
    } else {
      console.warn("[WS] Not connected, cannot send", message);
    }
  }

  onMessage(handler: MessageHandler<T>) {
    this.handlers.push(handler);
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
