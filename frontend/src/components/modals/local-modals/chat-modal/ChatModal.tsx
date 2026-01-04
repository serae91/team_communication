import React from 'react';
import BLModal from '../../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../../../system/chat-system/ChatSystem.tsx';
import './ChatModal.scss';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import { LocalModalTypeEnum } from '../../../../enums/LocalModalTypeEnum.ts';
import {
  CheckOutlined,
  MoreTimeOutlined,
  PersonAddAltOutlined,
  ReplyOutlined,
  ShareOutlined,
  SkipNextOutlined
} from '@mui/icons-material';
import { triggerDone } from '../../../../services/RelChatUserAttrService.ts';
import BLProfileToken from '../../../ui/bl-profile-token/BLProfileToken.tsx';
import BLSideSymbol from '../../../ui/bl-side-symbol/BLSideSymbol.tsx';
import BLUrgencyToken from '../../../ui/bl-urgency-token/BLUrgencyToken.tsx';

const ChatModal = () => {
  const {chats, activeChatId, remind, setNextChat} = useBLChats();
  const {messages, sendMessage} = useBLMessages();

  return (
    <BLModal modalType={ LocalModalTypeEnum.JOIN_CHAT }>
      <BLLeftMarkedCard>
        <div className={ 'chat-modal' }>
          <div className={ 'flex justify-between h-14' }>
            <div className={ 'flex flex-col h-full justify-between' }>
              <div className={ 'flex items-center gap-6  chat-title' }>
                <BLSideSymbol>#</BLSideSymbol>
                { 'Development' }{ chats?.find(chat => chat.chatId === activeChatId)?.title ?? 'Error: Selected chat could not be found' }
                <PersonAddAltOutlined/>
              </div>
              <div className={ 'flex items-center gap-3' }>
                <BLUrgencyToken hintCardType={ 'error' }/>
                <p className={ 'chat-title' }>Raised by</p>
                <BLProfileToken username={ 'Phoenix Baker' }/>
              </div>
            </div>
            <div className={ 'flex items-center gap-6 h-6 text-[#A4A7Ae]' }>
              <SkipNextOutlined onClick={ setNextChat }/>
              <ReplyOutlined/>
              <ShareOutlined/>
              <MoreTimeOutlined onClick={ remind }/>
              <CheckOutlined onClick={ () => {
                if (activeChatId)
                  triggerDone(activeChatId);
              } }/>
            </div>
          </div>
          <ChatSystem messages={ messages } sendMessage={ sendMessage }/>
        </div>
      </BLLeftMarkedCard>
    </BLModal>);
};

export default ChatModal;