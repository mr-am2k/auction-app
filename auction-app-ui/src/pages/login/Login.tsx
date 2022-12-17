import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useUser } from 'hooks/useUser';
import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import LoginForm from 'components/login-form/LoginForm';
import { User } from 'models/user';
import { userLoginRequest } from 'requestModels/userLoginRequest';
import { validateFields } from 'util/helperFunctions';
import { serviceStorage } from 'util/serviceStorage';
import { FORM, LOCAL_STORAGE } from 'util/constants';
import logo from 'assets/logo/auction-app-logo.svg';

import './login.scss';

const Login = () => {
  const { values, setValues, setValidInputs } = useForm();
  const { setLoggedInUser } = useUser();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string>();

  const loginUser = async (userLoginRequest: userLoginRequest) => {
    authService
      .login(userLoginRequest)
      .then((authResponse) => {
        serviceStorage.addInStorage(LOCAL_STORAGE.TOKEN, authResponse.token);
        serviceStorage.addInStorage(LOCAL_STORAGE.ID, authResponse.id);
        serviceStorage.addInStorage(LOCAL_STORAGE.FULL_NAME, authResponse.fullName);
        serviceStorage.addInStorage(LOCAL_STORAGE.ROLE, authResponse.roles[0]);

        const user: User = {
          id: authResponse.id,
          token: authResponse.token,
        };

        console.log(authResponse);

        setLoggedInUser(user);

        setValues({});

        navigate('/');
      })
      .catch((error) => {
        setLoginError(error.response.data.message);
      });
  };

  const submitLoginForm = () => {
    const { email, password } = values;

    const validEmail = validateFields(email, FORM.EMAIL);
    const validPassword = validateFields(password, FORM.PASSWORD);

    setValidInputs({
      email: validEmail,
      password: validPassword,
    });

    if (validEmail.valid === false || validPassword.valid === false) {
      return;
    }

    const userUsername: string = email!;
    const userPassword: string = password!;

    const userLoginRequest: userLoginRequest = {
      username: userUsername,
      password: userPassword,
    };

    loginUser(userLoginRequest);
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
      <LoginForm onSubmit={submitLoginForm} errorMessage={error} />
    </div>
  );
};

export default Login;
