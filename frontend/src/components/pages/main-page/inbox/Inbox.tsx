import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { getChatFullInfoById, getChatListPlainByUserId } from '../../../../services/ChatService.ts';
import MessageCard from './message-card/MessageCard.tsx';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard.tsx';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard.tsx';
import type { BLChatPlainDto } from '../../../../dtos/BLChatPlainDto.ts';
import ChatModal from '../../../modals/ChatModal.tsx';

interface InboxProps {

}

function Inbox(props: InboxProps): JSX.Element {
  const [chats, setChats] = useState<BLChatPlainDto[]>([]);
  const [isChatOpen, setChatOpen] = useState(false);
  const [openedChatId, setOpenedChatId] = useState(0);

  useEffect(() => {
    getChatListPlainByUserId(1/*TODO replace*/).then(chats=>{
      setChats(chats);
    });
  }, []);

  const listChatsPlain = () =>
    (chats.map(chat=>
      <MessageCard
        key={chat.id.toString()}
        title={chat.title} message={'test message'}
        sender={'test sender'} color={'red'}
        onClick={()=>{
          setOpenedChatId(chat.id);
          setChatOpen(true);
        }}
      />
    ));

  const setNextChat = () => {
    const currentChatIndex = chats.findIndex(chat=>chat.id===openedChatId);
    if (currentChatIndex === undefined) return;
    const nextChatIndex = (currentChatIndex < chats.length - 1) ? currentChatIndex + 1 : 0;
    const nextId = chats[nextChatIndex]?.id;
    if (!nextId) return;
    setOpenedChatId(nextId);
  }

  return(
    <BLContentCard className={'inbox relative'}>
      <ChatModal
        isOpen={isChatOpen}
        chatId={openedChatId}
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