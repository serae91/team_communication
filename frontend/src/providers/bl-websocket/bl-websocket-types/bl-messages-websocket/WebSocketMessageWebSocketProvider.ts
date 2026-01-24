import { createBLWebSocketProvider } from '../../BLWebSocketProvider.tsx';
import type { WebsocketMessage } from './bl-message-types.ts';

export const {
  BLWebSocketProvider: WebSocketMessageWebSocketProvider,
  useWebSocket: useWebsocketMessageWebSocket
} = createBLWebSocketProvider<WebsocketMessage>();