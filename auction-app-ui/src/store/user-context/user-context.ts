import { createContext } from 'react';

import { User } from 'models/user';

interface UserContextInterface {
  loggedInUser: User | {};
  setLoggedInUser: (newUser: User) => void;
  isUserLoggedIn: () => boolean;
}

const UserContext = createContext<UserContextInterface>({
  loggedInUser: {},
  setLoggedInUser: (newUser: User) => {},
  isUserLoggedIn: () => false,
});

export default UserContext;
