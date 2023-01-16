import { Input, Form } from '../index';
import { useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import { EN_STRINGS, USER } from 'translation/en';
import { INPUT_TYPE_EMAIL, INPUT_TYPE_PASSWORD, USER_FORM } from 'util/constants';
import { validate as validateEmail } from 'validators/validateEmail';
import { validate as validatePassword } from 'validators/validatePassword';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const LoginForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { resetFieldValues, setFieldValidationResults } = useForm();

  const children = [
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
        primaryActionLabel={EN_STRINGS.LOGIN.LOGIN}
        errorMessage={errorMessage}
        className='c-form-border'
      />
    </div>
  );
};

export default LoginForm;
