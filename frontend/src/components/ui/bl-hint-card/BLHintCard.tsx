import './BlHintCard.scss';
import type { JSX, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import type { BLHintCardType } from './types';


interface BLHintCardProps {
  children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined,
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
