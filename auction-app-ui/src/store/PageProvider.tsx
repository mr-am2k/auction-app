import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ROUTES from 'util/routes';
import PageContext from './page-context';

type Props = {
  children?: React.ReactNode;
};

const PageProvider: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const [navbarItems, setNavbarItems] = useState<string[]>([]);

  //those are three routes that shouldn't have navbar tracker, and since there is no components for them, navbarItems will be set to empty array here, later will be moved to the components, useEffect added to avoid unnecessary re-renders
  useEffect(() => {
    if (
      location.pathname === `/${ROUTES.SHOP}` ||
      location.pathname === `/${ROUTES.MY_ACCOUNT}`
    ) {
      setNavbarItems([]);
    }
  }, [location.pathname]);

  return (
    <PageContext.Provider value={{ navbarItems, setNavbarItems }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;
