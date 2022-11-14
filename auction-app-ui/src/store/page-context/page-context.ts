import { createContext} from "react";

interface AppContextInterface{
  navbarItems: string[],
  setNavbarItems: (listOfNavbarItems: string[]) => void
}

const PageContext = createContext<AppContextInterface>({
  navbarItems: [],
  setNavbarItems: (listOfNavbarItems: string[]) => {}
});

export default PageContext;