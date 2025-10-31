import { JSX } from 'react';
import './MessageCard.scss';
import BLSideSymbol from '../../../ui/bl-side-symbol/BLSideSymbol';
import BLLeftMarkedCard from '../../../ui/bl-left-marked-card/BLLeftMarkedCard';
import { Color } from '../../../ui/bl-left-marked-card/types';


interface MessageCardProps {
  title: string;
  sender: string;
  message: string;
  color: Color
}

function MessageCard(props: MessageCardProps): JSX.Element {
  return(
    <BLLeftMarkedCard className={'message-card'} color={props.color}>
      <div className={'title'}><BLSideSymbol>#</BLSideSymbol>{props.title}</div>
      <div className={'message-box'}>
        <div className={'sender'}><div className={'profile-picture'}></div>{props.sender}</div>
        {props.message}
      </div>
    </BLLeftMarkedCard>

  );
}

export default MessageCard;