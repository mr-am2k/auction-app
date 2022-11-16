import { useState } from 'react';

import UserContext from './user-context';
import { User } from 'models/user';

type Props = {
  children?: React.ReactNode;
};

const UserProvider: React.FC<Props> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | {}>({}); //used for demonstration, because logic for login/register is not yet implemented

  const isUserLoggedIn = () => {
    if (Object.keys(loggedInUser).length) {
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, isUserLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
