import { useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';

import { useUser } from 'hooks/useUser';

import authService from 'services/authService';
import userService from 'services/userService';
import { storageService } from 'services/storageService';

import { LoggedInUser } from 'models/loggedInUser';
import { userRegisterRequest } from 'models/request/auth/userRegisterRequest';
import { AuthenticationProvider } from 'models/enum/authenticationProvider';
import { checkIfUserExists } from 'models/request/check/checkIfUserExists';
import { UserSocialLoginRequest } from 'models/request/auth/userSocialLoginRequest';
import { LOCAL_STORAGE } from 'util/constants';
import { EN_STRINGS } from 'translation/en';
import jwtDecode from 'jwt-decode';

type Props = {
  children?: React.ReactNode;
  setLoginError: (message: string) => void;
};

const LoginGoogle: React.FC<Props> = ({ setLoginError }) => {
  const navigate = useNavigate();

  const { setLoggedInUser } = useUser();

  const socialLogin = (userSocialLoginRequest: UserSocialLoginRequest) => {
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

  const handleGoogleLogin = (response: any) => {
    const userDecoded: any = jwtDecode(response.credential);

    const checkIfUserExists: checkIfUserExists = {
      email: userDecoded.email!,
    };

    const userSocialLoginRequest: UserSocialLoginRequest = {
      email: userDecoded.email!,
    };

    userService.checkIfUserExists(checkIfUserExists).then(userExists => {
      if (!userExists) {
        const userRegisterRequest: userRegisterRequest = {
          firstName: userDecoded.given_name! || '',
          lastName: userDecoded.family_name! || '',
          email: userDecoded.email!,
          role: EN_STRINGS.REGISTER.ROLE_USER,
          authenticationProvider: AuthenticationProvider.GOOGLE,
        };

        authService
          .register(userRegisterRequest)
          .then(() => {
            socialLogin(userSocialLoginRequest);
          })
          .catch(error => setLoginError(error.response.data.message));
      } else {
        socialLogin(userSocialLoginRequest);
      }
    });
  };

  return (
    <GoogleLogin
      onSuccess={credentialsResponse => handleGoogleLogin(credentialsResponse)}
      onError={() => setLoginError(EN_STRINGS.LOGIN.GOOGLE_ERROR)}
    />
  );
};

export default LoginGoogle;
