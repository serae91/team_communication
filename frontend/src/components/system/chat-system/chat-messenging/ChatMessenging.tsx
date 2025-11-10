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
import type { BLMessageCreateDto } from '../../../../dtos/BLMessageDto.ts';


interface ChatMessengingProps {
  chatId: number;
  className?: string;
}

const ChatMessenging: React.FC<ChatMessengingProps> = ({chatId, className}: ChatMessengingProps)=> {
  const [chatFullInfo, setChatFullInfo] = useState<BLChatFullInfoDto>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getChatFullInfoById(chatId).then(setChatFullInfo);
  }, []);

  const getChatMessages = ()=>{
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
      console.log(newMessage);
      chatFullInfo?.messages.push(newMessage);
      setChatFullInfo(chatFullInfo);
    });
  }

  return(
    <>
      <div className={'flex-1 overflow-y-auto p-4 bg-white rounded-2xl shadow-inner border border-gray-200'}>
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