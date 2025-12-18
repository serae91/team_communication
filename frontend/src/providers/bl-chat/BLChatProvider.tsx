import React, { createContext, useContext, useState } from "react";
import type { BLChatDto } from '../../dtos/BLChatDto.ts';

interface BLChatContextType {
  chats: BLChatDto[];
  setChats: React.Dispatch<React.SetStateAction<BLChatDto[]>>
  activeChatId: number | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<number | null>>;
}

const BLChatContext = createContext<BLChatContextType | null>(null);

export const BLChatProvider = ({children}: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<BLChatDto[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  return (
    <BLChatContext.Provider value={ {chats, setChats, activeChatId, setActiveChatId} }>
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
