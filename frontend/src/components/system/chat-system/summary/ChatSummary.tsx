import { JSX } from 'react';
import './ChatSummary.scss';


interface ChatSummaryProps {

}

function ChatSummary(props: ChatSummaryProps): JSX.Element {
  return(
    <div className={'summary'}>
      Summarize:
      <ul>
        <li>
          Phoenix is ask for the API key for the backend.
        </li>
        <li>
          Sofia needs this API key as well.
        </li>
      </ul>
    </div>
  );
}
export default ChatSummary;