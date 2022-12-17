import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import { RegisterForm } from 'components';
import { userRegisterRequest } from 'requestModels/userRegisterRequest';
import logo from 'assets/logo/auction-app-logo.svg';
import { validateFields } from 'util/helperFunctions';
import { FORM } from 'util/constants';
import ROUTES from 'util/routes';
import EN_STRINGS from 'util/en_strings';

import './register.scss';

const Register = () => {
  const { formValues, setFormValidInputs } = useForm();
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState<string>();

  const registerUser = async (userRegisterRequest: userRegisterRequest) => {
    authService
      .register(userRegisterRequest)
      .then(() => navigate(`/${ROUTES.LOGIN}`))
      .catch((error) => {
        console.log(error);
        setRegisterError(error.response.data.message);
      });
  };

  const submitRegisterForm = () => {
    const { firstName, lastName, email, password } = formValues;

    const validFirstName = validateFields(firstName);
    const validLastName = validateFields(lastName);
    const validEmail = validateFields(email, FORM.EMAIL);
    const validPassword = validateFields(password, FORM.PASSWORD);

    setFormValidInputs({
      firstName: validFirstName,
      lastName: validLastName,
      email: validEmail,
      password: validPassword,
    });

    if (
      validFirstName.valid === false ||
      validLastName.valid === false ||
      validEmail.valid === false ||
      validPassword.valid === false
    ) {
      return;
    }

    const userRegisterRequest: userRegisterRequest = {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      role: EN_STRINGS.REGISTER.ROLE_USER,
      password: password!,
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
        <img src={logo} alt='Logo' />
      </div>
      <RegisterForm onSubmit={submitRegisterForm} errorMessage={error} />
    </div>
  );
};

export default Register;
