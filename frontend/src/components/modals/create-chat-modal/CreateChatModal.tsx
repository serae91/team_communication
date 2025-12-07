import BLModal from '../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../../system/chat-system/ChatSystem.tsx';
import type { BLChatCreateDto } from '../../../dtos/BLChatPlainDto.ts';
import type {
  WebsocketMessage
} from '../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useWebSocket } from '../../../providers/bl-websocket/BLWebSocketProvider.tsx';
import ChatMessenging from '../../system/chat-system/chat-messenging/ChatMessenging.tsx';
import { useModal } from '../../../providers/modal/ModalProvider.tsx';
import BLMultiSelect from '../../ui/bl-multi-select/BLMultiSelect.tsx';

interface CreateChatModalProps {
  onClose: () => void;
}

export const CreateChatModal = ({ onClose }: CreateChatModalProps) => {
  const { send } = useWebSocket();
  const {closeModal} = useModal()
  const sendCreateChatMessage = (text: string) => {
    const message = {
      type:'CREATE_CHAT',
      chatCreateDto: {
        title: 'Perfectly tested title',
        firstMessageText: text,
        urgency: 'HIGH',
        senderId: 1,
        userIds: [1,3]
      } as BLChatCreateDto} as WebsocketMessage;
    send(message);
    closeModal();
    if(onClose)onClose();
  };
  return(
    <BLModal modalType={'CREATE_CHAT'}>
      <BLLeftMarkedCard>
        <BLMultiSelect/>
        <ChatMessenging messages={[]} sendMessage={sendCreateChatMessage}/>
      </BLLeftMarkedCard>
    </BLModal>)
}