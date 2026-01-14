import React, { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { ChatUserAttrView } from '../../dtos/ChatUserAttrView.ts';
import type { WebsocketMessage } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useWebSocket } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { useAuth } from '../auth/AuthProvider.tsx';
import { getChatUserViews, setReminder } from '../../services/RelChatUserAttrService.ts';
import type { BLRelChatUserAttrSetReminderDto } from '../../dtos/BLRelChatUserAttrDto.ts';
import { ReminderStatusEnum } from '../../enums/ReminderStatusEnum.ts';
import { useChatBox } from '../chat-box/ChatBoxProvider.tsx';
import { ChatBoxEnum } from '../../enums/ChatBoxEnum.ts';

interface BLChatProviderProps {
  children: ReactNode;
}

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

export const BLChatProvider = ({children}: BLChatProviderProps) => {
  const [chats, setChats] = useState<ChatUserAttrView[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const {removeMessageHandler, addMessageHandler, send} = useWebSocket();
  const {user} = useAuth();
  const {chatBox, pagination, sortField, sortDirection, onMoveChatsToBox} = useChatBox();


  const chatsWithReminder = useMemo(
    () => chats.filter(chat => chat.reminderStatus === 'SCHEDULED' || chat.reminderStatus === 'TRIGGERED'),
    [chats]
  );

  const chatsWithoutReminder = useMemo(
    () => chats.filter(chat => chat.reminderStatus === 'NONE'),
    [chats]
  );

  const setNextChat = () => {
    const currentChatIndex = chats.findIndex(chat => chat.chatId === activeChatId);
    if (currentChatIndex === -1) return;
    const nextChatIndex = (currentChatIndex < chats.length - 1) ? currentChatIndex + 1 : 0;
    const nextId = chats[nextChatIndex]?.chatId;
    if (!nextId) return;
    setActiveChatId(nextId);
  };

  useEffect(() => {
    getChatUserViews(chatBox, pagination, sortField, sortDirection).then(chats => setChats(chats));
  }, [user, chatBox, pagination, sortField, sortDirection]);

  useEffect(() => {
    if (!activeChatId) return;
    send({
      type: 'SWITCH_CHAT',
      chatId: activeChatId,
    });
  }, [activeChatId, send]);

  useEffect(() => {
    const moveChatsToBox = (movedChats: ChatUserAttrView[], fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => {
      if (chatBox === fromBox) {
        const movedChatIds = movedChats.map(chat => chat.chatId);
        setChats(prev => prev.filter(chat => !movedChatIds.includes(chat.chatId)));
      } else if (chatBox === toBox) {
        setChats(prev => [...movedChats, ...prev]);
      }
      onMoveChatsToBox(movedChats.length, fromBox, toBox);
    };

    const handler = (msg: WebsocketMessage) => {
      const payload: WebsocketMessage =
        typeof msg === 'string' ? JSON.parse(msg) : msg;

      switch (payload.type) {
        case 'RECEIVE_REMINDER': {
          moveChatsToBox(payload.chats, ChatBoxEnum.REMINDER, ChatBoxEnum.INBOX);
          break;
        }
        case 'RECEIVE_CHAT':
          setChats((prev) => [...prev, payload.blChat]);
          break;
      }
    };

    addMessageHandler(handler);
    return () => removeMessageHandler(handler);
  }, [addMessageHandler, chatBox, removeMessageHandler]);

  const remind = () => {
    const currentChat = chats.find(chat => chat.chatId === activeChatId);
    if (!currentChat) return;
    const now = new Date();
    const inFiveMinutes = new Date(now.getTime() + 15 * 1000);
    setReminder({chatId: activeChatId, reminderAt: inFiveMinutes} as BLRelChatUserAttrSetReminderDto).then(v => {
      setChats(prev => prev.map(chat => {
        if (chat.chatId !== activeChatId) return chat;
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
