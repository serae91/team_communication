import type { JSX } from 'react';
import SideNavBar from '../../layout/side-nav-bar/SideNavBar.tsx';
import Inbox from './inbox/Inbox.tsx';
import './MainPage.scss';
import { BLChatProvider } from '../../../providers/BLChatProvider.tsx';
import { BLMessageProvider } from '../../../providers/BLMessageProvider.tsx';
import { BLWebSocketProvider } from '../../../providers/BLWebSocketProvider.tsx';

interface BLMainPageProps {

}

function MainPage(props: BLMainPageProps): JSX.Element {
  return(
    <BLChatProvider>
      <BLMessageProvider>
        <BLWebSocketProvider>
          <div className={'main-page full-width full-height'}>
            <SideNavBar/>
            <Inbox/>
          </div>
        </BLWebSocketProvider>
      </BLMessageProvider>
    </BLChatProvider>
  );
}
export default MainPage;