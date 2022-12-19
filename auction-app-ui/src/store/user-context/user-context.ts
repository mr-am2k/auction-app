import { createContext } from 'react';

import { User } from 'models/user';

interface UserContextInterface {
  loggedInUser: User | undefined;
  setLoggedInUser: (newUser: User | undefined) => void;
  isUserLoggedIn: () => boolean;
  resetLoggedInUser: () => void;
}

const UserContext = createContext<UserContextInterface>({
  loggedInUser: undefined,
  setLoggedInUser: (newUser: User | undefined) => {},
  isUserLoggedIn: () => false,
  resetLoggedInUser: () => {},
});

export default UserContext;
