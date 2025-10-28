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
          <FaEnvelope size={ 20 } style={ {marginRight: 8} }/>
          Inbox
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ undefined }>
          <FaHistory size={ 20 } style={ {marginRight: 8} }/>
          History
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 }>
          <FaUserPlus size={ 20 } style={ {marginRight: 8} }/>
          Invite Team Member
        </SideNavBarButton>
      </div>
      Groups
      <div className={ 'button-group' }>
        <SideNavBarButton badgeCount={ 3 }>
          # Development
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ undefined }>
          # Marketing
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 }>
          # Sales
        </SideNavBarButton>
      </div>
    </div>
  );
}

export default SideNavBar;