import './BLSideSymbol.scss';
import React from 'react';


interface BLSideSymbolProps {
  children: React.ReactNode;
}

const BLSideSymbol = ({children}: BLSideSymbolProps) => {
  return (
    <div className={ 'side-symbol' }>
      { children }
    </div>
  );
};

export default BLSideSymbol;
