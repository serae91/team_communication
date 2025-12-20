import MessageCard from './message-card/MessageCard.tsx';
import BLContentCard from '../../../ui/bl-content-card/BLContentCard.tsx';
import BLHintCard from '../../../ui/bl-hint-card/BLHintCard.tsx';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useModal } from '../../../../providers/modal/ModalProvider.tsx';
import { LocalModalTypeEnum } from '../../../../enums/LocalModalTypeEnum.ts';
import ChatModalRenderer from '../../../modals/local-modals/chat-modal/chat-modal-renderer/ChatModalRenderer.tsx';
import CreateChatModalRenderer
  from '../../../modals/local-modals/create-chat-modal/create-chat-modal-renderer/CreateChatModalRenderer.tsx';

const Inbox = () => {
  const {chats, setActiveChatId} = useBLChats();
  const {openLocalModal} = useModal()

  const listChats = () => {
    if (!chats?.length) return <p>No messages received yet</p>
    return (chats.map(chat =>
      <MessageCard
        key={ chat.id.toString() }
        title={ chat.title } message={ 'test message' }
        sender={ 'test sender' } color={ 'red' }
        onClick={ () => {
          setActiveChatId(chat.id);
          openLocalModal({type: LocalModalTypeEnum.JOIN_CHAT});
        } }
      />
    ))
  };

  return (
    <BLContentCard className={ 'inbox relative' }>
      <ChatModalRenderer/>
      <CreateChatModalRenderer/>
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