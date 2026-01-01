import './BLUrgencyToken.scss';
import type { BLHintCardType } from '../bl-hint-card/types.ts';
import React from 'react';


interface BLUrgencyTokenProps {
  hintCardType: BLHintCardType;
}

const BLUrgencyToken = ({hintCardType}: BLUrgencyTokenProps) => {
  return (
    <div className={ 'urgency-token urgency-token--urgent' }>
      <div className={ 'urgency-dot' }/>
      Urgent Topic
    </div>
  );
};

export default BLUrgencyToken;