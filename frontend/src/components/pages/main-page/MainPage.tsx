import type { JSX } from 'react';
import Inbox from './inbox/Inbox.tsx';
import './MainPage.scss';
import { BLChatProvider } from '../../../providers/bl-chat/BLChatProvider.tsx';
import { BLMessageProvider } from '../../../providers/bl-message/BLMessageProvider.tsx';
import {
  BLMessageWebsocketProvider
} from '../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import { ModalProvider } from '../../../providers/modal/ModalOpenProvider.tsx';
import { SideNavBar } from '../../layout/side-nav-bar/SideNavBar.tsx';

interface BLMainPageProps {

}

function MainPage(props: BLMainPageProps): JSX.Element {
  return(
    <BLChatProvider>
      <BLMessageProvider>
        <BLMessageWebsocketProvider connectionURL={'blwebsocket'}>
          <ModalProvider>
            <div className={'main-page full-width full-height'}>
              <SideNavBar/>
              <Inbox/>
            </div>
          </ModalProvider>
        </BLMessageWebsocketProvider>
      </BLMessageProvider>
    </BLChatProvider>
  );
}
export default MainPage;