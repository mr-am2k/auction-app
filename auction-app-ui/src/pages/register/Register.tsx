import { useNavigate } from 'react-router';

import { useForm } from 'hooks/useForm';

import authService from 'services/authService';

import { RegisterForm } from 'components';
import { userRegisterRequest } from 'requestModels/userRegisterRequest';
import logo from 'assets/logo/auction-app-logo.svg';
import { checkIfStringIsEmpty } from 'util/helperFunctions';
import EN_STRINGS from 'util/en_strings';

import './register.scss';

const Register = () => {
  const { formValues } = useForm();
  const navigate = useNavigate();

  const registerUser = async (userRegisterRequest: userRegisterRequest) => {
    try {
      await authService.register(userRegisterRequest);

      navigate('/login');
    } catch (error: any) {
      console.log(error);
    }
  };

  const submitRegisterForm = () => {
    const { firstName, lastName, email, password } = formValues;

    if (
      checkIfStringIsEmpty(firstName) ||
      checkIfStringIsEmpty(lastName) ||
      checkIfStringIsEmpty(email) ||
      checkIfStringIsEmpty(password)
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

  return (
    <div className='c-register-page'>
      <div className='c-header-image'>
        <img src={logo} alt='Logo' />
      </div>
      <RegisterForm onSubmit={submitRegisterForm} />
    </div>
  );
};

export default Register;
