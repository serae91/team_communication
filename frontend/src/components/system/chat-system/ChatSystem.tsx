import './ChatSystem.scss';
import ChatSummary from './summary/ChatSummary';
import ChatMessenging from './chat-messenging/ChatMessenging';


interface ChatSystemProps {
  chatId: number;
}

const ChatSystem: React.FC<ChatSystemProps> = ({chatId}: ChatSystemProps) => {
  return(
    <div className={'chat-system'}>
      <ChatSummary/>
      <ChatMessenging chatId={chatId}/>
    </div>
  );
}
export default ChatSystem;