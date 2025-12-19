type MessageHandler<T> = (msg: T) => void;
type VoidHandler = () => void;

export class WebSocketService<T> {
  private socket: WebSocket | null = null;

  private messageHandlers: MessageHandler<T>[] = [];
  private openHandlers: VoidHandler[] = [];
  private closeHandlers: VoidHandler[] = [];

  private sendQueue: T[] = [];
  private manuallyClosed = false;

  private readonly url: string;
  private readonly reconnectDelayMs = 2000;

  constructor(url: string) {
    this.url = url;
  }

  /* -------------------- connection -------------------- */

  connect() {
    // Prevent double connect
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.manuallyClosed = false;
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("[WS] Connected:", this.url);

      this.openHandlers.forEach(h => h());

      // flush queued messages
      this.sendQueue.forEach(m =>
        this.socket!.send(JSON.stringify(m))
      );
      this.sendQueue = [];
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      try {
        const data = JSON.parse(event.data) as T;
        this.messageHandlers.forEach(h => h(data));
      } catch (err) {
        console.error("[WS] Invalid message:", event.data, err);
      }
    };

    this.socket.onclose = () => {
      console.log("[WS] Disconnected:", this.url);
      this.closeHandlers.forEach(h => h());
      this.socket = null;

      if (!this.manuallyClosed) {
        setTimeout(() => this.connect(), this.reconnectDelayMs);
      }
    };

    this.socket.onerror = (err) => {
      console.error("[WS] Error", err);
    };
  }

  close() {
    this.manuallyClosed = true;
    this.socket?.close();
    this.socket = null;
  }

  /* -------------------- send -------------------- */

  send(message: T) {
    if (this.isConnected()) {
      this.socket!.send(JSON.stringify(message));
    } else {
      console.warn("[WS] Not connected, queueing message");
      this.sendQueue.push(message);
    }
  }

  /* -------------------- handlers -------------------- */

  onMessage(handler: MessageHandler<T>) {
    this.messageHandlers.push(handler);
  }

  removeMessageHandler(handler: MessageHandler<T>) {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }

  onOpen(handler: VoidHandler) {
    this.openHandlers.push(handler);
  }

  removeOnOpen(handler: VoidHandler) {
    this.openHandlers = this.openHandlers.filter(h => h !== handler);
  }

  onClose(handler: VoidHandler) {
    this.closeHandlers.push(handler);
  }

  removeOnClose(handler: VoidHandler) {
    this.closeHandlers = this.closeHandlers.filter(h => h !== handler);
  }

  /* -------------------- state -------------------- */

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}
