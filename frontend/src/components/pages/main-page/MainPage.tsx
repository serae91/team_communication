import Inbox from './inbox/Inbox.tsx';
import './MainPage.scss';
import { BLChatProvider } from '../../../providers/bl-chat/BLChatProvider.tsx';
import { BLMessageProvider } from '../../../providers/bl-message/BLMessageProvider.tsx';
import { ModalProvider } from '../../../providers/modal/ModalProvider.tsx';
import SideNavBar from '../../layout/side-nav-bar/SideNavBar.tsx';
import {
  BLMessageWebSocketProvider
} from '../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/BLMessageWebsocketProvider.tsx';
import ChatBoxProvider from '../../../providers/chat-box/ChatBoxProvider.tsx';


const MainPage = () => {
  return (
    <BLMessageWebSocketProvider connectionURL={ 'blwebsocket' }>
      <ChatBoxProvider>
        <BLChatProvider>
          <BLMessageProvider>
            <ModalProvider>
              <div className={ 'main-page' }>
                <SideNavBar/>
                <Inbox/>
              </div>
            </ModalProvider>
          </BLMessageProvider>
        </BLChatProvider>
      </ChatBoxProvider>
    </BLMessageWebSocketProvider>
  );
};

export default MainPage;