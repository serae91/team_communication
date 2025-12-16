import { createContext, type ReactNode, useContext, useState } from 'react';

export interface ModalProviderProps {
  children: ReactNode;
}

export type ModalType = 'CREATE_CHAT' | 'JOIN_CHAT' | null;

export type ModalContextType = {
  currentModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({children}: ModalProviderProps) => {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const openModal = (modalType: ModalType) => setCurrentModal(modalType);
  const closeModal = () => setCurrentModal(null);
  const value: ModalContextType = {currentModal, openModal, closeModal};

  return (
    <ModalContext.Provider value={ value }>
      { children }
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalOpen must be used inside the Provider');
  return context;
};