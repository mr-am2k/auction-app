import { createContext } from 'react';

interface PageContextInterface {
  navbarTitle: string;
  navbarItems: string[];
  setNavbarTitle: (title: string) => void;
  setNavbarItems: (listOfNavbarItems: string[]) => void;
}

const PageContext = createContext<PageContextInterface>({
  navbarTitle: '',
  navbarItems: [],
  setNavbarTitle: (title: string) => '',
  setNavbarItems: (listOfNavbarItems: string[]) => {},
});

export default PageContext;
