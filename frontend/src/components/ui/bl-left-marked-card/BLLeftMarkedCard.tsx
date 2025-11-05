import './BLLeftMarkedCard.scss';
import type { JSX, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import type { BLLeftMarkedCardColor } from './types';

interface BLLeftMarkedCardProps {
  children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
  className: string;
  color: BLLeftMarkedCardColor;
}

const BLLeftMarkedCard = (props={children: undefined, className: '', color: 'black'} as BLLeftMarkedCardProps): JSX.Element => {
  return (
    <div className={ `left-marked-card flex-col left-marked-card--${props.color} ${props.className}` }>
      {props.children}
    </div>
  );
};

export default BLLeftMarkedCard;
