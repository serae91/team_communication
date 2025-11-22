import type { JSX } from 'react';
import SideNavBar from '../../layout/side-nav-bar/SideNavBar.tsx';
import Inbox from './inbox/Inbox.tsx';
import './MainPage.scss';
import { BLChatProvider } from '../../../contexts/BLChatContext.tsx';
import { BLMessageProvider } from '../../../contexts/createWebSocketContext.tsx';

interface BLMainPageProps {

}

function MainPage(props: BLMainPageProps): JSX.Element {
  return(
    <BLChatProvider>
      <BLMessageProvider>
        <div className={'main-page full-width full-height'}>
          <SideNavBar/>
          <Inbox/>
        </div>
      </BLMessageProvider>
    </BLChatProvider>
  );
}
export default MainPage;