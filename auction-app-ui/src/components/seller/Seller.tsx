import { useEffect } from 'react';

import { usePage } from 'hooks/usePage';

import EN_STRINGS from 'translation/en';

import './seller.scss'

const Seller = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.SELLER);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.SELLER,
    ]);
  }, [setNavbarItems, setNavbarTitle]);

  return (
    <div>Seller</div>
  )
}

export default Seller