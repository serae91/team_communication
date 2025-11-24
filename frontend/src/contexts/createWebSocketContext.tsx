import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode, useRef, type RefObject,
} from "react";
import { WebSocketService } from "../services/WebSocketService";
import { useChats } from './BLChatContext.tsx';
import type { BLMessageDto } from '../dtos/BLMessageDto.ts';
import type { BLChatPlainDto } from '../dtos/BLChatPlainDto.ts';

export interface ProviderProps {
  children: ReactNode;
}

type WebSocketMessageIncoming =
  | { type: "CHAT_MESSAGES"; chatId: number; blMessages: BLMessageDto[] }
  | { type: "RECEIVE_MESSAGE"; chatId: number; blMessage: BLMessageDto }
  | { type: "RECEIVE_CHAT"; blChat: BLChatPlainDto };

type WebSocketMessageOutgoing =
  | { type: "SEND_MESSAGE"; chatId: number; blMessage: BLMessageDto }
  | { type: "SWITCH_CHAT"; chatId: number; };

type WebSocketContextType = {
  messages: BLMessageDto[];
  sendMessage: (msg: BLMessageDto) => void;
  setActiveChatId: (newActiveChatId: number) => void;
};
const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const BLMessageProvider = ({ children }: ProviderProps) => {
  const {chats, setChats, activeChatId, setActiveChatId} = useChats()
  const [messages, setMessages] = useState<BLMessageDto[]>([]);
  const ws = useRef(new WebSocketService<WebSocketMessageIncoming | WebSocketMessageOutgoing>("ws://localhost:8080/messagewebsocket"));

  const onWebSocket = (): void => {
    ws.current.onMessage((msg) => {
      switch (msg.type) {
        case 'CHAT_MESSAGES': {setMessages(msg.blMessages);break;}
        case 'RECEIVE_MESSAGE': setMessages((prev) => [...prev, msg.blMessage]);break;
        case 'RECEIVE_CHAT': setChats((prev) => [...prev, msg.blChat]);break;
      }
    });
  }

  const onActiveChatId = (): void => {
    ws.current.onMessage((msg) => {
      if (!activeChatId) return;
      ws.current.send({
        type: "SWITCH_CHAT",
        chatId: activeChatId,
      } as WebSocketMessageOutgoing);
    });
  }

  useEffect(() => {
    onWebSocket();
    ws.current.connect();
  }, [ws.current]);

  useEffect(() => {
    onActiveChatId()
  }, [activeChatId]);

  const sendMessage = (message: BLMessageDto) => {
    if (!activeChatId) return;
    ws.current.send({
      type: "SEND_MESSAGE",
      chatId: activeChatId,
      blMessage: message,
    });
  };

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage, setActiveChatId }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocketContext must be used inside the Provider");
  return context;
};
