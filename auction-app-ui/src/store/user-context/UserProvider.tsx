import { useState } from 'react';

import UserContext from './user-context';

import authService from 'services/authService';
import { storageService } from 'services/storageService';

import { LoggedInUser } from 'models/loggedInUser';
import { LOCAL_STORAGE } from 'util/constants';

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

  const loginUser = async () => {
    return new Promise<LoggedInUser>((resolve, reject) => {
      authService
        .refreshToken()
        .then((authResponse) => {
          storageService.add(
            LOCAL_STORAGE.ACCESS_TOKEN,
            authResponse.accessToken
          );

          const user: LoggedInUser = {
            id: storageService.get(LOCAL_STORAGE.ID)!,
            accessToken: authResponse.accessToken,
          };

          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const logoutUser = () => {
    authService.logout();

    storageService.removeAll([
      LOCAL_STORAGE.ACCESS_TOKEN,
      LOCAL_STORAGE.REFRESH_TOKEN,
      LOCAL_STORAGE.ID,
      LOCAL_STORAGE.FULL_NAME,
      LOCAL_STORAGE.ROLE,
    ]);
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        isUserLoggedIn,
        resetLoggedInUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
