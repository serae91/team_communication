import { useEffect, useRef } from 'react';
import './ChatMessenging.scss';
import ChatMessage from './chat-message/ChatMessage';
import BLInput from '../../../ui/bl-input/BLInput';
import {
  FaArrowRight
} from 'react-icons/fa';
import type { BLMessageDto } from '../../../../dtos/BLMessageDto.ts';


interface ChatMessengingProps {
  className?: string;
  messages: BLMessageDto[];
  sendMessage: (text: string)=>void
}

const ChatMessenging: React.FC<ChatMessengingProps> = ({className, messages, sendMessage}: ChatMessengingProps)=> {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const prevLength = useRef(messages?.length??0);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
      const currentChatScroll = chatScrollRef.current;
      if (currentChatScroll) {
        currentChatScroll.scrollTop = currentChatScroll.scrollHeight;
      }
  }

  useEffect(() => {
    scrollDownWhenAtBottomAndAddingNewMessage();
  }, [messages.length]);

  const scrollDownWhenAtBottomAndAddingNewMessage = ()=> {
    const currentChatScroll = chatScrollRef.current;
    if (!currentChatScroll) return;

    const isAtBottom = currentChatScroll.scrollHeight - currentChatScroll.scrollTop - currentChatScroll.clientHeight < 50;
    if (isAtBottom && (messages?.length ?? 0 > prevLength.current)) {
      currentChatScroll.scrollTo({ top: currentChatScroll.scrollHeight, behavior: "smooth" });
    }

    prevLength.current = messages?.length ?? 0;
  }

  const getChatMessages = ()=> {
    return messages.map(message =>
      <ChatMessage sender={message.sender.username} postTime={message.createdAt} message={message.text} key={message.id}/>
    )
  }

  return(
    <>
      <div ref={chatScrollRef} className={'flex-1 overflow-y-auto p-4 bg-white rounded-2xl shadow-inner border border-gray-200'}>
        {getChatMessages()}
      </div>
      <div className={'flex-row sticky bottom-0'}>
        <BLInput className={'full-width'} inputRef={inputRef}/>
        <button className={'send-button'} onClick={()=> {
          if(inputRef.current?.value)
            sendMessage(inputRef.current.value)
        }}>
          <FaArrowRight/>
        </button>
      </div>
    </>
  );
}
export default ChatMessenging;