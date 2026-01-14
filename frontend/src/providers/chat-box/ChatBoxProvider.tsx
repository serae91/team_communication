import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { ChatBoxEnum } from '../../enums/ChatBoxEnum.ts';
import { SortDirectionEnum } from '../../enums/SortDirectionEnum.ts';
import type { PaginationDto } from '../../dtos/PaginationDto.ts';
import { ChatSortFieldEnum } from '../../enums/ChatSortFieldEnum.ts';
import type { ChatBoxCountDto } from '../../dtos/ChatBoxCountDto.ts';
import { getChatBoxCount } from '../../services/RelChatUserAttrService.ts';
import { useAuth } from '../auth/AuthProvider.tsx';
import type { WebsocketMessage } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useWebSocket } from '../bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';


interface ChatBoxProviderProps {
  children?: ReactNode;
}

interface ChatBoxContextType {
  chatBoxCount: ChatBoxCountDto,
  setChatBoxCount: React.Dispatch<React.SetStateAction<ChatBoxCountDto>>,
  chatBox: ChatBoxEnum;
  setChatBox: React.Dispatch<React.SetStateAction<ChatBoxEnum>>;
  sortField: ChatSortFieldEnum;
  setSortField: React.Dispatch<React.SetStateAction<ChatSortFieldEnum>>;
  sortDirection: SortDirectionEnum;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirectionEnum>>;
  pagination: PaginationDto;
  setPagination: React.Dispatch<React.SetStateAction<PaginationDto>>;
}

const ChatBoxContext = createContext<ChatBoxContextType | null>(null);


const ChatBoxProvider = ({children}: ChatBoxProviderProps) => {
  const {user} = useAuth();
  const {addMessageHandler, removeMessageHandler} = useWebSocket();
  const [chatBoxCount, setChatBoxCount] = useState<ChatBoxCountDto>({
    inboxCount: 0,
    reminderCount: 0,
    sentCount: 0,
    totalCount: 0
  });
  const [chatBox, setChatBox] = useState<ChatBoxEnum>(ChatBoxEnum.INBOX);
  const [sortField, setSortField] = useState<ChatSortFieldEnum>(ChatSortFieldEnum.LAST_MESSAGE_AT);
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum>(SortDirectionEnum.DESC);
  const [pagination, setPagination] = useState<PaginationDto>({page: 0, size: 20});

  /*const onMoveChatsToBox = (count: number, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => {
    setChatBoxCount(prev => getChatCountOnMoveChatToBox(count, prev, fromBox, toBox));
  };

  const getChatCountOnMoveChatToBox = (count: number, prevChatBoxCount: ChatBoxCountDto, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => ({
    inboxCount: getNewChatBoxCount(count, prevChatBoxCount.inboxCount, ChatBoxEnum.INBOX, fromBox, toBox),
    sentCount: getNewChatBoxCount(count, prevChatBoxCount.sentCount, ChatBoxEnum.SENT, fromBox, toBox),
    reminderCount: getNewChatBoxCount(count, prevChatBoxCount.reminderCount, ChatBoxEnum.REMINDER, fromBox, toBox),
    totalCount: prevChatBoxCount.totalCount
  } as ChatBoxCountDto);

  const getNewChatBoxCount = (count: number, prevCount: number, box: ChatBoxEnum, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => {
    if (fromBox === box) return prevCount + count;
    if (toBox === box) return prevCount - count;
    return prevCount;
  };*/

  useEffect(() => {
    getChatBoxCount().then(setChatBoxCount);
  }, [user]);

  useEffect(() => {
    const handler = (msg: WebsocketMessage) => {
      const payload: WebsocketMessage =
        typeof msg === 'string' ? JSON.parse(msg) : msg;

      const getChatCountOnMoveChatToBox = (count: number, prevChatBoxCount: ChatBoxCountDto, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => ({
        inboxCount: getNewChatBoxCount(count, prevChatBoxCount.inboxCount, ChatBoxEnum.INBOX, fromBox, toBox),
        sentCount: getNewChatBoxCount(count, prevChatBoxCount.sentCount, ChatBoxEnum.SENT, fromBox, toBox),
        reminderCount: getNewChatBoxCount(count, prevChatBoxCount.reminderCount, ChatBoxEnum.REMINDER, fromBox, toBox),
        totalCount: prevChatBoxCount.totalCount
      } as ChatBoxCountDto);

      const getNewChatBoxCount = (count: number, prevCount: number, box: ChatBoxEnum, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => {
        if (fromBox === box) return prevCount - count;
        if (toBox === box) return prevCount + count;
        return prevCount;
      };
      switch (payload.type) {
        case 'RECEIVE_REMINDER':
          setChatBoxCount(prev => getChatCountOnMoveChatToBox(payload.chats.length, prev, ChatBoxEnum.REMINDER, ChatBoxEnum.INBOX));
          break;
      }
    };

    addMessageHandler(handler);
    return () => removeMessageHandler(handler);
  }, [addMessageHandler, removeMessageHandler]);

  const value = {
    chatBoxCount,
    setChatBoxCount,
    chatBox,
    setChatBox,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    pagination,
    setPagination
  } as ChatBoxContextType;

  return (
    <ChatBoxContext.Provider value={ value }>
      { children }
    </ChatBoxContext.Provider>
  );
};

export default ChatBoxProvider;

export const useChatBox = () => {
  const context = useContext(ChatBoxContext);
  if (!context) {
    throw new Error('useChatBox must be used inside <ChatBoxProvider>');
  }
  return context;
};