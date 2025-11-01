import './SideNavBarButton.scss';
interface SideNavBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  badgeCount?: number;
}

const SideNavBarButton: React.FC<SideNavBarButtonProps> = ({ badgeCount, disabled, children }) => {
  return (
    <button disabled={false} className="side-nav-bar-button">
      <div className={'content'}>
        <div className={'label'}>{ children }</div>
        {
          badgeCount !== undefined && <div className={ 'badge' }>{ badgeCount }</div>
        }
      </div>
  </button>);
}
export default SideNavBarButton;