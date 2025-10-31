import './BlContentCard.scss';
import { JSX } from 'react';


interface BLContentCardProps {
  children
}

const BLContentCard = (props: BLContentCardProps): JSX.Element => {
  return (
    <div className={'content-card'}>
      {props.children}
    </div>
  );
};

export default BLContentCard;
