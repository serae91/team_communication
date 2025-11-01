import { JSX } from 'react';
import './ChatSystem.scss';
import ChatSummary from './summary/ChatSummary';
import ChatMessenging from './chat-messenging/ChatMessenging';


interface ChatSystemProps {

}

function ChatSystem(props: ChatSystemProps): JSX.Element {
  return(
    <div className={'chat-system'}>
      <ChatSummary/>
      <ChatMessenging/>
    </div>
  );
}
export default ChatSystem;