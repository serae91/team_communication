import './BlContentCard.scss';
import { JSX } from 'react';


interface BLContentCardProps {
  children,
  className?: string;
}

const BLContentCard = (props: BLContentCardProps): JSX.Element => {
  return (
    <div className={`content-card ${props.className??''}`}>
      {props.children}
    </div>
  );
};

export default BLContentCard;
