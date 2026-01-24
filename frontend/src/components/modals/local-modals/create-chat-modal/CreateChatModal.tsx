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
import {
  type BLSelectableUser,
  type BLSelectableUserGroup
} from '../../../ui/bl-selectable-list/bl-selectable-user-list/BLSelectableUserList.tsx';
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

const users = [
  {id: 1, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'},
  {id: 2, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'}
] as BLSelectableUser[];

const groups = [
  {
    id: 1,
    groupName: 'group A',
    users: [
      {id: 3, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'},
      {id: 4, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'}
    ]
  },
  {
    id: 2,
    groupName: 'group B',
    users: [
      {id: 5, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'},
      {id: 6, firstName: 'Gerald', lastName: 'Hopf', username: 'userName'}
    ]
  }
] as BLSelectableUserGroup[];


export default CreateChatModal;
