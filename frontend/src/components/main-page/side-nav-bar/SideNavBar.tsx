import { JSX } from 'react';
import './SideNavBar.scss';
import SideNavBarButton from './side-nav-bar-button/SideNavBarButton';
import { FaEnvelope, FaHistory, FaUserPlus } from 'react-icons/fa';


interface SideNavBarProps {

}

function SideNavBar(props: SideNavBarProps): JSX.Element {
  return(
    <div className="side-nav-bar">
      <div className={ 'button-group' }>
        <SideNavBarButton badgeCount={ 3 }>
          <FaEnvelope size={ 20 } className={'side-symbol'}/>
          Inbox
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ undefined }>
          <FaHistory size={ 20 } className={'side-symbol'}/>
          History
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 }>
          <FaUserPlus size={ 20 } className={'side-symbol'}/>
          Invite Team Member
        </SideNavBarButton>
      </div>
      <div className={ 'button-group' }>
        <div className={'title'}>Groups</div>
        <SideNavBarButton badgeCount={ 3 }>
          <div className={'side-symbol'}>#</div> Development
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ undefined }>
          <div className={'side-symbol'}>#</div> Marketing
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 }>
          <div className={'side-symbol'}>#</div> Sales
        </SideNavBarButton>
      </div>
    </div>
  );
}

export default SideNavBar;