import './ChatMessage.scss';
import BLChatMessage from '../../../../ui/bl-chat-message/BLChatMessage.tsx';


interface ChatMessageProps {
  sender: string;
  postTime: Date;
  message: string;
}

const ChatMessage = ({sender, postTime, message}: ChatMessageProps) => {
  const parseInstant = (instant: string): Date => {
    return new Date(
      instant.replace(
        /\.(\d{3})\d+Z$/,
        '.$1Z'
      )
    );
  };

  const time = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(parseInstant(date.toString()));
  };

  return (
    <div className={ 'chat-message' }>
      <div className={ 'profile-picture' }/>
      <div className={ 'right-container' }>
        <div className={ 'flex flex-row' }>
          <div className={ 'sender' }>{ sender }</div>
          <div className={ 'post-time' }>{
            `${ time(postTime) }` }</div>
        </div>
        <BLChatMessage html={ message }/>
      </div>
    </div>
  );
};

export default ChatMessage;