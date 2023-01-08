import { useState } from 'react';

import UserContext from './user-context';
import { LoggedInUser } from 'models/loggedInUser';

type Props = {
  children?: React.ReactNode;
};

const UserProvider: React.FC<Props> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | undefined>();

  const isUserLoggedIn = () => {
    if (loggedInUser) {
      return true;
    }
    return false;
  };

  const resetLoggedInUser = () => {
    setLoggedInUser(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        isUserLoggedIn,
        resetLoggedInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
