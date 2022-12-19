import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import { userRegisterRequest } from 'requestModels/userRegisterRequest';
import logo from 'assets/logo/auction-app-logo.svg';
import { ROUTES } from 'util/routes';
import EN_STRINGS from 'translation/en';

import './register.scss';
import { RegisterForm } from 'components';

const Register = () => {
  const { values, setValues, validInputs } = useForm();

  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState<string>();
  const [displayError, setDisplayError] = useState(false);

  const registerUser = async (userRegisterRequest: userRegisterRequest) => {
    authService
      .register(userRegisterRequest)
      .then(() => {
        setValues({});
        navigate(ROUTES.LOGIN);
      })
      .catch((error) => {
        setRegisterError(error.response.data.message);
      });
  };

  const submitForm = () => {
    const { firstName, lastName, email, password } = values;

    if (
      [
        validInputs.firstName?.valid,
        validInputs.lastName?.valid,
        validInputs.email?.valid,
        validInputs.password?.valid,
      ].some((input) => input === false)
    ) {
      setDisplayError(true);
      return;
    }

    const userRegisterRequest: userRegisterRequest = {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      role: EN_STRINGS.REGISTER.ROLE_USER,
      password: password!,
    };

    setDisplayError(false);
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
        <img src={logo} alt='Logo' />
      </div>
      <RegisterForm
        onSubmit={submitForm}
        errorMessage={error}
        displayError={displayError}
      />
    </div>
  );
};

export default Register;
