import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode, useRef, type RefObject,
} from "react";
import { WebSocketService } from "../services/WebSocketService";
import { useBLChats } from './BLChatProvider.tsx';
import type { BLMessageDto } from '../dtos/BLMessageDto.ts';
import type { BLChatPlainDto } from '../dtos/BLChatPlainDto.ts';
import { useBLMessages } from './BLMessageProvider.tsx';

export interface ProviderProps {
  children: ReactNode;
}

type WebsocketMessage = WebSocketMessageIncoming | WebSocketMessageOutgoing;

type WebSocketMessageIncoming =
  | { type: "CHAT_MESSAGES"; chatId: number; blMessages: BLMessageDto[] }
  | { type: "RECEIVE_MESSAGE"; chatId: number; blMessage: BLMessageDto }
  | { type: "RECEIVE_CHAT"; blChat: BLChatPlainDto };

type WebSocketMessageOutgoing =
  | { type: "SEND_MESSAGE"; chatId: number; blMessage: BLMessageDto }
  | { type: "SWITCH_CHAT"; chatId: number; };

export type WebSocketContextType = {
  connected: boolean;
  send: (data: WebsocketMessage) => void;
  addMessageHandler: (fn: (msg: any) => void) => void;
  removeMessageHandler: (fn: (msg: any) => void) => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const BLWebSocketProvider = ({ children }: ProviderProps) => {
  const {chats, setChats, activeChatId, setActiveChatId} = useBLChats()
  const {messages, setMessages } = useBLMessages()
  const [connected, setConnected] = useState(false);
  const handlers = useRef(new Set<(msg: any) => void>());
  const webSocket = useRef(new WebSocketService<WebsocketMessage>("ws://localhost:8080/blwebsocket"));

  const onMessageIncoming = (): void => {
    webSocket.current.onMessage((msg) => {
      switch (msg.type) {
        case 'CHAT_MESSAGES': {setMessages(msg.blMessages);break;}
        case 'RECEIVE_MESSAGE': setMessages((prev) => [...prev, msg.blMessage]);break;
        case 'RECEIVE_CHAT': setChats((prev) => [...prev, msg.blChat]);break;
      }
    });
  }

  const onActiveChatId = (): void => {
    webSocket.current.send({
      type: "SWITCH_CHAT",
      chatId: activeChatId,
    } as WebSocketMessageOutgoing);
  }

  useEffect(() => {
    onMessageIncoming();
    webSocket.current.connect();
  }, [webSocket.current]);

  useEffect(() => {
    onActiveChatId()
  }, [activeChatId]);

  const sendMessage = (message: BLMessageDto) => {
    if (!activeChatId) return;
    webSocket.current.send({
      type: "SEND_MESSAGE",
      chatId: activeChatId,
      blMessage: message,
    });
  };

/*useEffect(() => {
  const ws = new WebSocket("ws://localhost:8080/chat");
  webSocket.current = ws;

  ws.onopen = () => setConnected(true);

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    handlers.current.forEach(h => h(msg));
  };

  ws.onclose = () => setConnected(false);

  return () => ws.close();
}, []);*/

const send = (data: WebsocketMessage) => {
  //if (webSocket.current?. === WebSocket.OPEN) {
    webSocket.current.send(data);
  //}
};

const addMessageHandler = (fn: (m: any) => void) => {
  handlers.current.add(fn);
};

const removeMessageHandler = (fn: (m: any) => void) => {
  handlers.current.delete(fn);
};

return (
  <WebSocketContext.Provider
    value={{ connected, send, addMessageHandler, removeMessageHandler }}
  >
    {children}
  </WebSocketContext.Provider>
);
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocketContext must be used inside the Provider");
  return context;
};
