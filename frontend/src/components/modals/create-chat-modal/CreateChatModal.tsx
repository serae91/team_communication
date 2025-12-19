import BLModal from '../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import type { BLChatCreateDto } from '../../../dtos/BLChatDto.ts';
import type {
  WebsocketMessage
} from '../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import ChatMessenging from '../../system/chat-system/chat-messenging/ChatMessenging.tsx';
import { useModal } from '../../../providers/modal/ModalProvider.tsx';
import BLMultiSelect, { type GmailLabel } from '../../ui/bl-multi-select/BLMultiSelect.tsx';
import LabelIcon from '@mui/icons-material/Label';
import { useState } from 'react';
import {
  useWebSocket
} from '../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';

interface CreateChatModalProps {
  onClose: () => void;
}

const CreateChatModal = ({onClose}: CreateChatModalProps) => {
  const {send} = useWebSocket();
  const {closeModal} = useModal();
  const [selected, setSelected] = useState<string[]>([]);
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
    closeModal();
    if (onClose) onClose();
  };
  return (
    <BLModal modalType={ 'CREATE_CHAT' }>
      <BLLeftMarkedCard>
        <BLMultiSelect
          labels={ dummyLabels }
          value={ selected }
          onChange={ setSelected }
          placeholder="Choose labels…"
        />
        <ChatMessenging messages={ [] } sendMessage={ sendCreateChatMessage }/>
      </BLLeftMarkedCard>
    </BLModal>)
}

export default CreateChatModal;

export const dummyLabels: GmailLabel[] = [
  {
    id: "1",
    name: "Important",
    color: "#e53935", // rot
    icon: <LabelIcon/>,
  },
  {
    id: "2",
    name: "Work",
    color: "#1e88e5", // blau
    icon: <LabelIcon/>,
  },
  {
    id: "3",
    name: "Personal",
    color: "#43a047", // grün
    icon: <LabelIcon/>,
  },
  {
    id: "4",
    name: "Family",
    color: "#8e24aa", // lila
    icon: <LabelIcon/>,
  },
  {
    id: "5",
    name: "Travel",
    color: "#fb8c00", // orange
    icon: <LabelIcon/>,
  },
];
