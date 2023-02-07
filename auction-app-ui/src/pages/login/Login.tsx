import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useUser } from 'hooks/useUser';
import { useForm } from 'hooks/useForm';

import authService from 'services/authService';
import { storageService } from 'services/storageService';

import LoginForm from 'components/LoginForm/LoginForm';
import { LoggedInUser } from 'models/loggedInUser';
import { userLoginRequest } from 'models/request/auth/userLoginRequest';
import { LOCAL_STORAGE } from 'util/constants';
import logo from 'assets/logo/auction-app-logo.svg';

import './login.scss';

import { GoogleLogin } from '@react-oauth/google';
import { decode } from 'punycode';
import jwtDecode from 'jwt-decode';
import userService from 'services/userService';
import { userRegisterRequest } from 'models/request/auth/userRegisterRequest';
import { EN_STRINGS } from 'translation/en';
import { AuthenticationProvider } from 'models/enum/authenticationProvider';
import { checkIfUserExists } from 'models/request/check/checkIfUserExists';

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

  const handleGoogleLogin = (response: any) => {
    const userDecoded: any = jwtDecode(response.credential);
    console.log(userDecoded);
    const checkIfUserExists: checkIfUserExists = {
      email: userDecoded.email!,
    };
    userService.checkIfUserExists(checkIfUserExists).then(userExists => {
      console.log(userExists);
      if (!userExists) {
        const userRegisterRequest: userRegisterRequest = {
          firstName: userDecoded.given_name!,
          lastName: userDecoded.family_name!,
          email: userDecoded.email!,
          role: EN_STRINGS.REGISTER.ROLE_USER,
          authenticationProvider: AuthenticationProvider.GOOGLE,
        };
        authService.register(userRegisterRequest).then(response => console.log(response));
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

  return (
    <div className='c-login-page'>
      <div className='c-header-image'>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
      </div>
      <GoogleLogin
        onSuccess={credentialsResponse => handleGoogleLogin(credentialsResponse)}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <LoginForm onSubmit={submitForm} errorMessage={error} />
    </div>
  );
};

export default Login;
