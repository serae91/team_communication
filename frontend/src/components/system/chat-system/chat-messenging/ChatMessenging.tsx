import { JSX } from 'react';
import './ChatMessenging.scss';
import ChatMessage from './chat-message/ChatMessage';
import BLInput from '../../../ui/bl-input/BLInput';
import {
  FaArrowRight
} from 'react-icons/fa';


interface ChatMessengingProps {

}

function ChatMessenging(props: ChatMessengingProps): JSX.Element {
  return(
    <div className={'chat-messenging'}>
      <ChatMessage sender={'Phoenix Baker'} postTime={new Date()} message={'Hey Olivia! I hope you\'re doing well. I wanted to reach out because I need the API for the backend to move forward with our project. It would really help me out if you could send it over when you have a moment.'}/>
      <ChatMessage sender={'Sofia Patel'} postTime={new Date()} message={'I would appreciate it if you could also ensure that this is available on my end. Having access to this information will help me stay aligned with our progress and facilitate smoother communication as we move forward with the project.'}/>
      <div className={'flex-row'}><BLInput/><button className={'send-button'}><FaArrowRight/></button></div>
    </div>
  );
}
export default ChatMessenging;