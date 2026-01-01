import './BLProfileToken.scss';

interface BLProfileTokenProps {
  username: string;
}

const BLProfileToken = ({username}: BLProfileTokenProps) => {
  return (<div className={ 'profile-token' }>
    <div className={ 'profile-picture' }></div>
    { username }
  </div>);
};

export default BLProfileToken;