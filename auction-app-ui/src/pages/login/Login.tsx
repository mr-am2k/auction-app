import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useUser } from 'hooks/useUser';
import { useForm } from 'hooks/useForm';

import authService from 'services/authService';
import { storageService } from 'services/storageService';

import LoginForm from 'components/LoginForm/LoginForm';
import { LoginFacebook, LoginGoogle } from 'components';
import { LoggedInUser } from 'models/loggedInUser';
import { UserLoginRequest } from 'models/request/auth/userLoginRequest';
import { LOCAL_STORAGE } from 'util/constants';

import './login.scss';

import logo from 'assets/logo/auction-app-logo.svg';

const Login = () => {
  const { fieldValues, isValid } = useForm();
  const { setLoggedInUser } = useUser();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>();

  const loginUser = async (loginRequest: UserLoginRequest) => {
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

    const loginRequest: UserLoginRequest = {
      username: email!,
      password: password!,
    };

    if (!isValid) {
      return;
    }

    loginUser(loginRequest);
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
      <LoginForm
        onSubmit={submitForm}
        errorMessage={error}
        googleAuth={<LoginGoogle setLoginError={setLoginError} />}
        facebookAuth={<LoginFacebook setLoginError={setLoginError} />}
      />
    </div>
  );
};

export default Login;
