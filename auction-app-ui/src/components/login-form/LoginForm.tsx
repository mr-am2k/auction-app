import { Input, Form } from 'components/index';
import { useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import EN_STRINGS from 'translation/en';
import { INPUT_TYPE_EMAIL, INPUT_TYPE_PASSWORD, FORM } from 'util/constants';
import { validate as validateEmail } from 'validators/validateEmail';
import { validate as validatePassword } from 'validators/validatePassword';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const LoginForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { fieldValues, resetFieldValues, setFieldValidationResults } = useForm();
  const children = [
    <Input
      key={FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      name={FORM.EMAIL}
      title={FORM.EMAIL_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
      value={fieldValues[FORM.EMAIL]}
      pattern={FORM.EMAIL_PATTERN}
      validator={validateEmail}
      required
    />,

    <Input
      key={FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      name={FORM.PASSWORD}
      title={FORM.PASSWORD_TITLE}
      placeholder={FORM.PASSWORD_PLACEHOLDER}
      value={fieldValues[FORM.PASSWORD]}
      pattern={FORM.PASSWORD_PATTERN}
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
