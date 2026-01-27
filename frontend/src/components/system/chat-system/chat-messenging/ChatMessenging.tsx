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

  return (
    <div className="flex-1 chat-messenging">
      <div
        ref={ chatScrollRef }
        className="scroll-area"
      >
        <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
          { messages.map((message) => (
            <li key={ message.id }>
              <ChatMessage
                sender={ message.sender.username }
                postTime={ message.createdAt }
                message={ message.text }
              />
            </li>
          )) }
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <ChatInput onPressEnter={ onPressEnter } onClickSendButton={ onClickSendButton }/>
      </div>
    </div>
  );
};

export default ChatMessenging;