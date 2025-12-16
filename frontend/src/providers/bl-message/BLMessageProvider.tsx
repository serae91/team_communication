import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { BLMessageDto } from '../../dtos/BLMessageDto.ts';

export interface ProviderProps {
  children: ReactNode;
}

type BLMessageContextType = {
  messages: BLMessageDto[];
  setMessages: (blMessages: BLMessageDto[] | ((blMessages: BLMessageDto[]) => BLMessageDto[])) => void
};
const BLMessageContext = createContext<BLMessageContextType | null>(null);

export const BLMessageProvider = ({ children }: ProviderProps) => {
  const [messages, setMessages] = useState<BLMessageDto[]>([]);


  return (
    <BLMessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </BLMessageContext.Provider>
  );
};

export const useBLMessages = () => {
  const context = useContext(BLMessageContext);
  if (!context) throw new Error("useWebSocketContext must be used inside the Provider");
  return context;
};
