import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { WebSocketService } from "../services/WebSocketService";

export interface ProviderProps {
  children: ReactNode;
}

export function createWebSocketContext<T>(url: string) {
  type ContextType = {
    messages: T[];
    sendMessage: (msg: T) => void;
  };

  const Context = createContext<ContextType | null>(null);

  const Provider = ({ children }: ProviderProps) => {
    const [messages, setMessages] = useState<T[]>([]);
    const [service] = useState(() => new WebSocketService<T>(url));

    useEffect(() => {
      service.connect();
      service.onMessage((msg) => setMessages((prev) => [...prev, msg]));
    }, [service]);

    return (
      <Context.Provider value={{ messages, sendMessage: (msg: T) => service.send(msg) }}>
        {children}
      </Context.Provider>
  );
  };

  const useWebSocketContext = () => {
    const contextType = useContext(Context);
    if (!contextType) throw new Error("useWebSocketContext must be used inside the Provider");
    return contextType;
  };

  return { Provider, useWebSocketContext };
}
