import './ChatCard.scss';
import BLSideSymbol from '../../../../ui/bl-side-symbol/BLSideSymbol';
import BLLeftMarkedCard from '../../../../ui/bl-left-marked-card/BLLeftMarkedCard';
import type { BLLeftMarkedCardColor } from '../../../../ui/bl-left-marked-card/types';
import BLProfileToken from '../../../../ui/bl-profile-token/BLProfileToken.tsx';


interface ChatCardProps {
  title: string;
  sender: string;
  message: string;
  color: BLLeftMarkedCardColor;
  onClick: () => void | undefined;
}

const ChatCard = ({
                    title,
                    sender,
                    message,
                    color,
                    onClick,
                  }: ChatCardProps) => {
  return (
    <BLLeftMarkedCard color={ color } onClick={ onClick }>
      <div className={ 'chat-card' }>
        <div className={ 'title' }><BLSideSymbol>#</BLSideSymbol>{ title }</div>
        <div className={ 'message-box' }>
          <BLProfileToken username={ sender }/>
          { message }
        </div>
      </div>
    </BLLeftMarkedCard>
  );
};

export default ChatCard;