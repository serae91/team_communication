import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { BLChatDto } from '../../dtos/BLChatDto.ts';
import type { WebsocketMessage } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useWebSocket } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { useAuth } from '../auth/AuthProvider.tsx';
import { getChats } from '../../services/ChatService.ts';

interface BLChatContextType {
  chats: BLChatDto[];
  setChats: React.Dispatch<React.SetStateAction<BLChatDto[]>>;
  chatsWithReminder: BLChatDto[];
  chatsWithoutReminder: BLChatDto[];
  activeChatId: number | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<number | null>>;
}

const BLChatContext = createContext<BLChatContextType | null>(null);

export const BLChatProvider = ({children}: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<BLChatDto[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const {removeMessageHandler, addMessageHandler} = useWebSocket<WebsocketMessage>();
  const {user} = useAuth();


  const chatsWithReminder = useMemo(
    () => chats.filter(chat => chat.reminderStatus === 'SCHEDULED' || chat.reminderStatus === 'TRIGGERED'),
    [chats]
  );

  const chatsWithoutReminder = useMemo(
    () => chats.filter(chat => chat.reminderStatus === 'NONE'),
    [chats]
  );

  useEffect(() => {
    getChats().then(chats => setChats(chats));
  }, [user]);

  useEffect(() => {
    const handler = (msg: WebsocketMessage) => {
      switch (msg.type) {
        case 'RECEIVE_REMINDER':
          setChats(prev =>
            prev.map(chat =>
              msg.chatIds.includes(chat.id)
                ? {...chat, reminderStatus: 'TRIGGERED'} as BLChatDto
                : chat
            )
          );
          break;
        case 'RECEIVE_CHAT':
          setChats((prev) => [...prev, msg.blChat]);
          break;
      }
    };

    addMessageHandler(handler);
    return () => removeMessageHandler(handler);
  }, [addMessageHandler, removeMessageHandler]);

  return (
    <BLChatContext.Provider
      value={ {chats, setChats, chatsWithReminder, chatsWithoutReminder, activeChatId, setActiveChatId} }>
      { children }
    </BLChatContext.Provider>
  );
};

export const useBLChats = () => {
  const context = useContext(BLChatContext);
  if (!context) {
    throw new Error("useBLChats must be used inside <BLChatProvider>");
  }
  return context;
};
