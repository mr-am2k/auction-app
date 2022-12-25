import { createContext } from 'react';

import { User } from 'models/user';

interface UserInterface {
  loggedInUser: User | undefined;
  setLoggedInUser: (newUser: User | undefined) => void;
  isUserLoggedIn: () => boolean;
  resetLoggedInUser: () => void;
}

const UserContext = createContext<UserInterface>({
  loggedInUser: undefined,
  setLoggedInUser: (newUser: User | undefined) => {},
  isUserLoggedIn: () => false,
  resetLoggedInUser: () => {},
});

export default UserContext;
