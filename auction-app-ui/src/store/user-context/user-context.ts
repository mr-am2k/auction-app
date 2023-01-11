import { createContext } from 'react';

import { LoggedInUser } from 'models/loggedInUser';

interface UserInterface {
  loggedInUser: LoggedInUser | undefined;
  setLoggedInUser: (newUser: any | undefined) => void;
  isUserLoggedIn: () => boolean;
  resetLoggedInUser: () => void;
  loginUser: () => Promise<LoggedInUser>;
  logoutUser: () => void;
}

const loggedInUser: LoggedInUser = {
  id: '',
  accessToken: '',
};

const UserContext = createContext<UserInterface>({
  loggedInUser: undefined,
  setLoggedInUser: (newUser: any | undefined) => {},
  isUserLoggedIn: () => false,
  resetLoggedInUser: () => {},
  loginUser: async () => Promise.resolve(loggedInUser),
  logoutUser: () => {},
});

export default UserContext;
