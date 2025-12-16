import './BLContentCard.scss';
import type { ReactNode } from 'react';


interface BLContentCardProps {
  children: ReactNode,
  className?: string;
}

const BLContentCard = (props: BLContentCardProps) => {
  return (
    <div className={`content-card flex-col ${props.className??''}`}>
      {props.children}
    </div>
  );
};

export default BLContentCard;
