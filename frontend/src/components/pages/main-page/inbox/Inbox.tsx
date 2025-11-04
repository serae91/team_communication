import { JSX, useEffect, useState } from 'react';
import './Inbox.scss';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard';
import MessageCard from './message-card/MessageCard';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard';
import ChatSystem from '../../../system/chat-system/ChatSystem';
import { BLChatDto } from '../../../../dtos/BLChatDto';
import { getAllChatsByUserId } from '../../../../services/ChatService';


interface InboxProps {

}

function Inbox(props: InboxProps): JSX.Element {
  const [chats, setChats] = useState<BLChatDto[]>([]);

  useEffect(() => {
    getAllChatsByUserId(1).then(chats=>{
      setChats(chats);
    })
  }, []);

  return(
    <BLContentCard className={'inbox'}>
      {chats.map(chat=> <div>{chat.messages.map(message=>{
        <div>{message.text}</div>
      })}</div>)}
      <div className={ 'title-box flex-col' }>
        <div className={ 'title' }>
          Inbox
        </div>
        <div className={ 'sub-title' }>
          A collection of all your messages
        </div>
      </div>
      <BLHintCard hintCardType={'error'}>Number of messages marked as "Urgent" waiting for your response</BLHintCard>
      <MessageCard title={'Development'} sender={ 'Phoenix Baker' } message={ 'ask for the api key for the backend.' } color={'red'}></MessageCard>
      <MessageCard title={'Development'} sender={ 'Marcus Lee' } message={ 'both requires the contact information of Microsoft and Google.' } color={'black'}></MessageCard>
      <ChatSystem/>
    </BLContentCard>

  );
}

export default Inbox;