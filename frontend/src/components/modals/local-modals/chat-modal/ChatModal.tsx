import React from 'react';
import BLModal from '../../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../../../system/chat-system/ChatSystem.tsx';
import './ChatModal.scss';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import { LocalModalTypeEnum } from '../../../../enums/LocalModalTypeEnum.ts';
import { CheckOutlined, MoreTimeOutlined, ReplyOutlined, ShareOutlined, SkipNextOutlined } from '@mui/icons-material';
import { triggerDone } from '../../../../services/RelChatUserAttrService.ts';

const ChatModal = () => {
  const {chats, activeChatId, remind, setNextChat} = useBLChats();
  const {messages, sendMessage} = useBLMessages();

  return (
    <BLModal modalType={ LocalModalTypeEnum.JOIN_CHAT }>
      {/*<button onClick={ setNextChat }>Set next chat</button>
      <button onClick={ () => {
        if (activeChatId)
          triggerDone(activeChatId);
      }
      }>Down
      </button>
      <button onClick={ remind }>Set Reminder</button>*/ }
      <BLLeftMarkedCard>
        <div className={ 'chat-modal' }>
          <div className={ 'flex flex-row' }>
            { chats?.find(chat => chat.chatId === activeChatId)?.title ?? 'Error: Selected chat could not be found' }
            <SkipNextOutlined sx={ {color: '#888'} } onClick={ setNextChat }/>
            <ReplyOutlined sx={ {color: '#888'} }/>
            <ShareOutlined sx={ {color: '#888'} }/>
            <MoreTimeOutlined sx={ {color: '#888'} } onClick={ remind }/>
            <CheckOutlined sx={ {color: '#888'} } onClick={ () => {
              if (activeChatId)
                triggerDone(activeChatId);
            } }/>
          </div>
          <ChatSystem messages={ messages } sendMessage={ sendMessage }/>
        </div>
      </BLLeftMarkedCard>
    </BLModal>);
};

export default ChatModal;