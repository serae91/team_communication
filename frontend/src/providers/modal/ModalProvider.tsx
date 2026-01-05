import { createContext, type ReactNode, useContext, useState } from 'react';
import { GlobalModalTypeEnum, LocalModalTypeEnum } from '../../enums/LocalModalTypeEnum.ts';
import GlobalModalRenderer from '../../components/modals/global-modals/global-modal-renderer/GlobalModalRenderer.tsx';

export interface ModalProviderProps {
  children: ReactNode;
}

export type LocalModalState = | { type: LocalModalTypeEnum.JOIN_CHAT } | {
  type: LocalModalTypeEnum.CREATE_CHAT
};

export type GlobalModalState = | { type: GlobalModalTypeEnum.NONE };

export type ModalContextType = {
  globalModalState: GlobalModalState;
  openGlobalModal: (globalModalState: GlobalModalState) => void;
  closeGlobalModal: () => void;
  localModalState: LocalModalState[];
  openLocalModal: (localModalState: LocalModalState) => void;
  closeLocalModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({children}: ModalProviderProps) => {
  const [globalModalState, setGlobalModalState] = useState<GlobalModalState>({type: GlobalModalTypeEnum.NONE});
  const [localModalState, setLocalModalState] = useState<LocalModalState[]>([]);
  const openGlobalModal = (globalModalState: GlobalModalState) => setGlobalModalState(globalModalState);
  const closeGlobalModal = () => setGlobalModalState({type: GlobalModalTypeEnum.NONE});
  const value: ModalContextType = {
    globalModalState,
    openGlobalModal,
    closeGlobalModal,
    localModalState,
    openLocalModal,
    closeLocalModal
  };

  function openLocalModal(localModalState: LocalModalState) {
    setLocalModalState((prev) => [...prev, localModalState]);
  }

  function closeLocalModal() {
    setLocalModalState((prev) => prev.slice(0, -1));
  }


  return (
    <ModalContext.Provider value={ value }>
      { children }
      <GlobalModalRenderer/>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used inside the ModalProvider');
  return context;
};