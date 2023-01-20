import { useState } from 'react';

import PageContext from './page-context';

type Props = {
  children?: React.ReactNode;
};

const PageProvider: React.FC<Props> = ({ children }) => {
  const [navbarTitle, setNavbarTitle] = useState<string>('');
  const [navbarItems, setNavbarItems] = useState<string[]>([]);


  return <PageContext.Provider value={{ navbarTitle, navbarItems, setNavbarTitle, setNavbarItems }}>{children}</PageContext.Provider>;
};

export default PageProvider;
