import { createContext } from 'react';

interface PageInterface {
  navbarTitle: string[];
  navbarItems: string[];
  setNavbarTitle: (title: string[]) => void;
  setNavbarItems: (listOfNavbarItems: string[]) => void;
}

const PageContext = createContext<PageInterface>({
  navbarTitle: [],
  navbarItems: [],
  setNavbarTitle: (title: string[]) => '',
  setNavbarItems: (listOfNavbarItems: string[]) => {},
});

export default PageContext;
