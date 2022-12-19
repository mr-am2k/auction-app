import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useUser } from 'hooks/useUser';
import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import LoginForm from 'components/login-form/LoginForm';
import { User } from 'models/user';
import { userLoginRequest } from 'requestModels/userLoginRequest';
import { storageService } from 'services/storageService';
import { LOCAL_STORAGE } from 'util/constants';
import logo from 'assets/logo/auction-app-logo.svg';

import './login.scss';

const Login = () => {
  const { values, setValues, validInputs } = useForm();
  const { setLoggedInUser } = useUser();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>();
  const [displayError, setDisplayError] = useState(false);

  const loginUser = async (loginRequest: userLoginRequest) => {
    authService
      .login(loginRequest)
      .then((authResponse) => {
        storageService.add(LOCAL_STORAGE.TOKEN, authResponse.token);
        storageService.add(LOCAL_STORAGE.ID, authResponse.id);
        storageService.add(LOCAL_STORAGE.FULL_NAME, authResponse.fullName);
        storageService.add(LOCAL_STORAGE.ROLE, authResponse.roles[0]);

        const user: User = {
          id: authResponse.id,
          token: authResponse.token,
        };

        setLoggedInUser(user);
        setValues({});
        navigate('/');
      })
      .catch((error) => {
        setLoginError(error.response.data.message);
      });
  };

  const submitForm = () => {
    const { email, password } = values;

    const loginRequest: userLoginRequest = {
      username: email!,
      password: password!,
    };

    if (
      [validInputs.email?.valid, validInputs.password?.valid].some(
        (input) => input === false
      )
    ) {
      setDisplayError(true);
      return;
    }

    setDisplayError(false);
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
        <img src={logo} alt='Logo' />
      </div>
      <LoginForm
        onSubmit={submitForm}
        errorMessage={error}
        displayError={displayError}
      />
    </div>
  );
};

export default Login;
