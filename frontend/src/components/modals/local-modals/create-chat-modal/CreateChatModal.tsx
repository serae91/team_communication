import BLModal from '../../../ui/bl-modal/BLModal.tsx';
import type {
  WebsocketMessage
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useModal } from '../../../../providers/modal/ModalProvider.tsx';
import { useState } from 'react';
import {
  useWebSocket
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { LocalModalTypeEnum } from '../../../../enums/LocalModalTypeEnum.ts';
import type { BLChatCreateDto } from '../../../../dtos/BLChatCreateDto.ts';
import SearchSystem from '../../../system/search-system/SearchSystem.tsx';
import BLSelectableUserList, {
  type BLSelectableUser,
  type BLSelectableUserGroup
} from '../../../ui/bl-selectable-list/bl-selectable-user-list/BLSelectableUserList.tsx';
import BLLeftMarkedCard from '../../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';


const CreateChatModal = () => {
  const {send} = useWebSocket();
  const {closeLocalModal} = useModal();
  const [selected, setSelected] = useState<number[]>([]);
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
    <BLModal modalType={ LocalModalTypeEnum.CREATE_CHAT }>
      <BLLeftMarkedCard>
        <SearchSystem placeholder={ 'Search for a member' }></SearchSystem>
        <BLSelectableUserList users={ users } groups={ groups } selected={ selected } setSelected={ setSelected }/>
      </BLLeftMarkedCard>
    </BLModal>);
};

const users = [
  {id: 1, firstName: 'Gerald', lastName: 'Hopf', userName: 'userName'},
  {id: 2, firstName: 'Gerald', lastName: 'Hopf', userName: 'userName'}
] as BLSelectableUser[];

const groups = [
  {
    id: 1,
    groupName: 'group A',
    users: [
      {id: 3, firstName: 'Gerald', lastName: 'Hopf', userName: 'userName'},
      {id: 4, firstName: 'Gerald', lastName: 'Hopf', userName: 'userName'}
    ]
  },
  {
    id: 2,
    groupName: 'group B',
    users: [
      {id: 5, firstName: 'Gerald', lastName: 'Hopf', userName: 'userName'},
      {id: 6, firstName: 'Gerald', lastName: 'Hopf', userName: 'userName'}
    ]
  }
] as BLSelectableUserGroup[];
/*const items = [{
  id: 'a',
  primary: 'abc',
  secondary: 'def',
  start: 'start',
  end: () => 'end',
  onClick: () => console.log('a')
}, {
  id: 'b',
  //primary: 'bcde',
  secondary: 'cde',
  start: 'start',
  end: () => 'end',
  onClick: () => console.log('b')
}, {
  id: 'bc',
  primary: 'bcde',
  //secondary: 'cde',
  start: 'start',
  end: () => 'end',
  onClick: () => console.log('b')
}, {
  id: 'bx',
  primary: 'bcde',
  secondary: 'cde',
  //start: 'start',
  end: () => 'end',
  onClick: () => console.log('b')
}, {
  id: 'by',
  primary: 'bcde',
  secondary: 'cde',
  start: 'start',
  //end: 'end',
  onClick: () => console.log('b')
}] as BLListItemProps[];

const groupItems = [{
  listSubheader: 'You cose the members', listItems: [{
    id: 'a',
    //primary: 'abc',
    secondary: 'def',
    start: 'start',
    end: () => 'end',
    onClick: () => console.log('a')
  }, {
    id: 'f',
    primary: 'fghj',
    //secondary: 'ghh',
    start: 'start',
    end: () => 'end',
    onClick: () => console.log('b')
  }, {
    id: 'b',
    primary: <div className={ 'flex' }>
      <div className={ '' }>Carla Columna</div>
      <div className={ 'text-sm' }>@columna</div>
    </div>,
    start: 'start',
    //end: 'end',
    onClick: () => console.log('b')
  }, {
    id: 'k',
    primary:
      <div className={ 'flex items-center gap-2' }>
        <div className={ 'text-base font-medium text-[#181D27]' }>Phoenix Baker</div>
        <div className={ 'text-base font-normal text-[#535862]' }>@phoenix</div>
      </div>,
    //secondary: 'cde',
    start: 'start',
    end: () => <Checkbox
      edge="end"
      sx={ {
        color: '#000',
        '&.Mui-checked': {
          color: '#7F56D9',
        },
      } }
    />,
    onClick: () => console.log('b')
  }]
}, {
  listSubheader: 'All members', listItems: [{
    id: 'ab',
    primary: 'abc',
    secondary: 'def',
    start: 'start',
    end: () => 'end',
    onClick: () => console.log('a')
  }, {
    id: 'fb',
    primary: 'fghj',
    secondary: 'ghh',
    start: 'start',
    end: () => 'end',
    onClick: () => console.log('b')
  }]
}] as BLListItemGroupProps[];*/

export default CreateChatModal;

/*const dummyLabels: GmailLabel[] = [
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
];*/
