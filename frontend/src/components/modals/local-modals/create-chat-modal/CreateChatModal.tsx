import './CreateChatModal.scss';
import BLModal from '../../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import type {
  WebsocketMessage
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useModal } from '../../../../providers/modal/ModalProvider.tsx';
import {
  useWebsocketMessageWebSocket
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/WebSocketMessageWebSocketProvider.ts';
import type { BLChatCreateDto } from '../../../../dtos/BLChatCreateDto.ts';
import { CheckOutlined, ModeEditOutlined } from '@mui/icons-material';
import BLUserDropdownSearch from '../../../system/bl-user-dropdown-search/BLUserDropdownSearch.tsx';


const CreateChatModal = () => {
  const {send} = useWebsocketMessageWebSocket();
  const {closeLocalModal} = useModal();

  const sendCreateChatMessage = (text: string) => {
    const message = {
      type: 'CREATE_CHAT',
      chatCreateDto: {
        title: 'Perfectly tested title',
        firstMessageText: text,
        urgency: 'HIGH',
        userIds: [1, 3]
      } as BLChatCreateDto
    } as WebsocketMessage;
    send(message);
    closeLocalModal();
  };
  return (
    <BLModal>
      <BLLeftMarkedCard className={ 'create-chat-modal' }>
        <div className={ 'title-line' }>
          <div className={ 'title-start' }>
            <ModeEditOutlined className={ 'title-icon' }/>
            <div className={ 'title-text' }>Create a topic</div>
          </div>
          <div className={ 'title-end' }>
            <ModeEditOutlined/>
            <CheckOutlined/>
          </div>
        </div>
        <BLUserDropdownSearch/>
      </BLLeftMarkedCard>
    </BLModal>);
};

export default CreateChatModal;
