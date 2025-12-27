import './ChatSummary.scss';


interface ChatSummaryProps {
  className?: string;
}

const ChatSummary = (props: ChatSummaryProps) => {
  return (
    <div className={ `summary ${ props.className ?? '' }` }>
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
};

export default ChatSummary;