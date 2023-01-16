import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import PageContext from './page-context';
import { ROUTES } from 'util/routes';

type Props = {
  children?: React.ReactNode;
};

const PageProvider: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const [navbarTitle, setNavbarTitle] = useState<string>('');
  const [navbarItems, setNavbarItems] = useState<string[]>([]);

  //those are three routes that shouldn't have navbar tracker, and since there is no components for them, navbarItems will be set to empty array here, later will be moved to the components, useEffect added to avoid unnecessary re-renders
  useEffect(() => {
    if ([ROUTES.SHOP, ROUTES.MY_ACCOUNT].includes(location.pathname)) {
      setNavbarItems([]);
    }
  }, [location.pathname]);

  return <PageContext.Provider value={{ navbarTitle, navbarItems, setNavbarTitle, setNavbarItems }}>{children}</PageContext.Provider>;
};

export default PageProvider;
