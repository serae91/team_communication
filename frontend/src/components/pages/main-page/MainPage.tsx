import { JSX } from 'react';
import './MainPage.scss';
import SideNavBar from '../../layout/side-nav-bar/SideNavBar';
import Inbox from './inbox/Inbox';


interface BLMainPageProps {

}

function MainPage(props: BLMainPageProps): JSX.Element {
  return(
    <div className={'main-page full-width full-height'}>
      <SideNavBar/>
      <Inbox/>
    </div>
  );
}
export default MainPage;