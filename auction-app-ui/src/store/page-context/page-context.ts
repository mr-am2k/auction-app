import { createContext } from 'react';

interface PageContextInterface {
  navbarItems: string[];
  setNavbarItems: (listOfNavbarItems: string[]) => void;
}

const PageContext = createContext<PageContextInterface>({
  navbarItems: [],
  setNavbarItems: (listOfNavbarItems: string[]) => {},
});

export default PageContext;
