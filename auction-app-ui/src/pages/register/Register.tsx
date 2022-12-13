import logo from 'assets/logo/auction-app-logo.svg';
import { Input } from 'components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EN_STRINGS from 'util/en_strings';
import { checkIfStringIsEmpty } from 'util/helperFunctions';

import './register.scss';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);

  const [lastName, setLastName] = useState('');
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const validateFields = () => {
    setIsFirstNameEmpty(checkIfStringIsEmpty(firstName));
    setIsLastNameEmpty(checkIfStringIsEmpty(lastName));
    setIsEmailEmpty(checkIfStringIsEmpty(email));
    setIsPasswordEmpty(checkIfStringIsEmpty(password));
  };

  const submitRegisterForm = (event: React.FormEvent) => {
    event.preventDefault();

    validateFields();

    //for checking method has to be used, because state won't change and can't use that for validation here
    if (
      checkIfStringIsEmpty(firstName) ||
      checkIfStringIsEmpty(lastName) ||
      checkIfStringIsEmpty(email) ||
      checkIfStringIsEmpty(password)
    ) {
      return;
    }

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
  };

  return (
    <div className='c-register-page'>
      <div className='c-header-image'>
        <img src={logo} alt='Logo' />
      </div>

      <div className='c-main-page'>
        <form className='c-form'>
          <h2>{EN_STRINGS.REGISTER.REGISTER}</h2>
          <Input
            placeholder={EN_STRINGS.REGISTER.FIRST_NAME_PLACEHOLDER}
            name={EN_STRINGS.REGISTER.FIRST_NAME}
            isEmpty={isFirstNameEmpty}
            errorMessage={EN_STRINGS.REGISTER.FIELD_IS_REQUIRED}
            setValue={setFirstName}
          />

          <Input
            placeholder={EN_STRINGS.REGISTER.LAST_NAME_PLACEHOLDER}
            name={EN_STRINGS.REGISTER.LAST_NAME}
            isEmpty={isLastNameEmpty}
            errorMessage={EN_STRINGS.REGISTER.FIELD_IS_REQUIRED}
            setValue={setLastName}
          />

          <Input
            placeholder={EN_STRINGS.REGISTER.EMAIL_PLACEHOLDER}
            name={EN_STRINGS.REGISTER.EMAIL}
            isEmpty={isEmailEmpty}
            errorMessage={EN_STRINGS.REGISTER.FIELD_IS_REQUIRED}
            setValue={setEmail}
          />

          <Input
            placeholder={EN_STRINGS.REGISTER.PASSWORD_PLACEHOLDER}
            name={EN_STRINGS.REGISTER.PASSWORD}
            isEmpty={isPasswordEmpty}
            errorMessage={EN_STRINGS.REGISTER.FIELD_IS_REQUIRED}
            setValue={setPassword}
          />
          <button onClick={submitRegisterForm}>{EN_STRINGS.REGISTER.REGISTER}</button>

          <div className='c-other-options'>
            <p>{EN_STRINGS.REGISTER.HAVE_ACCOUNT}</p>
            <Link to='/login'>{EN_STRINGS.REGISTER.LOGIN}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
