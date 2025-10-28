import { JSX } from 'react';
import './MainPage.scss';
import SideNavBar from './side-nav-bar/SideNavBar';


interface BLMainPageProps {

}

function MainPage(props: BLMainPageProps): JSX.Element {
  return(
    <div className={'main-page'}>
      <SideNavBar/>
    </div>
  );
}
export default MainPage;