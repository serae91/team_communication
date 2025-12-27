import React, { createContext, type ReactNode, useContext, useEffect, useState, } from 'react';
import { WebSocketService } from '../../services/WebSocketService.ts';

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

export const createBLWebSocketProvider = <T, >() => {
  const WebSocketContext = createContext<WebSocketContextType<T> | null>(null);

  const BLMessageWebSocketProvider = ({children, connectionURL}: ProviderProps) => {
    const [connected, setConnected] = useState(false);
    const [service, setService] = useState<WebSocketService<T> | null>(null);

    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.warn('No authToken yet, not connecting WS');
        return;
      }
      const token = encodeURIComponent(authToken);
      if (!token) {
        console.warn('No token yet, not connecting WS');
        return;
      }

      const ws = new WebSocketService<T>(
        `ws://localhost:8080/${ connectionURL }/${ token }`
      );

      ws.onOpen(() => setConnected(true));
      ws.onClose(() => setConnected(false));

      ws.connect();
      setService(ws);

      return () => {
        ws.close(); // 🔥 WICHTIG
        setService(null);
        setConnected(false);
      };
    }, [connectionURL /* + token, wenn aus AuthProvider */]);

    const addMessageHandler = (fn: (msg: T) => void) => {
      service?.onMessage(fn);
    };

    const removeMessageHandler = (fn: (msg: T) => void) => {
      service?.removeMessageHandler(fn);
    };

    const send = (msg: T) => {
      if (!service || !connected) return;
      service.send(msg);
    };

    const value: WebSocketContextType<T> = {
      connected,
      send,
      addMessageHandler,
      removeMessageHandler,
    };

    return (
      <WebSocketContext.Provider value={ value }>
        { children }
      </WebSocketContext.Provider>
    );
  };

  const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
      throw new Error('useWebSocket must be used inside BLMessageWebSocketProvider');
    }
    return context;
  };

  return {BLMessageWebSocketProvider, useWebSocket};
};
