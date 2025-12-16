import { useCallback, useEffect } from 'react';
import MessageCard from './message-card/MessageCard.tsx';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard.tsx';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard.tsx';
import ChatModal from '../../../modals/chat-modal/ChatModal.tsx';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import type {
  WebsocketMessage,
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { CreateChatModal } from '../../../modals/create-chat-modal/CreateChatModal.tsx';
import { useModal } from '../../../../providers/modal/ModalProvider.tsx';
import { useAuth } from '../../../../providers/auth/AuthProvider.tsx';
import {
  useWebSocket
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';

const Inbox = () => {
  const {connected, removeMessageHandler, addMessageHandler, send} = useWebSocket<WebsocketMessage>();
  const {chats, setChats, activeChatId, setActiveChatId} = useBLChats();
  const {setMessages} = useBLMessages();
  const {currentModal, openModal, closeModal} = useModal()
  const {user} = useAuth();

  const onMessageIncoming = useCallback((msg: WebsocketMessage) => {
    console.log('received message: ', msg)
    switch (msg.type) {
      case 'RECEIVE_MESSAGES':
        setMessages(msg.blMessages);
        break;
      case 'RECEIVE_MESSAGE':
        setMessages((prev) => [...prev, msg.blMessage]);
        break;
      case 'RECEIVE_CHATS':
        setChats(msg.blChats);
        break;
      case 'RECEIVE_CHAT':
        setChats((prev) => [...prev, msg.blChat]);
        break;
    }
  }, [setChats, setMessages]);

  const requestChats = useCallback(() => {
    if (user?.id)
      send({
        type: 'REQUEST_CHATS',
        userId: user?.id,
      });
  }, [send, user?.id]);

  const onActiveChatId = useCallback((): void => {
    if (!activeChatId) return;
    send({
      type: 'SWITCH_CHAT',
      chatId: activeChatId,
    });
  }, [send, activeChatId]);

  useEffect(() => {
    if (!connected) return;
    addMessageHandler(onMessageIncoming);
    requestChats();
    return () => {
      removeMessageHandler(onMessageIncoming)
    };
  }, [addMessageHandler, connected, onMessageIncoming, removeMessageHandler, requestChats]);

  useEffect(() => {
    onActiveChatId()
  }, [activeChatId, onActiveChatId]);

  const listChatsPlain = () => {
    if (!chats?.length) return <p>No messages received yet</p>
    return (chats.map(chat =>
      <MessageCard
        key={ chat.id.toString() }
        title={ chat.title } message={ 'test message' }
        sender={ 'test sender' } color={ 'red' }
        onClick={ () => {
          setActiveChatId(chat.id);
          openModal('JOIN_CHAT');
        } }
      />
    ))
  };

  return (
    <BLContentCard className={ 'inbox relative' }>
      <ChatModal
        isOpen={ currentModal === 'JOIN_CHAT' }
        onClose={ closeModal }
      />
      <CreateChatModal onClose={ closeModal }/>
      <div className={ 'title-box flex-col' }>
        <div className={ 'title' }>
          Inbox
        </div>
        <div className={ 'sub-title' }>
          A collection of all your messages
        </div>
      </div>
      <BLHintCard hintCardType={ 'error' }>
        Number of messages marked as "Urgent" waiting for your response
      </BLHintCard>
      { listChatsPlain() }
    </BLContentCard>

  );
}

export default Inbox;