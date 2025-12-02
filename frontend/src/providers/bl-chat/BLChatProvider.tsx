import React, { createContext, useContext, useEffect, useState } from "react";
import type { BLChatPlainDto } from '../../dtos/BLChatPlainDto.ts';
import { getChatListPlainByUserId } from '../../services/ChatService.ts';
import type { BLMessageDto } from '../../dtos/BLMessageDto.ts';

interface BLChatContextType {
  chats: BLChatPlainDto[];
  setChats:  React.Dispatch<React.SetStateAction<BLChatPlainDto[]>>
  activeChatId: number | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<number | null>>;
}

const BLChatContext = createContext<BLChatContextType | null>(null);

export const BLChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<BLChatPlainDto[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  return (
    <BLChatContext.Provider value={{ chats, setChats, activeChatId, setActiveChatId }}>
      {children}
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
