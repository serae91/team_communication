import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { BLMessageCreateDto, BLMessageDto } from '../../dtos/BLMessageDto.ts';
import type { WebsocketMessage } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import {
  useWebsocketMessageWebSocket
} from '../bl-websocket/bl-websocket-types/bl-messages-websocket/WebSocketMessageWebSocketProvider.ts';
import { useBLChats } from '../bl-chat/BLChatProvider.tsx';
import { getMessages } from '../../services/MessageService.ts';

interface BLMessageProviderProps {
  children: ReactNode;
}

type BLMessageContextType = {
  messages: BLMessageDto[];
  setMessages: Dispatch<SetStateAction<BLMessageDto[]>>
  sendMessage: (text: string) => void;
};
const BLMessageContext = createContext<BLMessageContextType | null>(null);

export const BLMessageProvider = ({children}: BLMessageProviderProps) => {
  const [messages, setMessages] = useState<BLMessageDto[]>([]);
  const {removeMessageHandler, addMessageHandler, send} = useWebsocketMessageWebSocket();
  const {activeChatId} = useBLChats();

  useEffect(() => {
    if (activeChatId === null) {
      setMessages([]);
      return;
    }
    getMessages(activeChatId).then(messages => setMessages(messages));
  }, [activeChatId]);

  useEffect(() => {
    const handler = (msg: WebsocketMessage) => {
      switch (msg.type) {
        case 'RECEIVE_MESSAGE':
          setMessages((prev) => [...prev, msg.blMessage]);
          break;
      }
    };

    addMessageHandler(handler);
    return () => removeMessageHandler(handler);
  }, [addMessageHandler, removeMessageHandler]);

  const sendMessage = (text: string) => {
    if (!activeChatId) return;
    const blMessageCreateDto = {
      chatId: activeChatId,
      text: text,
    } as BLMessageCreateDto;
    const message = {type: 'SEND_MESSAGE', chatId: activeChatId, blMessage: blMessageCreateDto} as WebsocketMessage;
    send(message);
  };

  return (
    <BLMessageContext.Provider value={ {messages, setMessages, sendMessage} }>
      { children }
    </BLMessageContext.Provider>
  );
};

export const useBLMessages = () => {
  const context = useContext(BLMessageContext);
  if (!context) throw new Error('useWebSocketContext must be used inside the Provider');
  return context;
};
