import Inbox from './inbox/Inbox.tsx';
import './MainPage.scss';
import { BLChatProvider } from '../../../providers/bl-chat/BLChatProvider.tsx';
import { BLMessageProvider } from '../../../providers/bl-message/BLMessageProvider.tsx';
import { ModalProvider } from '../../../providers/modal/ModalProvider.tsx';
import SideNavBar from '../../layout/side-nav-bar/SideNavBar.tsx';
import {
  WebSocketMessageWebSocketProvider
} from '../../../providers/bl-websocket/bl-websocket-types/bl-messages-websocket/WebSocketMessageWebSocketProvider.ts';
import ChatBoxProvider from '../../../providers/chat-box/ChatBoxProvider.tsx';


const MainPage = () => {
  return (
    <WebSocketMessageWebSocketProvider connectionURL={ 'blwebsocket' }>
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
    </WebSocketMessageWebSocketProvider>
  );
};

export default MainPage;