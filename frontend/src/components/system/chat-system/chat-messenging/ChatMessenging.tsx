import { useEffect, useRef } from 'react';
import './ChatMessenging.scss';
import ChatMessage from './chat-message/ChatMessage';
import BLInput from '../../../ui/bl-input/BLInput';
import {
  FaArrowRight
} from 'react-icons/fa';
import type {
  BLMessageCreateDto,
} from '../../../../dtos/BLMessageDto.ts';
import { useBLChats } from '../../../../providers/bl-chat/BLChatProvider.tsx';
import { useWebSocket } from '../../../../providers/bl-websocket/BLWebSocketProvider.tsx';
import { useBLMessages } from '../../../../providers/bl-message/BLMessageProvider.tsx';
import type {
  WebsocketMessage
} from '../../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/bl-message-types.ts';


interface ChatMessengingProps {
  chatId: number;
  className?: string;
}

const ChatMessenging: React.FC<ChatMessengingProps> = ({chatId, className}: ChatMessengingProps)=> {
  //const [chatFullInfo, setChatFullInfo] = useState<BLChatFullInfoDto>({messages:[]as BLMessageDto[]} as BLChatFullInfoDto);
  //const {message} = useWebSocket();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const { chats, activeChatId, setActiveChatId } = useBLChats();
  const { messages, setMessages } = useBLMessages();
  const { send, addMessageHandler, removeMessageHandler, connected } = useWebSocket<WebsocketMessage>();
  const prevLength = useRef(messages?.length??0);

  useEffect(() => {
    //send({ } as BLMessageDto)
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

    prevLength.current = messages?.length ?? 0;
  }

  const getChatMessages = ()=> {
    return messages.map(message =>
      <ChatMessage sender={message.sender.username} postTime={message.createdAt} message={message.text} key={message.id}/>
    )
  }

  const sendMessage = ()=>{
    if(!inputRef.current?.value || !activeChatId) return;
    const blMessageCreateDto = {
      chatId:  chatId,
      text: inputRef.current.value,
      senderId:  1/*TODO replace*/
    } as BLMessageCreateDto;
    send({type: 'SEND_MESSAGE', chatId: activeChatId, blMessage: blMessageCreateDto})
  }

  return(
    <>
      <div ref={chatScrollRef} className={'flex-1 overflow-y-auto p-4 bg-white rounded-2xl shadow-inner border border-gray-200'}>
        {getChatMessages()}
      </div>
      <div className={'flex-row sticky bottom-0'}>
        <BLInput className={'full-width'} inputRef={inputRef}/>
        <button className={'send-button'} onClick={()=>sendMessage()}>
          <FaArrowRight/>
        </button>
      </div>
    </>
  );
}
export default ChatMessenging;