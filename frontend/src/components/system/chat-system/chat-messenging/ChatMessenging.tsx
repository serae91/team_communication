import { type MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import './ChatMessenging.scss';
import ChatMessage from './chat-message/ChatMessage';
import type { BLMessageDto } from '../../../../dtos/BLMessageDto.ts';
import ChatInput from './chat-input/ChatInput.tsx';


interface ChatMessengingProps {
  className?: string;
  messages: BLMessageDto[];
  onPressEnter: (text: string) => void;
  onClickSendButton?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const ChatMessenging = ({messages, onPressEnter, onClickSendButton}: ChatMessengingProps) => {
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const prevLength = useRef(messages?.length ?? 0);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const currentChatScroll = chatScrollRef.current;
    if (currentChatScroll) {
      currentChatScroll.scrollTop = currentChatScroll.scrollHeight;
    }
  };

  const scrollDownWhenAtBottomAndAddingNewMessage = useCallback(() => {
    const currentChatScroll = chatScrollRef.current;
    if (!currentChatScroll) return;

    const isAtBottom = currentChatScroll.scrollHeight - currentChatScroll.scrollTop - currentChatScroll.clientHeight < 50;
    if (isAtBottom && (messages?.length ?? 0 > prevLength.current)) {
      currentChatScroll.scrollTo({top: currentChatScroll.scrollHeight, behavior: 'smooth'});
    }

    prevLength.current = messages?.length ?? 0;
  }, [messages?.length]);

  useEffect(() => {
    scrollDownWhenAtBottomAndAddingNewMessage();
  }, [messages.length, scrollDownWhenAtBottomAndAddingNewMessage]);

  const renderChatMessages = () => {
    return <div className={ 'flex flex-col gap-1.5' }>{ messages.map(message =>
      <ChatMessage sender={ message.sender.username } postTime={ message.createdAt } message={ message.text }
                   key={ message.id }/>) }</div>;

  };

  return (
    <>
      <div ref={ chatScrollRef }
           className={ 'flex-1 overflow-y-auto chat-messenging' }>
        { renderChatMessages() }
      </div>
      <ChatInput onPressEnter={ onPressEnter } onClickSendButton={ onClickSendButton }/>
    </>
  );
};

export default ChatMessenging;