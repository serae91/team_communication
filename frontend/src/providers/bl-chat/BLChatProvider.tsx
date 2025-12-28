import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ChatUserAttrView } from '../../dtos/ChatUserAttrView.ts';
import type { WebsocketMessage } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useWebSocket } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { useAuth } from '../auth/AuthProvider.tsx';
import { getChatUserViews, setReminder } from '../../services/RelChatUserAttrService.ts';
import type { BLRelChatUserAttrSetReminderDto } from '../../dtos/BLRelChatUserAttrDto.ts';
import { ReminderStatusEnum } from '../../enums/ReminderStatusEnum.ts';

interface BLChatContextType {
  chats: ChatUserAttrView[];
  setChats: React.Dispatch<React.SetStateAction<ChatUserAttrView[]>>;
  chatsWithReminder: ChatUserAttrView[];
  chatsWithoutReminder: ChatUserAttrView[];
  activeChatId: number | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<number | null>>;
  remind: () => void;
  setNextChat: () => void;
}

const BLChatContext = createContext<BLChatContextType | null>(null);

export const BLChatProvider = ({children}: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<ChatUserAttrView[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const {removeMessageHandler, addMessageHandler, send} = useWebSocket();
  const {user} = useAuth();


  const chatsWithReminder = useMemo(
    () => chats.filter(chat => chat.reminderStatus === 'SCHEDULED' || chat.reminderStatus === 'TRIGGERED'),
    [chats]
  );

  const chatsWithoutReminder = useMemo(
    () => chats.filter(chat => chat.reminderStatus === 'NONE'),
    [chats]
  );

  const setNextChat = () => {
    const currentChatIndex = chats.findIndex(chat => chat.id === activeChatId);
    if (currentChatIndex === -1) return;
    const nextChatIndex = (currentChatIndex < chats.length - 1) ? currentChatIndex + 1 : 0;
    const nextId = chats[nextChatIndex]?.id;
    if (!nextId) return;
    setActiveChatId(nextId);
  };

  useEffect(() => {
    getChatUserViews().then(chats => setChats(chats));
  }, [user]);

  useEffect(() => {
    if (!activeChatId) return;
    send({
      type: 'SWITCH_CHAT',
      chatId: activeChatId,
    });
  }, [activeChatId, send]);

  useEffect(() => {
    const handler = (msg: WebsocketMessage) => {
      console.log(msg);
      switch (msg.type) {
        case 'RECEIVE_REMINDER':
          setChats(prev =>
            prev.map(chat =>
              msg.chatIds.includes(chat.id)
                ? {...chat, reminderStatus: 'TRIGGERED'} as ChatUserAttrView
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

  const remind = () => {
    const currentChat = chats.find(chat => chat.id === activeChatId);
    if (!currentChat) return;
    const now = new Date();
    const inFiveMinutes = new Date(now.getTime() + 30 * 1000);
    setReminder({chatId: activeChatId, reminderAt: inFiveMinutes} as BLRelChatUserAttrSetReminderDto).then(v => {
      setChats(prev => prev.map(chat => {
        if (chat.id !== activeChatId) return chat;
        return {...chat, reminderAt: inFiveMinutes, reminderStatus: ReminderStatusEnum.SCHEDULED} as ChatUserAttrView;
      }));
    });
  };

  return (
    <BLChatContext.Provider
      value={ {
        chats,
        setChats,
        chatsWithReminder,
        chatsWithoutReminder,
        activeChatId,
        setActiveChatId,
        remind,
        setNextChat
      } }>
      { children }
    </BLChatContext.Provider>
  );
};

export const useBLChats = () => {
  const context = useContext(BLChatContext);
  if (!context) {
    throw new Error('useBLChats must be used inside <BLChatProvider>');
  }
  return context;
};
