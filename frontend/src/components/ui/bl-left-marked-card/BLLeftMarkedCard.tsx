import './BLLeftMarkedCard.scss';
import { JSX } from 'react';
import { Color } from './types';
import { color } from 'framer-motion';

interface BLLeftMarkedCardProps {
  children;
  className: string;
  color: Color;
}

const BLLeftMarkedCard = (props={children: undefined, className: '', color: 'black'} as BLLeftMarkedCardProps): JSX.Element => {
  return (
    <div className={ `left-marked-card left-marked-card--${props.color} ${props.className}` }>
      {props.children}
    </div>
  );
};

export default BLLeftMarkedCard;
