import { useEffect } from 'react';

import { usePage } from 'hooks/usePage';

import EN_STRINGS from 'translation/en';

import './settings.scss';

const Settings = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.SETTINGS);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.SETTINGS,
    ]);
  }, [setNavbarItems, setNavbarTitle]);

  return <div>Settings</div>;
};

export default Settings;
