import LoginForm from 'components/login-form/LoginForm';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useUser } from 'hooks/useUser';

import authService from 'services/authService';

import { User } from 'models/user';
import { userLoginRequest } from 'requestModels/userLoginRequest';
import EN_STRINGS from 'util/en_strings';
import { checkIfStringIsEmpty } from 'util/helperFunctions';
import { Input } from 'components';
import logo from 'assets/logo/auction-app-logo.svg';

import './login.scss';
import { useForm } from 'hooks/useForm';

const Login = () => {
  const navigate = useNavigate();

  const { setLoggedInUser, loggedInUser, isUserLoggedIn } = useUser();

  const { formValues } = useForm();

  const loginUser = async (userLoginRequest: userLoginRequest) => {
    try {
      const authResponse = await authService.login(userLoginRequest);
      console.log(authResponse);

      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('id', authResponse.id);
      localStorage.setItem('role', authResponse.roles[0]);

      const user: User = {
        id: authResponse.id,
        token: authResponse.token,
      };

      setLoggedInUser(user);

      navigate('/');
    } catch (error: any) {
      console.log(error);
    }
  };

  const submitLoginForm = () => {
    const { email, password } = formValues;

    if (checkIfStringIsEmpty(email) || checkIfStringIsEmpty(password)) {
      return;
    }

    const userUsername: string = email!;
    const userPassword: string = password!;

    const userLoginRequest: userLoginRequest = {
      username: userUsername,
      password: userPassword,
    };

    loginUser(userLoginRequest);
    console.log(isUserLoggedIn());
  };

  useEffect(() => {
    console.log(isUserLoggedIn());
    console.log(loggedInUser);
  }, [loggedInUser, isUserLoggedIn]);

  return (
    <div className='c-login-page'>
      <div className='c-header-image'>
        <img src={logo} alt='Logo' />
      </div>
      <LoginForm onSubmit={submitLoginForm} />
    </div>
  );
};

export default Login;
