import React from 'react';
import BLModal from '../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../system/chat-system/ChatSystem.tsx';
import './ChatModal.scss';
import { triggerDown } from '../../services/ChatService.ts';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  chatId: number;
  setNextChat: () => void;
}
const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, title, chatId, setNextChat }: ChatModalProps) => {
  return(
    <BLModal isOpen={isOpen} onClose={onClose}>
      {title}
      <button onClick={setNextChat}>Set next chat</button>
      <button onClick={()=>{
        triggerDown(chatId, 1/*TODO replace*/);}
      }>Down</button>
      <BLLeftMarkedCard className={'cursor-pointer'}>
        <ChatSystem chatId={chatId}/>
      </BLLeftMarkedCard>
    </BLModal>);
}

export default ChatModal;