import './BLButton.scss';
import type { BLButtonSize } from './types';


interface BLButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: BLButtonSize;
}

const BLButton = ({size = 'm', disabled, children}: BLButtonProps) => {
  return (
    <button disabled={ disabled }
            className={
              `button button--${ size }` }
    >
      { children }
    </button>
  );
};

export default BLButton;
