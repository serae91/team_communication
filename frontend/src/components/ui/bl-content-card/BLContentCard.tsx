import './BLContentCard.scss';
import type { JSX, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';


interface BLContentCardProps {
  children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined,
  className?: string;
}

const BLContentCard = (props: BLContentCardProps): JSX.Element => {
  return (
    <div className={`content-card flex-col ${props.className??''}`}>
      {props.children}
    </div>
  );
};

export default BLContentCard;
