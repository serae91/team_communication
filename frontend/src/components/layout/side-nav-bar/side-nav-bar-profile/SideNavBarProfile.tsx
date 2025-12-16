import './SideNavBarProfile.scss';
import { FaHandHoldingUsd, } from 'react-icons/fa';
import { useAuth } from '../../../../providers/auth/AuthProvider.tsx';
import { Logout } from '@mui/icons-material';

export const SideNavBarProfile = () => {
  const {logout} = useAuth();
  return (
    <div className={ 'profile flex-row' }>
      <button className={ 'card' }>
        <div className={ 'picture' }></div>
        <div className={ 'envelope' }>
          <div className={ 'description' }>
            <div className={ 'name' }>Olivia Rhye</div>
            <div className={ 'e-mail' }>olivia@beamline.com</div>
          </div>
          <FaHandHoldingUsd size={ 20 } className={ 'icon' }/>
        </div>
      </button>
      <Logout onClick={ logout }/>
    </div>
  );
}