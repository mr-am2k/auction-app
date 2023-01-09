import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'hooks/useForm';

import { Input, Form } from '../index';
import { EN_STRINGS, USER } from 'translation/en';
import {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_PASSWORD,
  USER_FORM,
} from 'util/constants';
import { validate as validateEmail } from 'validators/validateEmail';
import { validate as validatePassword } from 'validators/validatePassword';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const RegisterForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { resetFieldValues, setFieldValidationResults } = useForm();

  const children = [
    <Input
      key={USER_FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      name={USER_FORM.FIRST_NAME}
      title={USER.FIRST_NAME_TITLE}
      placeholder={USER_FORM.FIRST_NAME_PLACEHOLDER}
      required
    />,

    <Input
      key={USER_FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      name={USER_FORM.LAST_NAME}
      title={USER.LAST_NAME_TITLE}
      placeholder={USER_FORM.LAST_NAME_PLACEHOLDER}
      required
    />,

    <Input
      key={USER_FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      name={USER_FORM.EMAIL}
      title={USER.EMAIL_TITLE}
      placeholder={USER_FORM.EMAIL_PLACEHOLDER}
      pattern={USER_FORM.EMAIL_PATTERN}
      validator={validateEmail}
      required
    />,

    <Input
      key={USER_FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      name={USER_FORM.PASSWORD}
      title={USER.PASSWORD_TITLE}
      placeholder={USER_FORM.PASSWORD_PLACEHOLDER}
      pattern={USER_FORM.PASSWORD_PATTERN}
      validator={validatePassword}
      required
    />,
  ];

  const otherOptions = (
    <div>
      <div className='c-other-options'>
        <p>{EN_STRINGS.REGISTER.HAVE_ACCOUNT}</p>
        <Link to='/login'>{EN_STRINGS.REGISTER.LOGIN}!</Link>
      </div>
    </div>
  );

  useEffect(() => {
    return () => {
      resetFieldValues();
      setFieldValidationResults({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form
        children={children}
        onSubmit={onSubmit}
        primaryActionLabel={EN_STRINGS.REGISTER.REGISTER}
        otherOptions={otherOptions}
        errorMessage={errorMessage}
        className='c-form-border'
      />
    </div>
  );
};

export default RegisterForm;
