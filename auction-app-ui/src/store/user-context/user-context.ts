import { createContext } from 'react';

import { User } from 'models/user';

interface UserContextInterface {
  loggedInUser: User | undefined;
  setLoggedInUser: (newUser: User) => void;
  isUserLoggedIn: () => boolean;
}

const UserContext = createContext<UserContextInterface>({
  loggedInUser: undefined,
  setLoggedInUser: (newUser: User) => {},
  isUserLoggedIn: () => false,
});

export default UserContext;
