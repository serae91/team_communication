import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { GlobalModalTypeEnum, LocalModalTypeEnum } from '../../enums/LocalModalTypeEnum.ts';
import GlobalModalRenderer from '../../components/modals/global-modals/global-modal-renderer/GlobalModalRenderer.tsx';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [globalModalState, setGlobalModalState] = useState<GlobalModalState>(() => {
      const param = searchParams.get('globalModalState');
      return param ? JSON.parse(param) : {type: GlobalModalTypeEnum.NONE};
    }
  );
  const [localModalState, setLocalModalState] = useState<LocalModalState[]>(() => {
    const param = searchParams.get('localModalState');
    return param ? JSON.parse(param) : [];
  });


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

  useEffect(() => {
    if (!localModalState.length) {
      setSearchParams(prev => {
        prev.delete('localModalState');
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.set('localModalState', JSON.stringify(localModalState));
        return prev;
      });
    }
  }, [localModalState, setSearchParams]);

  useEffect(() => {
    if (!globalModalState) {
      setSearchParams(prev => {
        prev.delete('globalModalState');
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.set('globalModalState', JSON.stringify(globalModalState));
        return prev;
      });
    }
  }, [globalModalState, setSearchParams]);


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