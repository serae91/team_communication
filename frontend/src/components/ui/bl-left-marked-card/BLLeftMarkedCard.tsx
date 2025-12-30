import './BLLeftMarkedCard.scss';
import React, { type ReactNode } from 'react';
import type { BLLeftMarkedCardColor } from './types';

interface BLLeftMarkedCardProps {
  children?: ReactNode;
  className?: string;
  color?: BLLeftMarkedCardColor;
  onClick?: () => void;
}

const BLLeftMarkedCard = ({
                            children,
                            className = '',
                            color = 'black',
                            onClick
                          }: BLLeftMarkedCardProps) => {
  return (
    <div className={ `left-marked-card left-marked-card--${ color } ${ className }` } onClick={ onClick }>
      { children }
    </div>
  );
};

export default BLLeftMarkedCard;
