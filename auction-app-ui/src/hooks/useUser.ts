import { useContext } from 'react';
import UserContext from 'store/user-context/user-context';

export const useUser = () => {
  const { loggedInUser, setLoggedInUser, isUserLoggedIn } = useContext(UserContext);
  return {
    loggedInUser,
    setLoggedInUser,
    isUserLoggedIn,
  };
};
