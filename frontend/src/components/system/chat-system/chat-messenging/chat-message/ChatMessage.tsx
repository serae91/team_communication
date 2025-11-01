import { JSX } from 'react';
import './ChatMessage.scss';


interface ChatMessageProps {
  sender: string;
  postTime: Date;
  message: string;
}

function ChatMessage(props: ChatMessageProps): JSX.Element {
  return(
    <div className={'chat-message flex-row'}>
      <div className={'profile-picture'}/>
      <div className={'flex-col right-container'}>
        <div className={'flex-row'}>
          <div className={'sender'}>{props.sender}</div>
          <div className={'post-time'}>{`${props.postTime.getHours()}:${props.postTime.getMinutes()}`}</div>
        </div>
        <div className={'message'}>{props.message}</div>
      </div>
    </div>
  );
}
export default ChatMessage;