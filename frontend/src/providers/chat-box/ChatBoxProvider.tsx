import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { ChatBoxEnum } from '../../enums/ChatBoxEnum.ts';
import { SortDirectionEnum } from '../../enums/SortDirectionEnum.ts';
import type { PaginationDto } from '../../dtos/PaginationDto.ts';
import { ChatSortFieldEnum } from '../../enums/ChatSortFieldEnum.ts';
import type { ChatBoxCountDto } from '../../dtos/ChatBoxCountDto.ts';
import { getChatBoxCount } from '../../services/RelChatUserAttrService.ts';
import { useAuth } from '../auth/AuthProvider.tsx';
import { useSearchParams } from 'react-router-dom';


interface ChatBoxProviderProps {
  children?: ReactNode;
}

type ChatBoxContextType = {
  chatBoxCount: ChatBoxCountDto,
  setChatBoxCount: Dispatch<SetStateAction<ChatBoxCountDto>>,
  chatBox: ChatBoxEnum;
  setChatBox: Dispatch<SetStateAction<ChatBoxEnum>>;
  sortField: ChatSortFieldEnum;
  setSortField: Dispatch<SetStateAction<ChatSortFieldEnum>>;
  sortDirection: SortDirectionEnum;
  setSortDirection: Dispatch<SetStateAction<SortDirectionEnum>>;
  pagination: PaginationDto;
  setPagination: Dispatch<SetStateAction<PaginationDto>>;
  onMoveChatsToBox: (count: number, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => void;
}

const ChatBoxContext = createContext<ChatBoxContextType | null>(null);


const ChatBoxProvider = ({children}: ChatBoxProviderProps) => {
  const {user} = useAuth();
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
  const [searchParams, setSearchParams] = useSearchParams();

  const getNewChatBoxCount = useCallback((count: number, prevCount: number, box: ChatBoxEnum, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => {
    if (fromBox === box) return prevCount - count;
    if (toBox === box) return prevCount + count;
    return prevCount;
  }, []);

  const getChatCountOnMoveChatToBox = useCallback((count: number, prevChatBoxCount: ChatBoxCountDto, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => ({
    inboxCount: getNewChatBoxCount(count, prevChatBoxCount.inboxCount, ChatBoxEnum.INBOX, fromBox, toBox),
    sentCount: getNewChatBoxCount(count, prevChatBoxCount.sentCount, ChatBoxEnum.SENT, fromBox, toBox),
    reminderCount: getNewChatBoxCount(count, prevChatBoxCount.reminderCount, ChatBoxEnum.REMINDER, fromBox, toBox),
    totalCount: prevChatBoxCount.totalCount
  } as ChatBoxCountDto), [getNewChatBoxCount]);

  const onMoveChatsToBox = useCallback((count: number, fromBox: ChatBoxEnum, toBox: ChatBoxEnum) => {
    if (!count || fromBox === toBox) return;
    setChatBoxCount(prev => getChatCountOnMoveChatToBox(count, prev, fromBox, toBox));
  }, [getChatCountOnMoveChatToBox]);

  useEffect(() => {
    getChatBoxCount().then(setChatBoxCount);
  }, [user]);

  useEffect(() => {
    const chatBox = searchParams.get('chatBox') as ChatBoxEnum;
    if (chatBox) {
      setChatBox(chatBox);
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(prev => {
      prev.set('chatBox', chatBox);
      return prev;
    });
  }, [chatBox, setSearchParams]);

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
    setPagination,
    onMoveChatsToBox
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