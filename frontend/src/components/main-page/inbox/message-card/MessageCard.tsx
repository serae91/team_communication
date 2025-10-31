import { JSX } from 'react';
import './MessageCard.scss';
import BLSideSymbol from '../../../ui/bl-side-symbol/BLSideSymbol';


interface MessageCardProps {
  title: string;
  sender: string;
  message: string;
}

function MessageCard(props: MessageCardProps): JSX.Element {
  return(
    <div className={ 'message-card' }>
      <div className={'title'}><BLSideSymbol>#</BLSideSymbol>{props.title}</div>
      <div className={'message-box'}>
        <div className={'sender'}><div className={'profile-picture'}></div>{props.sender}</div>
        {props.message}
      </div>
    </div>

  );
}

export default MessageCard;