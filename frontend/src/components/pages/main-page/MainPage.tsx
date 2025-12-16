import Inbox from './inbox/Inbox.tsx';
import './MainPage.scss';
import { BLChatProvider } from '../../../providers/bl-chat/BLChatProvider.tsx';
import { BLMessageProvider } from '../../../providers/bl-message/BLMessageProvider.tsx';
import { ModalProvider } from '../../../providers/modal/ModalProvider.tsx';
import { SideNavBar } from '../../layout/side-nav-bar/SideNavBar.tsx';
import {
  BLMessageWebSocketProvider
} from '../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';


function MainPage() {
  return (
    <BLChatProvider>
      <BLMessageProvider>
        <BLMessageWebSocketProvider connectionURL={ 'blwebsocket' }>
          <ModalProvider>
            <div className={ 'main-page full-width full-height' }>
              <SideNavBar/>
              <Inbox/>
            </div>
          </ModalProvider>
        </BLMessageWebSocketProvider>
      </BLMessageProvider>
    </BLChatProvider>
  );
}

export default MainPage;