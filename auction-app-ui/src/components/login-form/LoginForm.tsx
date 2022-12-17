import { useEffect } from 'react';

import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import EN_STRINGS from 'util/en_strings';
import { INPUT_TYPE_EMAIL, INPUT_TYPE_PASSWORD, FORM } from 'util/constants';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const LoginForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { setValues, setValidInputs } = useForm();

  const children = [
    <Input
      key={FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      setValue={setValues}
      setValidInputs={setValidInputs}
      name={FORM.EMAIL}
      title={FORM.EMAIL_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
    />,

    <Input
      key={FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      setValue={setValues}
      setValidInputs={setValidInputs}
      name={FORM.PASSWORD}
      title={FORM.PASSWORD_TITLE}
      placeholder={FORM.PASSWORD_PLACEHOLDER}
    />,
  ];

  useEffect(() => {
    setValidInputs({
      email: { valid: true },
      password: { valid: true },
    });
  }, []);

  return (
    <div>
      <Form
        children={children}
        onSubmit={onSubmit}
        buttonText={EN_STRINGS.LOGIN.LOGIN}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default LoginForm;
