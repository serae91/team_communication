import { JSX } from 'react';
import './SideNavBarProfile.scss';
import {
  FaArrowsAltV,
  FaExpandArrowsAlt, FaHandHoldingUsd,
} from 'react-icons/fa';


interface SideNavBarProfileProps {

}

function SideNavProfile(props: SideNavBarProfileProps): JSX.Element {
  return(
    <div className={ 'profile' }>
      <button className={ 'card' }>
        <div className={ 'picture' }></div>
        <div className={ 'envelope' }>
          <div className={ 'description' }>
            <div className={ 'name' }>Olivia Rhye</div>
            <div className={ 'e-mail' }>olivia@beamline.com</div>
          </div>
          <FaHandHoldingUsd size={ 20 } className={'icon'}/>
        </div>
      </button>
      <FaHandHoldingUsd size={ 20 } className={'icon'}/>
    </div>
  );
}

export default SideNavProfile;