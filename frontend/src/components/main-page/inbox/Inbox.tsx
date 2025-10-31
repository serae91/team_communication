import { JSX } from 'react';
import './Inbox.scss';
import BLContentCard from '../../ui/bl-content-card/BLContentCard';
import MessageCard from './message-card/MessageCard';


interface InboxProps {

}

function Inbox(props: InboxProps): JSX.Element {
  return(
    <BLContentCard>
      <div className={ 'title-box' }>
        <div className={ 'title' }>
          Inbox
        </div>
        <div className={ 'sub-title' }>
          A collection of all your messages
        </div>
      </div>

      <MessageCard title={'Development'} sender={ 'Phoenix Baker' } message={ 'ask for the api key for the backend.' } color={'red'}></MessageCard>
      <MessageCard title={'Development'} sender={ 'Marcus Lee' } message={ 'both requires the contact information of Microsoft and Google.' } color={'black'}></MessageCard>
  </BLContentCard>

  );
}

export default Inbox;