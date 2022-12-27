import { useEffect } from 'react';

import { usePage } from 'hooks/usePage';

import EN_STRINGS from 'translation/en';

import './wishlist.scss';

const Wishlist = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.WISHLIST);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.WISHLIST,
    ]);
  }, [setNavbarItems, setNavbarTitle]);

  return <div>Wishlist</div>;
};

export default Wishlist;
