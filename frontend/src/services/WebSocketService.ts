type MessageHandler<T> = (msg: T) => void;
type Handler = () => void;

export class WebSocketService<T> {
  private socket: WebSocket | null = null;
  private handlers: MessageHandler<T>[] = [];
  private openHandlers: Handler[] = [];
  private closeHandlers: Handler[] = [];
  private sendQueue: T[] = [];
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
      this.openHandlers.forEach(h => h());
      this.sendQueue.forEach(m => this.socket!.send(JSON.stringify(m)));
      this.sendQueue = [];
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as T;
      this.handlers.forEach(h => h(data));
    };

    this.socket.onclose = () => {
      console.log("[WS] Disconnected — retry in 2s");
      this.closeHandlers.forEach(h => h());
      this.socket = null;
      setTimeout(() => this.connect(), 2000);
    };
  }

  send(message: T) {
    if (this.isConnected()) {
      this.socket!.send(JSON.stringify(message));
    } else {
      this.sendQueue.push(message);
      console.warn("[WS] Not connected, cannot send", message);
    }
  }

  onOpen(handler: Handler) {
    this.openHandlers.push(handler);
  }

  removeOnOpen(handler: Handler) {
    this.openHandlers = this.openHandlers.filter(h => h !== handler);
  }

  onClose(handler: Handler) {
    this.closeHandlers.push(handler);
  }

  removeOnClose(handler: Handler) {
    this.closeHandlers = this.closeHandlers.filter(h => h !== handler);
  }

  onMessage(messageHandler: MessageHandler<T>) {
    this.handlers.push(messageHandler);
  }

  removeMessageHandler(handler: MessageHandler<T>) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
