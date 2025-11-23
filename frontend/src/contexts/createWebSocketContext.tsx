import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode, useRef,
} from "react";
import { WebSocketService } from "../services/WebSocketService";
import { useChats } from './BLChatContext.tsx';
import type { BLMessageDto } from '../dtos/BLMessageDto.ts';

export interface ProviderProps {
  children: ReactNode;
}

type WebSocketMessage =
  | { type: "CHAT_MESSAGES"; chatId: number; blMessages: BLMessageDto[] }
  | { type: "RECEIVE_MESSAGE"; chatId: number; blMessage: BLMessageDto }
  | { type: "SEND_MESSAGE"; chatId: number; blMessage: BLMessageDto }
  | { type: "SWITCH_CHAT"; chatId: number; };

type WebSocketContextType = {
  messages: BLMessageDto[];
  sendMessage: (msg: BLMessageDto) => void;
  setActiveChatId: (newActiveChatId: number) => void;
};
  const WebSocketContext = createContext<WebSocketContextType | null>(null);



  export const BLMessageProvider = ({ children }: ProviderProps) => {
    const {activeChatId, setActiveChatId} = useChats()
    const [messages, setMessages] = useState<BLMessageDto[]>([]);
    const ws = useRef(new WebSocketService<WebSocketMessage>("ws://localhost:8080/messagewebsocket"));

    useEffect(() => {
      console.log('register on message')
      ws.current.onMessage((msg) => {
        console.log('msg',msg)
        //if(msg.chatId !== activeChatId) return;
        console.log('id',msg.chatId !== activeChatId)
        console.log('type',msg.type !== 'CHAT_MESSAGES')
        switch (msg.type) {
          case 'CHAT_MESSAGES': {setMessages(msg.blMessages);console.log('set messages', msg.blMessages);break;}
          case 'RECEIVE_MESSAGE': setMessages((prev) => [...prev, msg.blMessage]);break;
        }


      });
        ws.current.connect();
    }, [ws.current]);

    useEffect(() => {
      console.log('Switch chat',activeChatId)
      if (!activeChatId) return;
      console.log('Switching chat')

      ws.current.send({
        type: "SWITCH_CHAT",
        chatId: activeChatId,
      } as WebSocketMessage);

      //setMessages([]);

    }, [activeChatId]);

    const sendMessage = (message: BLMessageDto) => {
      if (!activeChatId) return;

      ws.current.send({
        type: "SEND_MESSAGE",
        chatId: activeChatId,
        blMessage: message,
      });
    };


    /*const switchActiveChatId = (newActiveChatId: number) => {

   console.log('Switch Chat', newActiveChatId)
      ws.current.send({
        type: "SWITCH_CHAT",
        chatId: newActiveChatId,
      });
    }*/

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
