import { usePage } from 'hooks/usePage';
import './profile.scss';
import { useEffect } from 'react';
import EN_STRINGS from 'translation/en';

const Profile = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.PROFILE);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.PROFILE,
    ]);
  }, [setNavbarItems, setNavbarTitle]);

  return <div>Profile</div>;
};

export default Profile;
