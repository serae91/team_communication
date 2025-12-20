import { useModal } from '../../../../../providers/modal/ModalProvider.tsx';
import { LocalModalTypeEnum } from '../../../../../enums/LocalModalTypeEnum.ts';
import ChatModal from '../ChatModal.tsx';

const ChatModalRenderer = () => {
  const {localModalState} = useModal()

  const topModalState = localModalState.at(-1);

  switch (topModalState?.type) {
    case LocalModalTypeEnum.JOIN_CHAT:
      return <ChatModal/>;
    default:
      return null;
  }
}
export default ChatModalRenderer;
