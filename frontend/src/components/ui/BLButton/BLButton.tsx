import './BLButton.scss';
type Size = 's' | 'm' | 'l' | 'xl';

interface BLButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
}

const BLButton: React.FC<BLButtonProps> = ({ size = 'm', children }) => {
  return (
    <button
      className={
        `button button--${size}` }
    >
      { children }
    </button>
  );
};

export default BLButton;
