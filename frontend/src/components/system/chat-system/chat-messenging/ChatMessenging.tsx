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
import type { BLMessageCommandDto, BLMessageCreateDto, BLMessageDto } from '../../../../dtos/BLMessageDto.ts';
import { useChats } from '../../../../contexts/BLChatContext.tsx';
import { useWebSocket } from '../../../../contexts/createWebSocketContext.tsx';


interface ChatMessengingProps {
  chatId: number;
  className?: string;
}

const ChatMessenging: React.FC<ChatMessengingProps> = ({chatId, className}: ChatMessengingProps)=> {
  //const [chatFullInfo, setChatFullInfo] = useState<BLChatFullInfoDto>({messages:[]as BLMessageDto[]} as BLChatFullInfoDto);
  //const {message} = useWebSocket();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const { chats, activeChatId, setActiveChatId } = useChats();
  const { messages, sendMessage, switchActiveChatId } = useWebSocket();
  const prevLength = useRef(messages?.length??0);

  useEffect(() => {
    sendMessage({ } as BLMessageDto)
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatId]);

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

    prevLength.current = messages?.length??0;
  }

  const getChatMessages = ()=> {
    return messages.map(message =>
      <ChatMessage sender={message.sender.username} postTime={message.createdAt} message={message.text} key={message.id}/>
    )
  }

  const getMessage=()=>(
    {
      id:0,
      chat: {id: chatId},
      text: inputRef?.current?.value,
      sender: {id: 1, username:'me'/*TODO replace*/},
      createdAt:new Date(),
    } as BLMessageDto
  );

  /*const sendMessage = ()=>{
    if(!inputRef.current?.value) return;
    const blMessageCreateDto = {
      chat: {id: chatId},
      text: inputRef.current.value,
      sender: {id: 1/*TODO replace*//*}
    } as BLMessageCreateDto;
    createMessage(blMessageCreateDto).then((newMessage)=>{
      setChatFullInfo(prev=> (
        {
          ...prev,
          messages: prev?.messages ? [...prev.messages, newMessage] : [newMessage],
        })
      );
    });
  }*/

  return(
    <>
      <div ref={chatScrollRef} className={'flex-1 overflow-y-auto p-4 bg-white rounded-2xl shadow-inner border border-gray-200'}>
        {getChatMessages()}
      </div>
      <div className={'flex-row sticky bottom-0'}>
        <BLInput className={'full-width'} inputRef={inputRef}/>
        <button className={'send-button'} onClick={()=>sendMessage(getMessage())}>
          <FaArrowRight/>
        </button>
      </div>
    </>
  );
}
export default ChatMessenging;