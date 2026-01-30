import React, { useEffect } from 'react';
import BLModal from '../../../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../../../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../../../system/chat-system/ChatSystem.tsx';
import './ChatModal.scss';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import {
  CheckOutlined,
  MoreTimeOutlined,
  PersonAddAltOutlined,
  ReplyOutlined,
  ShareOutlined,
  SkipNextOutlined
} from '@mui/icons-material';
import BLProfileToken from '../../../ui/bl-profile-token/BLProfileToken.tsx';
import BLSideSymbol from '../../../ui/bl-side-symbol/BLSideSymbol.tsx';
import BLUrgencyToken from '../../../ui/bl-urgency-token/BLUrgencyToken.tsx';
import { Tooltip } from '@mui/material';
import { useModal } from '../../../../providers/modal/ModalProvider.tsx';

const ChatModal = () => {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    remind,
    setNextChat,
    setDone
  } = useBLChats();
  const {messages, sendMessage} = useBLMessages();
  const {closeLocalModal} = useModal();

  useEffect(() => {
    if (activeChatId === null) {
      closeLocalModal();
    }
  }, [activeChatId, closeLocalModal]);

  return (
    <BLModal onClick={ () => setActiveChatId(null) }>
      <BLLeftMarkedCard className={ 'chat-modal' }>
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
            <Tooltip title={ 'skip' }><SkipNextOutlined sx={ {color: '#A4A7Ae', cursor: 'pointer'} }
                                                        onClick={ setNextChat }/></Tooltip>
            <Tooltip title={ 'share' }><ReplyOutlined sx={ {color: '#A4A7Ae', cursor: 'pointer'} }/></Tooltip>
            <Tooltip title={ 'share' }><ShareOutlined sx={ {color: '#A4A7Ae', cursor: 'pointer'} }/></Tooltip>
            <Tooltip title={ 'remind' }><MoreTimeOutlined sx={ {color: '#A4A7Ae', cursor: 'pointer'} }
                                                          onClick={ remind }/></Tooltip>
            <Tooltip title={ 'done' }><CheckOutlined sx={ {color: '#A4A7Ae', cursor: 'pointer'} }
                                                     onClick={ setDone }/></Tooltip>
          </div>
        </div>
        <ChatSystem messages={ messages } sendMessage={ sendMessage } className={ 'chat-sys' }/>
      </BLLeftMarkedCard>
    </BLModal>);
};

export default ChatModal;