import React, { createContext, type ReactNode, useContext, useState } from 'react';
import { ChatBoxEnum } from '../../enums/ChatBoxEnum.ts';
import { SortDirectionEnum } from '../../enums/SortDirectionEnum.ts';
import type { PaginationDto } from '../../dtos/PaginationDto.ts';
import { ChatSortFieldEnum } from '../../enums/ChatSortFieldEnum.ts';


interface ChatBoxProviderProps {
  children?: ReactNode;
}

interface ChatBoxContextType {
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
  const [chatBox, setChatBox] = useState<ChatBoxEnum>(ChatBoxEnum.INBOX);
  const [sortField, setSortField] = useState<ChatSortFieldEnum>(ChatSortFieldEnum.LAST_MESSAGE_AT);
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum>(SortDirectionEnum.DESC);
  const [pagination, setPagination] = useState<PaginationDto>({page: 0, size: 20});
  const value = {
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