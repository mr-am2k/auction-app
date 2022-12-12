import logo from 'assets/logo/auction-app-logo.svg';
import { TextInput } from 'components';
import { useState } from 'react';

import './register.scss';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);


  const consolePrint = () => {
    if(!firstName.length){
      setIsFirstNameEmpty(true);
      return;
    }
    console.log(firstName);
  };

  return (
    <div className='c-register-page'>
      <div className='c-header-image'>
        <img src={logo} alt='Logo' />
      </div>

      <div className='c-main-page'>
        <div className='c-form'>
          <h2>REGISTER</h2>
          <TextInput
            placeholder='First name'
            name={'First name'}
            isEmpty={isFirstNameEmpty}
            errorMessage="First name field cannot be empty"
            setValue={setFirstName}
          />
          <button onClick={consolePrint}>REGISTER</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
