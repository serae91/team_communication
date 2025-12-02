import React, { useEffect } from 'react';
import BLModal from '../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../system/chat-system/ChatSystem.tsx';
import './ChatModal.scss';
import { triggerDown } from '../../services/ChatService.ts';
import { useWebSocket } from '../../providers/bl-websocket/BLWebSocketProvider.tsx';
import type {
  WebsocketMessage
} from '../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';
import { useBLChats } from '../../providers/bl-chat/BLChatProvider.tsx';
import { useBLMessages } from '../../providers/bl-message/BLMessageProvider.tsx';
import type { BLMessageCreateDto } from '../../dtos/BLMessageDto.ts';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }: ChatModalProps) => {
  const { connected, removeMessageHandler, addMessageHandler, send } = useWebSocket<WebsocketMessage>();
  const { chats, setChats, activeChatId, setActiveChatId } = useBLChats();
  const { messages, setMessages } = useBLMessages();

  const setNextChat = () => {
    const currentChatIndex = chats.findIndex(chat=>chat.id===activeChatId);
    if (currentChatIndex === -1) return;
    const nextChatIndex = (currentChatIndex < chats.length - 1) ? currentChatIndex + 1 : 0;
    const nextId = chats[nextChatIndex]?.id;
    if (!nextId) return;
    setActiveChatId(nextId);
  }

  const sendMessage = (text: string)=>{
    if(!activeChatId) return;
    const blMessageCreateDto = {
      chatId:  activeChatId,
      text,
      senderId:  1/*TODO replace*/
    } as BLMessageCreateDto;
    send({type: 'SEND_MESSAGE', chatId: activeChatId, blMessage: blMessageCreateDto})
  }
  return(
    <BLModal isOpen={isOpen} onClose={onClose}>
      {chats?.find(chat=>chat.id===activeChatId)?.title??'Error: Selected chat could not be found'}
      <button onClick={setNextChat}>Set next chat</button>
      <button onClick={()=>{if(activeChatId)
        triggerDown(activeChatId, 1/*TODO replace*/);}
      }>Down</button>
      <BLLeftMarkedCard className={'cursor-pointer'}>
        <ChatSystem messages={messages} sendMessage={sendMessage}/>
      </BLLeftMarkedCard>
    </BLModal>);
}

export default ChatModal;