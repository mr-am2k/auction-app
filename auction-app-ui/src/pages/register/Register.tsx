import { useNavigate } from 'react-router';

import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import { RegisterForm } from 'components';
import { userRegisterRequest } from 'requestModels/userRegisterRequest';
import logo from 'assets/logo/auction-app-logo.svg';
import { checkIfStringIsEmpty } from 'util/stringUtils';
import EN_STRINGS from 'util/en_strings';

import './register.scss';
import { useState } from 'react';

const Register = () => {
  const { formValues, formValidInputs } = useForm();
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState<string>();

  const registerUser = async (userRegisterRequest: userRegisterRequest) => {
    authService
      .register(userRegisterRequest)
      .then(() => navigate('/login'))
      .catch((error) => {
        console.log(error);
        setRegisterError(error.response.data.message);
      });
  };

  const submitRegisterForm = () => {
    const { firstName, lastName, email, password } = formValues;
    console.log(formValidInputs);

    if (
      !checkIfStringIsEmpty(firstName) ||
      !checkIfStringIsEmpty(lastName) ||
      !checkIfStringIsEmpty(email) ||
      !checkIfStringIsEmpty(password)
    ) {
      return;
    }

    const userFirstName: string = firstName!;
    const userLastName: string = lastName!;
    const userEmail: string = email!;
    const userPassword: string = password!;

    const userRegisterRequest: userRegisterRequest = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      role: EN_STRINGS.REGISTER.ROLE_USER,
      password: userPassword,
    };

    registerUser(userRegisterRequest);
  };

  const error = registerError ? (
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
      <RegisterForm onSubmit={submitRegisterForm} errorMessage={error} />
    </div>
  );
};

export default Register;
