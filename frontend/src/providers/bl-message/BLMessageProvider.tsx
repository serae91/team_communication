import React, { createContext, type ReactNode, useContext, useEffect, useState, } from "react";
import type { BLMessageDto } from '../../dtos/BLMessageDto.ts';
import type { WebsocketMessage } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useWebSocket } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { useBLChats } from '../bl-chat/BLChatProvider.tsx';
import { getMessages } from '../../services/MessageService.ts';

export interface ProviderProps {
  children: ReactNode;
}

type BLMessageContextType = {
  messages: BLMessageDto[];
  setMessages: (blMessages: BLMessageDto[] | ((blMessages: BLMessageDto[]) => BLMessageDto[])) => void
};
const BLMessageContext = createContext<BLMessageContextType | null>(null);

export const BLMessageProvider = ({children}: ProviderProps) => {
  const [messages, setMessages] = useState<BLMessageDto[]>([]);
  const {removeMessageHandler, addMessageHandler} = useWebSocket<WebsocketMessage>();
  const {activeChatId} = useBLChats();

  useEffect(() => {
    if (activeChatId === null) return;
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

  return (
    <BLMessageContext.Provider value={ {messages, setMessages} }>
      { children }
    </BLMessageContext.Provider>
  );
};

export const useBLMessages = () => {
  const context = useContext(BLMessageContext);
  if (!context) throw new Error("useWebSocketContext must be used inside the Provider");
  return context;
};
