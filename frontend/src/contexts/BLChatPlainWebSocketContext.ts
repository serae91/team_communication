import { createWebSocketContext } from "./createWebSocketContext.tsx";
import type { BLChatPlainDto } from '../dtos/BLChatPlainDto.ts';

export const {
  Provider: BLChatPlainWebSocketProvider,
  useWebSocketContext: useBLChatPlainWebSocket
} = createWebSocketContext<BLChatPlainDto>("ws://localhost:8080/chatwebsocket");
