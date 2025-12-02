import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { WebSocketService } from "../../services/WebSocketService.ts";

export interface ProviderProps {
  children: ReactNode;
  connectionURL: string;
}

export type WebSocketContextType<T> = {
  connected: boolean;
  send: (data: T) => void;
  addMessageHandler: (fn: (msg: T) => void) => void;
  removeMessageHandler: (fn: (msg: T) => void) => void;
};

const WebSocketContext = createContext<WebSocketContextType<any> | null>(null);

export const createBLWebSocketProvider = <T, >()=> {
  const BLWebSocketProvider = ({children, connectionURL}: ProviderProps) => {
    const [connected, setConnected] = useState(false);
    const [service] = useState(() => new WebSocketService<T>(`ws://localhost:8080/${ connectionURL }`));

    useEffect(() => {
      service.connect();

      const handleOpen = () => setConnected(true);
      const handleClose = () => setConnected(false);

      service.onOpen(handleOpen);
      service.onClose(handleClose);

      return () => {
        service.removeOnOpen(handleOpen);
        service.removeOnClose(handleClose);
      };
    }, [service]);

    const addMessageHandler = (fn: (msg: T) => void) => service.onMessage(fn);
    const removeMessageHandler = (fn: (msg: T) => void) => service.removeMessageHandler(fn);
    const send = (msg: T) => service.send(msg);

    const value: WebSocketContextType<T> = {
      connected,
      send,
      addMessageHandler,
      removeMessageHandler,
    };

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
  };
  return BLWebSocketProvider;
}

export const useWebSocket = <T,>() => {
  const context = useContext(WebSocketContext) as WebSocketContextType<T>;
  if (!context) throw new Error("useWebSocketContext must be used inside the Provider");
  return context;
};
