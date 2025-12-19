import './ChatSystem.scss';
import ChatSummary from './summary/ChatSummary';
import ChatMessenging from './chat-messenging/ChatMessenging';
import type { BLMessageDto } from '../../../dtos/BLMessageDto.ts';


interface ChatSystemProps {
  messages: BLMessageDto[];
  sendMessage: (text: string) => void;
}

const ChatSystem = ({messages, sendMessage}: ChatSystemProps) => {
  return (
    <div className={ 'flex flex-col h-[80vh]' }>
      <ChatSummary className={ 'mb-4' }/>
      <ChatMessenging messages={ messages } sendMessage={ sendMessage }/>
    </div>
  );
}

export default ChatSystem;