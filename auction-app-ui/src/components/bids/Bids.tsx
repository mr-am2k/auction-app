import { useEffect } from 'react';

import { usePage } from 'hooks/usePage';

import EN_STRINGS from 'translation/en';

import './bids.scss'

const Bids = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.BIDS);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.BIDS,
    ]);
  }, [setNavbarItems, setNavbarTitle]);

  return (
    <div>Bids</div>
  )
}

export default Bids