import BLModal from '../../../ui/bl-modal/BLModal.tsx';
import type {
  WebsocketMessage
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useModal } from '../../../../providers/modal/ModalProvider.tsx';
import { type GmailLabel } from '../../../ui/bl-multi-select/BLMultiSelect.tsx';
import LabelIcon from '@mui/icons-material/Label';
import { useState } from 'react';
import {
  useWebSocket
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { LocalModalTypeEnum } from '../../../../enums/LocalModalTypeEnum.ts';
import type { BLChatCreateDto } from '../../../../dtos/BLChatCreateDto.ts';
import SearchSystem from '../../../system/search-system/SearchSystem.tsx';


const CreateChatModal = () => {
  const {send} = useWebSocket();
  const {closeGlobalModal} = useModal();
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
    closeGlobalModal();
  };
  return (
    <BLModal modalType={ LocalModalTypeEnum.CREATE_CHAT }>
      <SearchSystem placeholder={ 'Search for a member' }></SearchSystem>
      {/*<BLLeftMarkedCard className={ 'h-122' }>
        <TextField
          placeholder="Search for a member"
          variant="outlined"
          fullWidth
          InputProps={ {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined color="action"/>
              </InputAdornment>
            ),
          } }
        />

        <Box sx={ {display: 'flex', flexWrap: 'wrap', gap: 0.5} }>
          { selected.map((id) => {
            const lbl = {
              id: '1',
              name: 'Important',
              color: '#e53935', // rot
              icon: <LabelIcon/>,
            };

            return (
              <Chip
                key={ id }
                label={ lbl.name }
                size="small"
                icon={ lbl.icon ?? <LabelIcon/> }
                sx={ {
                  background: lbl.color,
                  //color: theme.palette.getContrastText(lbl.color),
                  '& .MuiChip-icon': {color: 'inherit !important'},
                } }
              />
            );
          }) }
        </Box>
        <ChatMessenging messages={ [] } sendMessage={ sendCreateChatMessage }/>
      </BLLeftMarkedCard>*/ }
    </BLModal>);
};

export default CreateChatModal;

export const dummyLabels: GmailLabel[] = [
  {
    id: '1',
    name: 'Important',
    color: '#e53935', // rot
    icon: <LabelIcon/>,
  },
  {
    id: '2',
    name: 'Work',
    color: '#1e88e5', // blau
    icon: <LabelIcon/>,
  },
  {
    id: '3',
    name: 'Personal',
    color: '#43a047', // grün
    icon: <LabelIcon/>,
  },
  {
    id: '4',
    name: 'Family',
    color: '#8e24aa', // lila
    icon: <LabelIcon/>,
  },
  {
    id: '5',
    name: 'Travel',
    color: '#fb8c00', // orange
    icon: <LabelIcon/>,
  },
];
