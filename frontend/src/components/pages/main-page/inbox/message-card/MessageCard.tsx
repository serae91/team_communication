import './MessageCard.scss';
import BLSideSymbol from '../../../../ui/bl-side-symbol/BLSideSymbol';
import BLLeftMarkedCard from '../../../../ui/bl-left-marked-card/BLLeftMarkedCard';
import type { BLLeftMarkedCardColor } from '../../../../ui/bl-left-marked-card/types';


interface MessageCardProps {
  title: string;
  sender: string;
  message: string;
  color: BLLeftMarkedCardColor
  onClick: () => void | undefined;
  className?: string
}

const MessageCard: React.FC<MessageCardProps> = ({
                                                   title,
                                                   sender,
                                                   message,
                                                   color,
                                                   onClick,
                                                   className = ''
                                                 }: MessageCardProps) => {
  return (
    <BLLeftMarkedCard className={ `message-card ${ className }` } color={ color } onClick={ onClick }>
      <div className={ 'title flex-row' }><BLSideSymbol>#</BLSideSymbol>{ title }</div>
      <div className={ 'message-box flex-row' }>
        <div className={ 'sender' }>
          <div className={ 'profile-picture' }></div>
          { sender }</div>
        { message }
      </div>
    </BLLeftMarkedCard>
  );
}

export default MessageCard;