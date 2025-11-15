import type { JSX } from 'react';
import SideNavBar from '../../layout/side-nav-bar/SideNavBar.tsx';
import Inbox from './inbox/Inbox.tsx';
import './MainPage.scss';
import { BLChatPlainWebSocketProvider } from '../../../contexts/BLChatPlainWebSocketContext.ts';

interface BLMainPageProps {

}

function MainPage(props: BLMainPageProps): JSX.Element {
  return(
    <BLChatPlainWebSocketProvider>
      <div className={'main-page full-width full-height'}>
        <SideNavBar/>
        <Inbox/>
      </div>
    </BLChatPlainWebSocketProvider>
  );
}
export default MainPage;