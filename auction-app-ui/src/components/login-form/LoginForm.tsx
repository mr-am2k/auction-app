import { useEffect } from 'react';

import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import EN_STRINGS from 'translation/en';
import { INPUT_TYPE_EMAIL, INPUT_TYPE_PASSWORD, FORM } from 'util/constants';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
  displayError: boolean;
};

const LoginForm: React.FC<Props> = ({
  onSubmit,
  errorMessage,
  displayError,
}) => {
  const { setValues, setValidInputs } = useForm();

  const children = [
    <Input
      key={FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      setValue={setValues}
      name={FORM.EMAIL}
      title={FORM.EMAIL_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
      pattern={FORM.EMAIL_PATTERN}
      displayError={displayError}
    />,

    <Input
      key={FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      setValue={setValues}
      name={FORM.PASSWORD}
      title={FORM.PASSWORD_TITLE}
      placeholder={FORM.PASSWORD_PLACEHOLDER}
      pattern={FORM.PASSWORD_PATTERN}
      displayError={displayError}
    />,
  ];

  useEffect(() => {
    setValidInputs({
      email: {
        valid: false,
        message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
      },
      password: {
        valid: false,
        message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
      },
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
