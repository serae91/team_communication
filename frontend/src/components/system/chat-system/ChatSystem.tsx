import './ChatSystem.scss';
import ChatSummary from './summary/ChatSummary';
import ChatMessenging from './chat-messenging/ChatMessenging';
import type { BLMessageDto } from '../../../dtos/BLMessageDto.ts';
import type { MouseEventHandler } from 'react';


interface ChatSystemProps {
  messages: BLMessageDto[];
  sendMessage: (text: string) => void;
  onClickSendButton?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const ChatSystem = ({messages, sendMessage, onClickSendButton}: ChatSystemProps) => {
  return (
    <div className={ 'flex flex-col h-[80vh]' }>
      <ChatSummary className={ 'mb-4' }/>
      <ChatMessenging messages={ messages } onPressEnter={ sendMessage } onClickSendButton={ onClickSendButton }/>
    </div>
  );
};

export default ChatSystem;