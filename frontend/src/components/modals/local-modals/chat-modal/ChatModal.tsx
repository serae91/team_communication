import React from 'react';
import BLModal from '../../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../../../system/chat-system/ChatSystem.tsx';
import './ChatModal.scss';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import { triggerDone } from '../../../../services/RelChatUserAttrService.ts';
import { LocalModalTypeEnum } from '../../../../enums/LocalModalTypeEnum.ts';

const ChatModal = () => {
  const {chats, activeChatId, remind, setNextChat} = useBLChats();
  const {messages, sendMessage} = useBLMessages();

  return (
    <BLModal modalType={ LocalModalTypeEnum.JOIN_CHAT }>
      <button onClick={ setNextChat }>Set next chat</button>
      <button onClick={ () => {
        if (activeChatId)
          triggerDone(activeChatId);
      }
      }>Down
      </button>
      <button onClick={ remind }>Set Reminder</button>
      <BLLeftMarkedCard className={ 'cursor-pointer' }>
        { chats?.find(chat => chat.id === activeChatId)?.title ?? 'Error: Selected chat could not be found' }
        <ChatSystem messages={ messages } sendMessage={ sendMessage }/>
      </BLLeftMarkedCard>
    </BLModal>);
};

export default ChatModal;