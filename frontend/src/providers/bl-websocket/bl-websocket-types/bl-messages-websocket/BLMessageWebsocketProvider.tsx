import { createBLWebSocketProvider } from '../../BLWebSocketProvider.tsx';
import type { WebsocketMessage } from './bl-message-types.ts';

export const BLMessageWebsocketProvider = createBLWebSocketProvider<WebsocketMessage>();