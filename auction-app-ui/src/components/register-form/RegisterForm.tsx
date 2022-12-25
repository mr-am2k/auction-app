import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import EN_STRINGS from 'translation/en';
import {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_PASSWORD,
  FORM,
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
      key={FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      name={FORM.FIRST_NAME}
      title={FORM.FIRST_NAME_TITLE}
      placeholder={FORM.FIRST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      name={FORM.LAST_NAME}
      title={FORM.LAST_NAME_TITLE}
      placeholder={FORM.LAST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      name={FORM.EMAIL}
      title={FORM.EMAIL_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
      pattern={FORM.EMAIL_PATTERN}
      validator={validateEmail}
    />,

    <Input
      key={FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      name={FORM.PASSWORD}
      title={FORM.PASSWORD_TITLE}
      placeholder={FORM.PASSWORD_PLACEHOLDER}
      pattern={FORM.PASSWORD_PATTERN}
      validator={validatePassword}
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
      />
    </div>
  );
};

export default RegisterForm;
