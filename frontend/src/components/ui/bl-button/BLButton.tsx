import './BLButton.scss';
import { BLButtonSize } from './types';


interface BLButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: BLButtonSize;
}

const BLButton: React.FC<BLButtonProps> = ({ size = 'm', disabled, children }) => {
  return (
    <button disabled={disabled}
      className={
        `button button--${size}` }
    >
      { children }
    </button>
  );
};

export default BLButton;
