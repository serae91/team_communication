import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import MessageCard from './message-card/MessageCard.tsx';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard.tsx';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard.tsx';
import ChatModal from '../../../modals/ChatModal.tsx';
import { useWebSocket } from '../../../../contexts/createWebSocketContext.tsx';
import { useChats } from '../../../../contexts/BLChatContext.tsx';

interface InboxProps {

}

function Inbox(props: InboxProps): JSX.Element {
  //const [chats, setChats] = useState<BLChatPlainDto[]>([]);
  const {messages, sendMessage} = useWebSocket();
  const { chats, activeChatId, setActiveChatId } = useChats();
  const [isChatOpen, setChatOpen] = useState(false);
  //const [openedChatId, setOpenedChatId] = useState(0);

  useEffect(() => {
    /*getChatListPlainByUserId(1/*TODO replace*//*).then(chats=>{
      setChats(chats);
    });*/
  }, []);

  const listChatsPlain = () =>
  {
    if(!chats?.length) return <p>No messages received yet</p>
    return (chats.map(chat=>
      <MessageCard
        key={chat.id.toString()}
        title={chat.title} message={'test message'}
        sender={'test sender'} color={'red'}
        onClick={()=>{
          console.log('chat.id',chat.id)
          setActiveChatId(chat.id);
          setChatOpen(true);
        }}
      />
    ))};

  const setNextChat = () => {
    const currentChatIndex = chats.findIndex(chat=>chat.id===activeChatId);
    if (currentChatIndex === undefined) return;
    const nextChatIndex = (currentChatIndex < messages.length - 1) ? currentChatIndex + 1 : 0;
    const nextId = messages[nextChatIndex]?.id;
    if (!nextId) return;
    setActiveChatId(nextId);
  }
  console.log('messages', messages);
  return(
    <BLContentCard className={'inbox relative'}>
      <ChatModal
        isOpen={isChatOpen}
        chatId={activeChatId??0}
        onClose={()=> {setChatOpen(false);}}
        setNextChat={setNextChat}
      />
      <div className={ 'title-box flex-col' }>
        <div className={ 'title' }>
          Inbox
        </div>
        <div className={ 'sub-title' }>
          A collection of all your messages
        </div>
      </div>
      <BLHintCard hintCardType={'error'}>
        Number of messages marked as "Urgent" waiting for your response
      </BLHintCard>

      {listChatsPlain()}
    </BLContentCard>

  );
}

export default Inbox;