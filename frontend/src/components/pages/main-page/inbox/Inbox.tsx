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
import type { BLChatCreateDto } from '../../../../dtos/BLChatPlainDto.ts';

interface InboxProps {

}

function Inbox(props: InboxProps): JSX.Element {
  const { connected, removeMessageHandler, addMessageHandler, send } = useWebSocket<WebsocketMessage>();
  const { chats, setChats, activeChatId, setActiveChatId } = useBLChats();
  const { messages, setMessages } = useBLMessages();
  const [isChatOpen, setChatOpen] = useState(false);

  const onMessageIncoming = (msg: WebsocketMessage) => {
      console.log('received message: ', msg)
      switch (msg.type) {
        case 'RECEIVE_MESSAGES': setMessages(msg.blMessages); break;
        case 'RECEIVE_MESSAGE': setMessages((prev) => [...prev, msg.blMessage]); break;
        case 'RECEIVE_CHATS': setChats(msg.blChats); break;
        case 'RECEIVE_CHAT': console.log('receive chat', msg); setChats((prev) => [...prev, msg.blChat]); break;
      }
    };

  const requestChats = () => {
    send({
      type: 'REQUEST_CHATS',
      userId: 1,/*TODO replace*/
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
    if(!connected) return;
    addMessageHandler(onMessageIncoming);
    requestChats();
    return () => {
      removeMessageHandler(onMessageIncoming)
    };
  }, [connected]);

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
      <button
        onClick={
          () => {
            const message = {
              type:'CREATE_CHAT',
              chatCreateDto: {
                title: 'Perfectly tested title',
                firstMessageText: 'Perfect First Message',
                urgency: 'HIGH',
                senderId: 1,
                userIds: [1,3]
              } as BLChatCreateDto} as WebsocketMessage;
            send(message);
          }
        }
      >{'test create chat'/*TODO remove test button*/}</button>

      {listChatsPlain()}
    </BLContentCard>

  );
}

export default Inbox;