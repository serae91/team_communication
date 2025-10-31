import { JSX } from 'react';
import './Inbox.scss';
import BLContentCard from '../../ui/bl-content-card/BLContentCard';


interface SideNavBarProfileProps {

}

function Inbox(props: SideNavBarProfileProps): JSX.Element {
  return(<BLContentCard>
      <div className={ 'title' }>
        Inbox
      </div>
  </BLContentCard>

  );
}

export default Inbox;