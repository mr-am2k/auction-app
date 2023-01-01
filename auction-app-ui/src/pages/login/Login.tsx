import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useUser } from 'hooks/useUser';
import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import LoginForm from 'components/login-form/LoginForm';
import { userLoginRequest } from 'requestModels/userLoginRequest';
import { storageService } from 'services/storageService';
import { LOCAL_STORAGE } from 'util/constants';
import logo from 'assets/logo/auction-app-logo.svg';

import './login.scss';

const Login = () => {
  const { fieldValues, isValid } = useForm();
  const { setLoggedInUser } = useUser();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>();

  const loginUser = async (loginRequest: userLoginRequest) => {
    authService
      .login(loginRequest)
      .then((authResponse) => {
        storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, authResponse.accessToken);
        storageService.add(LOCAL_STORAGE.REFRESH_TOKEN, authResponse.refreshToken);
        storageService.add(LOCAL_STORAGE.ID, authResponse.id);
        storageService.add(LOCAL_STORAGE.FULL_NAME, authResponse.fullName);
        storageService.add(LOCAL_STORAGE.ROLE, authResponse.roles[0]);

        const user = {
          id: authResponse.id,
          token: authResponse.accessToken,
        };

        setLoggedInUser(user);
        navigate('/');
      })
      .catch((error) => {
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

      <LoginForm onSubmit={submitForm} errorMessage={error} />
    </div>
  );
};

export default Login;
