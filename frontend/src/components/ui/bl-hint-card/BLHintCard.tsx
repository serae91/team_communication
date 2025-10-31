import './BlHintCard.scss';
import { JSX } from 'react';
import { BLHintCardType } from './types';


interface BLHintCardProps {
  children,
  className?: string;
  hintCardType: BLHintCardType;
}

const BLHintCard = (props: BLHintCardProps): JSX.Element => {
  return (
    <div className={`hint-card hint-card--${props.hintCardType} ${props.className??''}`}>
      {props.children}
    </div>
  );
};

export default BLHintCard;
