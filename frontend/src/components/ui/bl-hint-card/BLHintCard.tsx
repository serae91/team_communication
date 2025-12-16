import './BlHintCard.scss';
import type { ReactNode } from 'react';
import type { BLHintCardType } from './types';


interface BLHintCardProps {
  children: ReactNode,
  className?: string;
  hintCardType: BLHintCardType;
}

const BLHintCard = (props: BLHintCardProps) => {
  return (
    <div className={`hint-card hint-card--${props.hintCardType} ${props.className??''}`}>
      {props.children}
    </div>
  );
};

export default BLHintCard;
