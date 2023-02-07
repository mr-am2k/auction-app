import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import { RegisterForm } from 'components';
import { userRegisterRequest } from 'models/request/auth/userRegisterRequest';
import logo from 'assets/logo/auction-app-logo.svg';
import { ROUTES } from 'util/routes';
import { EN_STRINGS } from 'translation/en';

import './register.scss';
import { AuthenticationProvider } from 'models/enum/authenticationProvider';

const Register = () => {
  const { fieldValues, isValid } = useForm();

  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState<string>();

  const registerUser = async (userRegisterRequest: userRegisterRequest) => {
    authService
      .register(userRegisterRequest)
      .then(() => {
        navigate(ROUTES.LOGIN);
      })
      .catch(error => {
        setRegisterError(error.response.data.message);
      });
  };

  const submitForm = () => {
    const { firstName, lastName, email, password } = fieldValues;

    if (!isValid) {
      return;
    }

    const userRegisterRequest: userRegisterRequest = {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      role: EN_STRINGS.REGISTER.ROLE_USER,
      password: password!,
      authenticationProvider: AuthenticationProvider.LOCAL,
    };

    registerUser(userRegisterRequest);
  };

  const error = registerError?.length ? (
    <div className='c-error-message'>
      <p>{registerError}</p>
    </div>
  ) : (
    ''
  );

  return (
    <div className='c-register-page'>
      <div className='c-header-image'>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
      </div>

      <RegisterForm onSubmit={submitForm} errorMessage={error} />
    </div>
  );
};

export default Register;
