import React, { useState } from 'react';

import { Input } from 'components';

import { checkIfStringIsEmpty } from 'util/helperFunctions';
import { PASSWORD_TYPE, EMAIL_TYPE } from 'util/constants';
import EN_STRINGS from 'util/en_strings';
import logo from 'assets/logo/auction-app-logo.svg';

import './login.scss'

const Login = () => {
    const [email, setEmail] = useState('');
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  
    const [password, setPassword] = useState('');
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    const validateFields = () => {
        setIsEmailEmpty(checkIfStringIsEmpty(email));
        setIsPasswordEmpty(checkIfStringIsEmpty(password));
      };
    
      const submitLoginForm = (event: React.FormEvent) => {
        event.preventDefault();
    
        validateFields();
    
        if (
          checkIfStringIsEmpty(email) ||
          checkIfStringIsEmpty(password)
        ) {
          return;
        }
    
        console.log(email);
        console.log(password);
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
          <button onClick={submitLoginForm}>{EN_STRINGS.LOGIN.LOGIN}</button>
        </form>
      </div>
    </div>
  )
}

export default Login