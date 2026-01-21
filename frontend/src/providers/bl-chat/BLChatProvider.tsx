import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import type { ChatUserView } from '../../dtos/ChatUserView.ts';
import type { WebsocketMessage } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useWebSocket } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { useAuth } from '../auth/AuthProvider.tsx';
import { getChatUserViews, setReminder, triggerDone } from '../../services/RelChatUserAttrService.ts';
import { useChatBox } from '../chat-box/ChatBoxProvider.tsx';
import { ChatBoxEnum } from '../../enums/ChatBoxEnum.ts';
import { useSearchParams } from 'react-router-dom';
import type { BLRelChatUserAttrSetReminderDto } from '../../dtos/BLRelChatUserAttrDto.ts';
import { ReminderStatusEnum } from '../../enums/ReminderStatusEnum.ts';
import { getCurrentChatBox } from '../../utils/chat-user-view-utils/ChatUserViewUtils.ts';

interface BLChatProviderProps {
  children: ReactNode;
}

interface BLChatContextType {
  chats: ChatUserView[];
  setChats: Dispatch<React.SetStateAction<ChatUserView[]>>;
  activeChatId: number | null;
  setActiveChatId: Dispatch<React.SetStateAction<number | null>>;
  getActiveChat: () => ChatUserView | undefined;
  setNextChat: () => void;
  remind: () => void;
  setDone: () => void;
  moveChatsToBox: (movedChats: ChatUserView[], fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => void;
}

const BLChatContext = createContext<BLChatContextType | null>(null);

export const BLChatProvider = ({children}: BLChatProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [chats, setChats] = useState<ChatUserView[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(() => {
    const param = searchParams.get('activeChatId');
    return param ? JSON.parse(param) : null;
  });
  const {removeMessageHandler, addMessageHandler, send} = useWebSocket();
  const {user} = useAuth();
  const {chatBox, pagination, sortField, sortDirection, onMoveChatsToBox} = useChatBox();

  const getActiveChat = () => {
    return chats.find(chat => chat.chatId === activeChatId);
  };

  const setNextChat = () => {
    const currentChatIndex = chats.findIndex(chat => chat.chatId === activeChatId);
    if (currentChatIndex === -1) return;
    const nextChatIndex = (currentChatIndex < chats.length - 1) ? currentChatIndex + 1 : 0;
    const nextId = chats[nextChatIndex]?.chatId;
    if (!nextId) return;
    setActiveChatId(nextId);
  };

  useEffect(() => {
    if (!activeChatId) {
      setSearchParams(prev => {
        prev.delete('activeChatId');
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.set('activeChatId', JSON.stringify(activeChatId));
        return prev;
      });
    }
  }, [activeChatId, setSearchParams]);

  useEffect(() => {
    getChatUserViews(chatBox, pagination, sortField, sortDirection).then(chats => {
      console.log(chats);
      setChats(chats);
    });
  }, [user, chatBox, pagination, sortField, sortDirection]);

  useEffect(() => {
    send({
      type: 'SWITCH_CHAT',
      chatId: activeChatId,
    });
  }, [activeChatId, send]);

  const moveChatsToBox = useCallback((movedChats: ChatUserView[], fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => {
    onMoveChatsToBox(movedChats.length, fromBox, toBox);
    if (!movedChats.length || fromBox === toBox || chatBox === ChatBoxEnum.ALL) return;
    if (chatBox === fromBox) {
      const movedChatIds = movedChats.map(chat => chat.chatId);
      setChats(prev => prev.filter(chat => !movedChatIds.includes(chat.chatId)));
    } else if (chatBox === toBox) {
      setChats(prev => [...movedChats, ...prev]);
    }
  }, [chatBox, onMoveChatsToBox]);

  useEffect(() => {
    const handler = (msg: WebsocketMessage) => {
      console.log('msg', msg);
      const payload: WebsocketMessage =
        typeof msg === 'string' ? JSON.parse(msg) : msg;

      switch (payload.type) {
        case 'RECEIVE_REMINDER': {
          const inBoxReminder = payload.chats.filter(chat => chat.lastMessageUserId !== user?.id);
          const sentBoxReminder = payload.chats.filter(chat => chat.lastMessageUserId === user?.id);
          moveChatsToBox(inBoxReminder, ChatBoxEnum.REMINDER, ChatBoxEnum.INBOX);
          moveChatsToBox(sentBoxReminder, ChatBoxEnum.REMINDER, ChatBoxEnum.SENT);
          break;
        }
        case 'RECEIVE_CHAT':
          setChats((prev) => [...prev, payload.chatUserView]);
          break;
        case 'RECEIVE_UPDATED_CHAT':
          moveChatsToBox([payload.chatUserView], payload.fromBox, payload.chatUserView.userId === payload.chatUserView.lastMessageUserId ? ChatBoxEnum.SENT : ChatBoxEnum.INBOX);
          break;
      }
    };

    addMessageHandler(handler);
    return () => removeMessageHandler(handler);
  }, [addMessageHandler, chatBox, moveChatsToBox, onMoveChatsToBox, removeMessageHandler, user?.id]);

  const remind = () => {
    const activeChat = getActiveChat();
    if (!activeChat || !user) return;
    const now = new Date();
    const inFiveMinutes = new Date(now.getTime() + 15 * 1000);
    setReminder({chatId: activeChatId, reminderAt: inFiveMinutes} as BLRelChatUserAttrSetReminderDto).then(() => {
      if (chatBox === ChatBoxEnum.REMINDER) {
        setChats(prev => prev.map(chat => {
          if (chat.chatId !== activeChatId) return chat;
          return {...chat, reminderAt: inFiveMinutes, reminderStatus: ReminderStatusEnum.SCHEDULED} as ChatUserView;
        }));
      } else {
        moveChatsToBox([activeChat], getCurrentChatBox(activeChat, user), ChatBoxEnum.REMINDER);
      }
      setActiveChatId(null);
    });
  };

  const setDone = () => {
    const activeChat = getActiveChat();
    if (!activeChatId || !activeChat) return;
    triggerDone(activeChatId).then(() => {
      if (activeChat && user) {
        moveChatsToBox([activeChat], getCurrentChatBox(activeChat, user), ChatBoxEnum.ALL);
      }
      setActiveChatId(null);
    });

  };

  return (
    <BLChatContext.Provider
      value={ {
        chats,
        setChats,
        activeChatId,
        setActiveChatId,
        getActiveChat,
        setNextChat,
        remind,
        setDone,
        moveChatsToBox
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
