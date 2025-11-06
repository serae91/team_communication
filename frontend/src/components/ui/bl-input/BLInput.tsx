import './BLInput.scss';
import type { JSX } from 'react';

interface BLInputProps {
  className?: string;
}

const BLInput = (props: BLInputProps): JSX.Element => {
  return (
    <input className={ `bl-input ${props.className??''}` }/>
  );
};

export default BLInput;
