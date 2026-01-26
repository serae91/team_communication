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
import BLUserDropdownSearch from '../../../system/dropdown-search/bl-user-dropdown-search/BLUserDropdownSearch.tsx';
import ChatSystem from '../../../system/chat-system/ChatSystem.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import type { BLMessageDto } from '../../../../dtos/BLMessageDto.ts';
import { useAuth } from '../../../../providers/auth/AuthProvider.tsx';
import {
  BLUserMultiSelectProvider,
  useBLUserMultiSelect
} from '../../../../providers/multi-select/bl-selectable-user-multi-select-provider/BLUserMultiSelectProvider.tsx';
import BLLabelChip from '../../../ui/bl-label-chip/BLLabelChip.tsx';
import type { BLUserDto } from '../../../../dtos/BLUserDto.ts';


const CreateChatModalContent = () => {
  const {send} = useWebsocketMessageWebSocket();
  const {closeLocalModal} = useModal();
  const {messages, setMessages} = useBLMessages();
  const {user} = useAuth();
  const {selected, setSelected} = useBLUserMultiSelect();

  const sendCreateChatMessage = () => {
    const message = {
      type: 'CREATE_CHAT',
      chatCreateDto: {
        title: 'Perfectly tested title',
        firstMessages: messages,
        urgency: 'HIGH',
        userIds: selected.map(sel => sel.id)
      } as BLChatCreateDto
    } as WebsocketMessage;
    send(message);
    closeLocalModal();
  };

  const renderSelectedUsers = () => {
    console.log(selected);
    return (
      <div className={ 'flex' }>
        { selected.map(sel =>
          <BLLabelChip key={ sel.id } label={ ({...sel} as BLUserDto).username }/>) }
      </div>
    );
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
        { renderSelectedUsers() }
        <BLUserDropdownSearch/>
        <ChatSystem messages={ messages } sendMessage={ (text) => {
          setMessages(prev => {
            return [...prev, {text: text, createdAt: new Date(), sender: user}] as BLMessageDto[];
          });
        } } onClickSendButton={ sendCreateChatMessage }/>
      </BLLeftMarkedCard>
    </BLModal>);
};

const CreateChatModal = () => {
  return (<BLUserMultiSelectProvider>
    <CreateChatModalContent/>
  </BLUserMultiSelectProvider>);
};

export default CreateChatModal;
