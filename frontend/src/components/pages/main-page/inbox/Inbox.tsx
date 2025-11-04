import { JSX, useEffect, useState } from 'react';
import './Inbox.scss';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard';
import MessageCard from './message-card/MessageCard';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard';
import ChatSystem from '../../../system/chat-system/ChatSystem';
import { BLChatPlainDto } from '../../../../dtos/BLChatFullInfoDto';
import { getChatListPlainByUserId, getChatFullInfoById } from '../../../../services/ChatService';


interface InboxProps {

}

function Inbox(props: InboxProps): JSX.Element {
  const [chats, setChats] = useState<BLChatPlainDto[]>([]);

  useEffect(() => {
    getChatListPlainByUserId(1).then(chats=>{
      setChats(chats);
      console.log('chats', chats);
    })
    getChatFullInfoById(1).then(chat=>console.log('chat', chat));
  }, []);

  const listChatsPlain = () => {
    return (chats.map(chat=><MessageCard key={chat.id.toString()} title={chat.title} message={'test message'} sender={'test sender'} color={'red'}/>));
  }

  return(
    <BLContentCard className={'inbox'}>
      <div className={ 'title-box flex-col' }>
        <div className={ 'title' }>
          Inbox
        </div>
        <div className={ 'sub-title' }>
          A collection of all your messages
        </div>
      </div>
      <BLHintCard hintCardType={'error'}>Number of messages marked as "Urgent" waiting for your response</BLHintCard>
      {listChatsPlain()}
      <ChatSystem/>
    </BLContentCard>

  );
}

export default Inbox;