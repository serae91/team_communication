import './BLContentCard.scss';
import type { ReactNode } from 'react';


interface BLContentCardProps {
  children: ReactNode,
  className?: string;
}

const BLContentCard = (props: BLContentCardProps) => {
  return (
    <div className={ `content-card ${ props.className ?? '' }` }>
      { props.children }
    </div>
  );
};

export default BLContentCard;
