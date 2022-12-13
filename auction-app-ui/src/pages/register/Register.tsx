import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Input } from 'components';

import EN_STRINGS from 'util/en_strings';
import { TEXT_TYPE, PASSWORD_TYPE, EMAIL_TYPE } from 'util/constants';
import { checkIfStringIsEmpty } from 'util/helperFunctions';
import logo from 'assets/logo/auction-app-logo.svg';

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
            placeholder={EN_STRINGS.FORM.FIRST_NAME_PLACEHOLDER}
            name={EN_STRINGS.FORM.FIRST_NAME}
            isEmpty={isFirstNameEmpty}
            errorMessage={EN_STRINGS.FORM.FIELD_IS_REQUIRED}
            type={TEXT_TYPE}
            setValue={setFirstName}
          />

          <Input
            placeholder={EN_STRINGS.FORM.LAST_NAME_PLACEHOLDER}
            name={EN_STRINGS.FORM.LAST_NAME}
            isEmpty={isLastNameEmpty}
            errorMessage={EN_STRINGS.FORM.FIELD_IS_REQUIRED}
            type={TEXT_TYPE}
            setValue={setLastName}
          />

          <Input
            placeholder={EN_STRINGS.FORM.EMAIL_PLACEHOLDER}
            name={EN_STRINGS.FORM.EMAIL}
            isEmpty={isEmailEmpty}
            errorMessage={EN_STRINGS.FORM.FIELD_IS_REQUIRED}
            type={EMAIL_TYPE}
            setValue={setEmail}
          />

          <Input
            placeholder={EN_STRINGS.FORM.PASSWORD_PLACEHOLDER}
            name={EN_STRINGS.FORM.PASSWORD}
            isEmpty={isPasswordEmpty}
            errorMessage={EN_STRINGS.FORM.FIELD_IS_REQUIRED}
            type={PASSWORD_TYPE}
            setValue={setPassword}
          />
          <button onClick={submitRegisterForm}>
            {EN_STRINGS.REGISTER.REGISTER}
          </button>

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
