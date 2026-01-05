import './SideNavBar.scss';
import SideNavBarButton from './side-nav-bar-button/SideNavBarButton';
import { FaEnvelope, FaHistory, FaUserPlus } from 'react-icons/fa';
import BLSideSymbol from '../../ui/bl-side-symbol/BLSideSymbol';
import { useModal } from '../../../providers/modal/ModalProvider.tsx';
import SideNavBarProfile from './side-nav-bar-profile/SideNavBarProfile.tsx';
import { LocalModalTypeEnum } from '../../../enums/LocalModalTypeEnum.ts';
import { useChatBox } from '../../../providers/chat-box/ChatBoxProvider.tsx';
import { ChatBoxEnum } from '../../../enums/ChatBoxEnum.ts';

const SideNavBar = () => {
  const {setChatBox} = useChatBox();
  const {openLocalModal} = useModal();
  return (
    <div className="side-nav-bar">
      <SideNavBarProfile/>
      <button onClick={ () => openLocalModal({type: LocalModalTypeEnum.CREATE_CHAT}) }>Open Create Chat Modal</button>
      <div className={ 'button-group' }>
        <SideNavBarButton badgeCount={ 3 } onClick={ () => setChatBox(ChatBoxEnum.INBOX) }>
          <BLSideSymbol><FaEnvelope size={ 20 } className={ 'side-symbol' }/></BLSideSymbol>
          Inbox
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 1 } onClick={ () => setChatBox(ChatBoxEnum.REMINDER) }>
          <BLSideSymbol><FaHistory size={ 20 } className={ 'side-symbol' }/></BLSideSymbol>
          Reminder
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 } onClick={ () => setChatBox(ChatBoxEnum.SENT) }>
          <BLSideSymbol><FaUserPlus size={ 20 } className={ 'side-symbol' }/></BLSideSymbol>
          Sent
        </SideNavBarButton>
        <SideNavBarButton badgeCount={ 0 } onClick={ () => setChatBox(ChatBoxEnum.ALL) }>
          <BLSideSymbol><FaUserPlus size={ 20 } className={ 'side-symbol' }/></BLSideSymbol>
          All
        </SideNavBarButton>
      </div>
      <div className={ 'button-group' }>
        <div className={ 'title' }>Groups</div>
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
};

export default SideNavBar;