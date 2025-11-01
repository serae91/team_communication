import './BlContentCard.scss';
import { JSX } from 'react';


interface BLContentCardProps {
  children,
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
