import { createContext } from 'react';

import { LoggedInUser } from 'models/loggedInUser';

interface UserInterface {
  loggedInUser: LoggedInUser | undefined;
  setLoggedInUser: (newUser: any | undefined) => void;
  isUserLoggedIn: () => boolean;
  resetLoggedInUser: () => void;
}

const UserContext = createContext<UserInterface>({
  loggedInUser: undefined,
  setLoggedInUser: (newUser: any | undefined) => {},
  isUserLoggedIn: () => false,
  resetLoggedInUser: () => {},
});

export default UserContext;
