import { JSX } from 'react';
import './SideNavBar.scss';
import SideNavBarButton from './side-nav-bar-button/SideNavBarButton';
import { FaEnvelope, FaHistory, FaUserPlus } from 'react-icons/fa';
import SideNavBarProfile from './side-nav-bar-profile/SideNavBarProfile';
import BLSideSymbol from '../../ui/bl-side-symbol/BLSideSymbol';


interface SideNavBarProps {

}

function SideNavBar(props: SideNavBarProps): JSX.Element {
  return(
    <div className="side-nav-bar flex-col">
      <SideNavBarProfile/>
      <div className={ 'button-group flex-col' }>
        <SideNavBarButton badgeCount={ 3 }>
          <BLSideSymbol><FaEnvelope size={ 20 } className={'side-symbol'}/></BLSideSymbol>
          Inbox
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ undefined }>
          <BLSideSymbol><FaHistory size={ 20 } className={'side-symbol'}/></BLSideSymbol>
          History
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 }>
          <BLSideSymbol><FaUserPlus size={ 20 } className={'side-symbol'}/></BLSideSymbol>
          Invite Team Member
        </SideNavBarButton>
      </div>
      <div className={ 'button-group flex-col' }>
        <div className={'title'}>Groups</div>
        <SideNavBarButton badgeCount={ 3 }>
          <BLSideSymbol>#</BLSideSymbol> Development
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ undefined }>
          <BLSideSymbol>#</BLSideSymbol> Marketing
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 }>
          <BLSideSymbol>#</BLSideSymbol> Sales
        </SideNavBarButton>
      </div>
    </div>
  );
}

export default SideNavBar;