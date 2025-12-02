import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import MessageCard from './message-card/MessageCard.tsx';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard.tsx';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard.tsx';
import ChatModal from '../../../modals/ChatModal.tsx';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useWebSocket } from '../../../../providers/bl-websocket/BLWebSocketProvider.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import type {
  WebsocketMessage,
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';

interface InboxProps {

}

function Inbox(props: InboxProps): JSX.Element {
  const { connected, removeMessageHandler, addMessageHandler, send } = useWebSocket<WebsocketMessage>();
  const { chats, setChats, activeChatId, setActiveChatId } = useBLChats();
  const { messages, setMessages } = useBLMessages();
  const [isChatOpen, setChatOpen] = useState(false);

  const onMessageIncoming = (): void => {
    addMessageHandler((msg) => {
      switch (msg.type) {
        case 'CHAT_MESSAGES': {setMessages(msg.blMessages);break;}
        case 'RECEIVE_MESSAGE': setMessages((prev) => [...prev, msg.blMessage]);break;
        case 'RECEIVE_CHAT': setChats((prev) => [...prev, msg.blChat]);break;
      }
    });
  }

  const onActiveChatId = (): void => {
    if(!activeChatId)return;
    send({
      type: 'SWITCH_CHAT',
      chatId: activeChatId,
    });
  }

  useEffect(() => {
    onMessageIncoming();
  }, []);

  useEffect(() => {
    onActiveChatId()
  }, [activeChatId]);

  const listChatsPlain = () =>
  {
    if(!chats?.length) return <p>No messages received yet</p>
    return (chats.map(chat=>
      <MessageCard
        key={chat.id.toString()}
        title={chat.title} message={'test message'}
        sender={'test sender'} color={'red'}
        onClick={()=>{
          setActiveChatId(chat.id);
          setChatOpen(true);
        }}
      />
    ))};

  return(
    <BLContentCard className={'inbox relative'}>
      <ChatModal
        isOpen={isChatOpen}
        onClose={()=> setChatOpen(false)}
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