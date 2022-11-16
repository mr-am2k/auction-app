import { createContext } from 'react';

import { User } from 'models/user';

interface AppContextInterface {
  loggedInUser: User | {};
  setLoggedInUser: (newUser: User) => void;
  isUserLoggedIn: () => boolean;
}

const UserContext = createContext<AppContextInterface>({
  loggedInUser: {},
  setLoggedInUser: (newUser: User) => {},
  isUserLoggedIn: () => false,
});

export default UserContext;
