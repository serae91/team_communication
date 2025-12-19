import './BLInput.scss';
import type { RefObject } from 'react';

interface BLInputProps {
  className?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const BLInput = ({className, inputRef}: BLInputProps) => {
  return (
    <input className={ `bl-input ${ className ?? '' }` } ref={ inputRef }/>
  );
};

export default BLInput;
