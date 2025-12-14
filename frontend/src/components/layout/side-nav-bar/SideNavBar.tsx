import './SideNavBar.scss';
import SideNavBarButton from './side-nav-bar-button/SideNavBarButton';
import { FaEnvelope, FaHistory, FaUserPlus } from 'react-icons/fa';
import BLSideSymbol from '../../ui/bl-side-symbol/BLSideSymbol';
import { useModal } from '../../../providers/modal/ModalProvider.tsx';
import { SideNavBarProfile } from './side-nav-bar-profile/SideNavBarProfile.tsx';


interface SideNavBarProps {

}

export const SideNavBar = ({}: SideNavBarProps) => {
  const { openModal } = useModal()
  return(
    <div className="side-nav-bar flex-col">
      <SideNavBarProfile/>
      <button onClick={() => openModal('CREATE_CHAT')}>Open Create Chat Modal</button>
      <div className={ 'button-group flex-col' }>
        <SideNavBarButton badgeCount={ 3 }>
          <BLSideSymbol><FaEnvelope size={ 20 } className={'side-symbol'}/></BLSideSymbol>
          Inbox
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 1 }>
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
        <SideNavBarButton badgeCount={ 4 }>
          <BLSideSymbol>#</BLSideSymbol> Marketing
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 }>
          <BLSideSymbol>#</BLSideSymbol> Sales
        </SideNavBarButton>
      </div>
    </div>
  );
}