import './BLLeftMarkedCard.scss';
import React, { type JSX, type ReactNode } from 'react';
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
                          }: BLLeftMarkedCardProps): JSX.Element => {
  return (
    <div className={ `left-marked-card flex-col left-marked-card--${ color } ${ className }` } onClick={ onClick }>
      { children }
    </div>
  );
};

export default BLLeftMarkedCard;
