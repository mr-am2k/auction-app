import authService from 'services/authService';
import userService from 'services/userService';
import { storageService } from 'services/storageService';

import { UserSocialLoginRequest } from 'models/request/auth/userSocialLoginRequest';
import { LoggedInUser } from 'models/loggedInUser';
import { CheckIfUserExists } from 'models/request/check/checkIfUserExists';
import { AuthenticationProvider } from 'models/enum/authenticationProvider';
import { UserRegisterRequest } from 'models/request/auth/userRegisterRequest';
import { LOCAL_STORAGE } from 'util/constants';
import { EN_STRINGS } from 'translation/en';

const socialLogin = (
  userSocialLoginRequest: UserSocialLoginRequest,
  setLoggedInUser: (user: LoggedInUser) => void,
  navigate: (route: string) => void,
  setLoginError: (message: string) => void
) => {
  authService
    .googleLogin(userSocialLoginRequest)
    .then(loginResponse => {
      storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, loginResponse.accessToken);
      storageService.add(LOCAL_STORAGE.REFRESH_TOKEN, loginResponse.refreshToken);
      storageService.add(LOCAL_STORAGE.ID, loginResponse.id);
      storageService.add(LOCAL_STORAGE.FULL_NAME, loginResponse.fullName);
      storageService.add(LOCAL_STORAGE.ROLE, loginResponse.roles[0]);

      const user: LoggedInUser = {
        id: loginResponse.id,
        accessToken: loginResponse.accessToken,
      };

      setLoggedInUser(user);
      navigate('/');
    })
    .catch(error => setLoginError(error.response.data.message));
};

export const handleSocialLogin = (
  firstName: string,
  lastName: string,
  email: string,
  authenticationProvider: AuthenticationProvider,
  setLoggedInUser: (user: LoggedInUser) => void,
  navigate: (route: string) => void,
  setLoginError: (message: string) => void
) => {
  const checkIfUserExists: CheckIfUserExists = {
    email: email,
  };

  const userSocialLoginRequest: UserSocialLoginRequest = {
    email: email,
  };

  userService.checkIfUserExists(checkIfUserExists).then(userExists => {
    if (!userExists) {
      const userRegisterRequest: UserRegisterRequest = {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email,
        role: EN_STRINGS.REGISTER.ROLE_USER,
        authenticationProvider: authenticationProvider,
      };

      authService
        .register(userRegisterRequest)
        .then(() => {
          socialLogin(userSocialLoginRequest, setLoggedInUser, navigate, setLoginError);
        })
        .catch(error => setLoginError(error.response.data.message));
    } else {
      socialLogin(userSocialLoginRequest, setLoggedInUser, navigate, setLoginError);
    }
  });
};
