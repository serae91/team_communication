import { useModal } from '../../../../providers/modal/ModalProvider.tsx';

const GlobalModalRenderer = () => {
  const {globalModalState} = useModal();
  switch (globalModalState.type) {
    default:
      return null;
  }
};


export default GlobalModalRenderer;