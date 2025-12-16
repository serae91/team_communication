import './BLSideSymbol.scss';
import { JSX } from 'react';


interface BLSideSymbolProps {
  children
}

const BLSideSymbol = (props: BLSideSymbolProps): JSX.Element => {
  return (
    <div className={ 'side-symbol' }>
      { props.children }
    </div>
  );
};

export default BLSideSymbol;
