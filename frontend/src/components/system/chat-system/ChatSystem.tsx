import './ChatSystem.scss';
import ChatSummary from './summary/ChatSummary';
import ChatMessenging from './chat-messenging/ChatMessenging';
import type { BLMessageDto } from '../../../dtos/BLMessageDto.ts';
import type { MouseEventHandler } from 'react';


interface ChatSystemProps {
  messages: BLMessageDto[];
  sendMessage: (text: string) => void;
  onClickSendButton?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}

const ChatSystem = ({messages, sendMessage, onClickSendButton, className = ''}: ChatSystemProps) => {
  return (
    <div className={ `chat-system ${ className }` }>
      <ChatSummary className={ 'mb-4' }/>
      <ChatMessenging className={ 'messenging' } messages={ messages } onPressEnter={ sendMessage }
                      onClickSendButton={ onClickSendButton }/>
    </div>
  );
};

export default ChatSystem;