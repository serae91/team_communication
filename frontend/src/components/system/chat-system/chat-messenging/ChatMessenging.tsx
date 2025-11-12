import { useEffect, useRef, useState } from 'react';
import './ChatMessenging.scss';
import ChatMessage from './chat-message/ChatMessage';
import BLInput from '../../../ui/bl-input/BLInput';
import {
  FaArrowRight
} from 'react-icons/fa';
import type { BLChatFullInfoDto } from '../../../../dtos/BLChatFullInfoDto.ts';
import { getChatFullInfoById } from '../../../../services/ChatService.ts';
import { createMessage } from '../../../../services/MessageService.ts';
import type { BLMessageCreateDto, BLMessageDto } from '../../../../dtos/BLMessageDto.ts';


interface ChatMessengingProps {
  chatId: number;
  className?: string;
}

const ChatMessenging: React.FC<ChatMessengingProps> = ({chatId, className}: ChatMessengingProps)=> {
  const [chatFullInfo, setChatFullInfo] = useState<BLChatFullInfoDto>({messages:[]as BLMessageDto[]} as BLChatFullInfoDto);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const prevLength = useRef(chatFullInfo?.messages?.length??0);

  useEffect(() => {
    loadChatFullInfoAndScrollToBottom();
  }, [chatId]);

  const loadChatFullInfoAndScrollToBottom = () => {
    getChatFullInfoById(chatId).then(fullInfo=> {
      setChatFullInfo(fullInfo);
      const currentChatScroll = chatScrollRef.current;
      if (currentChatScroll) {
        currentChatScroll.scrollTop = currentChatScroll.scrollHeight;
      }
    });
  }

  useEffect(() => {
    scrollDownWhenAtBottomAndAddingNewMessage();
  }, [chatFullInfo.messages.length]);

  const scrollDownWhenAtBottomAndAddingNewMessage = ()=> {
    const currentChatScroll = chatScrollRef.current;
    if (!currentChatScroll) return;

    const isAtBottom = currentChatScroll.scrollHeight - currentChatScroll.scrollTop - currentChatScroll.clientHeight < 50;
    if (isAtBottom && (chatFullInfo?.messages?.length ?? 0 > prevLength.current)) {
      currentChatScroll.scrollTo({ top: currentChatScroll.scrollHeight, behavior: "smooth" });
    }

    prevLength.current = chatFullInfo?.messages?.length??0;
  }

  const getChatMessages = ()=> {
    return chatFullInfo?.messages.map(message =>
      <ChatMessage sender={message.sender.username} postTime={message.createdAt} message={message.text} key={message.id}/>
    )
  }

  const sendMessage = ()=>{
    if(!inputRef.current?.value) return;
    const blMessageCreateDto = {
      chat: {id: chatId},
      text: inputRef.current.value,
      sender: {id: 1}
    } as BLMessageCreateDto;
    createMessage(blMessageCreateDto).then((newMessage)=>{
      setChatFullInfo(prev=> (
        {
          ...prev,
          messages: prev?.messages ? [...prev.messages, newMessage] : [newMessage],
        })
      );
    });
  }

  return(
    <>
      <div ref={chatScrollRef} className={'flex-1 overflow-y-auto p-4 bg-white rounded-2xl shadow-inner border border-gray-200'}>
        {getChatMessages()}
      </div>
      <div className={'flex-row sticky bottom-0'}>
        <BLInput className={'full-width'} inputRef={inputRef}/>
        <button className={'send-button'} onClick={sendMessage}>
          <FaArrowRight/>
        </button>
      </div>
    </>
  );
}
export default ChatMessenging;