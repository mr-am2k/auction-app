import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useUser } from 'hooks/useUser';

import authService from 'services/authService';

import { User } from 'models/user';
import { userLoginRequest } from 'requestModels/userLoginRequest';
import EN_STRINGS from 'util/en_strings';
import { PASSWORD_TYPE, EMAIL_TYPE } from 'util/constants';
import { checkIfStringIsEmpty } from 'util/helperFunctions';
import { Input } from 'components';
import logo from 'assets/logo/auction-app-logo.svg';

import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const [loginError, setLoginError] = useState('');

  const { setLoggedInUser, loggedInUser, isUserLoggedIn } = useUser();

  const validateFields = () => {
    setIsEmailEmpty(checkIfStringIsEmpty(email));
    setIsPasswordEmpty(checkIfStringIsEmpty(password));
  };

  const loginUser = async (userLoginRequest: userLoginRequest) => {
    try {
      const authResponse = await authService.login(userLoginRequest);
      console.log(authResponse);

      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('id', authResponse.id);
      localStorage.setItem('role', authResponse.roles[0]);

      const user: User = {
        id: authResponse.id,
        token: authResponse.token
      }

      setLoggedInUser(user);

      setEmail('');
      setPassword('');
      setLoginError('');

      navigate('/')
    } catch (error: any) {
      setLoginError(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(isUserLoggedIn())
    console.log(loggedInUser);
  }, [loggedInUser, isUserLoggedIn]);

  const submitLoginForm = (event: React.FormEvent) => {
    event.preventDefault();

    validateFields();

    if (checkIfStringIsEmpty(email) || checkIfStringIsEmpty(password)) {
      return;
    }

    const userLoginRequest: userLoginRequest = {
      username: email,
      password,
    };

    loginUser(userLoginRequest);
    console.log(isUserLoggedIn());
  };

  return (
    <div className='c-login-page'>
      <div className='c-header-image'>
        <img src={logo} alt='Logo' />
      </div>

      <div className='c-main-page'>
        <form className='c-form'>
          <h2>{EN_STRINGS.LOGIN.LOGIN}</h2>

          <Input
            placeholder={EN_STRINGS.FORM.EMAIL_PLACEHOLDER}
            name={EN_STRINGS.FORM.EMAIL}
            isEmpty={isEmailEmpty}
            errorMessage={EN_STRINGS.FORM.FIELD_IS_REQUIRED}
            type={EMAIL_TYPE}
            value={email}
            setValue={setEmail}
          />

          <Input
            placeholder={EN_STRINGS.FORM.PASSWORD_PLACEHOLDER}
            name={EN_STRINGS.FORM.PASSWORD}
            isEmpty={isPasswordEmpty}
            errorMessage={EN_STRINGS.FORM.FIELD_IS_REQUIRED}
            type={PASSWORD_TYPE}
            value={password}
            setValue={setPassword}
          />

          {loginError.length ? (
            <div className='c-failed-login'>
              <p>{loginError}</p>
            </div>
          ) : (
            ''
          )}

          <button onClick={submitLoginForm}>{EN_STRINGS.LOGIN.LOGIN}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
