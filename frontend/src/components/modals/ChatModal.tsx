import React from 'react';
import BLModal from '../ui/bl-modal/BLModal.tsx';
import BLLeftMarkedCard from '../ui/bl-left-marked-card/BLLeftMarkedCard.tsx';
import ChatSystem from '../system/chat-system/ChatSystem.tsx';
import './ChatModal.scss';

interface ChatModalProps {
  isOpen: boolean;
  onClose: ()=>void;
  title?: string;
  chatId: number;
}
const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, title, chatId }: ChatModalProps) => {
  return(
    <BLModal isOpen={isOpen} onClose={onClose}>
      {title}
      <BLLeftMarkedCard className={'cursor-pointer'}>
        <ChatSystem chatId={chatId}/>
      </BLLeftMarkedCard>
    </BLModal>);
}

export default ChatModal;