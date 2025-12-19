import MessageCard from './message-card/MessageCard.tsx';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard.tsx';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard.tsx';
import ChatModal from '../../../modals/chat-modal/ChatModal.tsx';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import CreateChatModal from '../../../modals/create-chat-modal/CreateChatModal.tsx';
import { useModal } from '../../../../providers/modal/ModalProvider.tsx';

const Inbox = () => {
  const {chats, setActiveChatId} = useBLChats();
  const {currentModal, openModal, closeModal} = useModal()

  const listChats = () => {
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
      { listChats() }
    </BLContentCard>

  );
}

export default Inbox;