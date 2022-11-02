import { useState } from 'react';
import { useLocation } from 'react-router';
import PageContext from './page-context';

type Props = {
  children?: React.ReactNode;
};

interface AppContextInterface {
  navbarItems: string[];
  setNavbarItems: (listOfNavbarItems: string[]) => void;
}

const PageProvider: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const [navbarItems, setNavbarItems] = useState<string[]>([]);

  const handelNavbarItemsUpdate = (arrayOfItems: string[]) => {
    setNavbarItems(arrayOfItems);
  };

  const pageContext: AppContextInterface = {
    navbarItems: navbarItems,
    setNavbarItems: handelNavbarItemsUpdate,
  };

  //those are three routes that shouldn't have navbar tracker, and since there is no components for them, navbarItems will be set to empty array here, later will be moved to the components
  if (
    location.pathname === '/' ||
    location.pathname === '/shop' ||
    location.pathname === '/my-account'
  ) {
    pageContext.navbarItems = [];
  }

  return (
    <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
  );
};

export default PageProvider;
