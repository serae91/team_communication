import { useModal } from '../../../../../providers/modal/ModalProvider.tsx';
import { LocalModalTypeEnum } from '../../../../../enums/LocalModalTypeEnum.ts';
import CreateChatModal from '../CreateChatModal.tsx';

const CreateChatModalRenderer = () => {
  const {localModalState} = useModal();

  const topModalState = localModalState.at(-1);

  switch (topModalState?.type) {
    case LocalModalTypeEnum.CREATE_CHAT:
      return <CreateChatModal/>;
    default:
      return null;
  }
};
export default CreateChatModalRenderer;
