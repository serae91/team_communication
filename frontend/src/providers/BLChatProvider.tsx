import React, { createContext, useContext, useEffect, useState } from "react";
import type { BLChatPlainDto } from '../dtos/BLChatPlainDto.ts';
import { getChatListPlainByUserId } from '../services/ChatService.ts';
import type { BLMessageDto } from '../dtos/BLMessageDto.ts';

interface BLChatContextType {
  chats: BLChatPlainDto[];
  setChats: (blChats: BLChatPlainDto[] | ((blChats: BLChatPlainDto[]) => BLChatPlainDto[])) => void
  activeChatId: number | null;
  setActiveChatId: (chatId: number) => void;
}

const BLChatContext = createContext<BLChatContextType | null>(null);

export const BLChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<BLChatPlainDto[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  useEffect(() => {
    getChatListPlainByUserId(1/*TODO USER ID*/)
      .then((data: BLChatPlainDto[]) => {
        setChats(data);
        if (data[0]?.id) {
          setActiveChatId(data[0].id);
        }
      })
      .catch((e) => console.error("Failed to load chats:", e));
  }, []);

  return (
    <BLChatContext.Provider value={{ chats, setChats, activeChatId, setActiveChatId }}>
      {children}
    </BLChatContext.Provider>
  );
};

export const useBLChats = () => {
  const ctx = useContext(BLChatContext);
  if (!ctx) {
    throw new Error("useRooms must be used inside <RoomProvider>");
  }
  return ctx;
};
