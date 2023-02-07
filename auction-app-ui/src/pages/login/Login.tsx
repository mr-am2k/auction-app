import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { useUser } from 'hooks/useUser';
import { useForm } from 'hooks/useForm';

import authService from 'services/authService';
import { storageService } from 'services/storageService';

import userService from 'services/userService';

import LoginForm from 'components/LoginForm/LoginForm';
import { LoggedInUser } from 'models/loggedInUser';
import { userLoginRequest } from 'models/request/auth/userLoginRequest';
import { userRegisterRequest } from 'models/request/auth/userRegisterRequest';
import { AuthenticationProvider } from 'models/enum/authenticationProvider';
import { checkIfUserExists } from 'models/request/check/checkIfUserExists';
import { UserSocialLoginRequest } from 'models/request/auth/userSocialLoginRequest';
import { LOCAL_STORAGE } from 'util/constants';
import { EN_STRINGS } from 'translation/en';
import jwtDecode from 'jwt-decode';

import './login.scss';

import logo from 'assets/logo/auction-app-logo.svg';

const Login = () => {
  const { fieldValues, isValid } = useForm();
  const { setLoggedInUser } = useUser();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>();

  const loginUser = async (loginRequest: userLoginRequest) => {
    authService
      .login(loginRequest)
      .then(authResponse => {
        storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, authResponse.accessToken);
        storageService.add(LOCAL_STORAGE.REFRESH_TOKEN, authResponse.refreshToken);
        storageService.add(LOCAL_STORAGE.ID, authResponse.id);
        storageService.add(LOCAL_STORAGE.FULL_NAME, authResponse.fullName);
        storageService.add(LOCAL_STORAGE.ROLE, authResponse.roles[0]);

        const user: LoggedInUser = {
          id: authResponse.id,
          accessToken: authResponse.accessToken,
        };

        setLoggedInUser(user);
        navigate('/');
      })
      .catch(error => {
        setLoginError(error.response.data.message);
      });
  };

  const submitForm = () => {
    const { email, password } = fieldValues;

    const loginRequest: userLoginRequest = {
      username: email!,
      password: password!,
    };

    if (!isValid) {
      return;
    }

    loginUser(loginRequest);
  };

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

  const error = loginError ? (
    <div className='c-error-message'>
      <p>{loginError}</p>
    </div>
  ) : (
    ''
  );

  const googleAuth = (
    <GoogleLogin
      onSuccess={credentialsResponse => handleGoogleLogin(credentialsResponse)}
      onError={() => setLoginError(EN_STRINGS.LOGIN.GOOGLE_ERROR)}
    />
  );

  return (
    <div className='c-login-page'>
      <div className='c-header-image'>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
      </div>
      <LoginForm onSubmit={submitForm} errorMessage={error} googleAuth={googleAuth} />
    </div>
  );
};

export default Login;
