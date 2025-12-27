import './ChatMessage.scss';
import BLChatMessage from '../../../../ui/bl-chat-message/BLChatMessage.tsx';


interface ChatMessageProps {
  sender: string;
  postTime: Date;
  message: string;
}

const ChatMessage = ({sender, postTime, message}: ChatMessageProps) => {
  return (
    <div className={ 'chat-message flex-row' }>
      <div className={ 'profile-picture' }/>
      <div className={ 'flex-col right-container' }>
        <div className={ 'flex-row' }>
          <div className={ 'sender' }>{ sender }</div>
          <div className={ 'post-time' }>{
            `${ postTime }` }</div>
        </div>
        <BLChatMessage html={ message }/>
      </div>
    </div>
  );
};

export default ChatMessage;