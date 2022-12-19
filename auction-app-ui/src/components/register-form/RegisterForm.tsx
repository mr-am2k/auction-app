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

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
  displayError: boolean;
};

const RegisterForm: React.FC<Props> = ({
  onSubmit,
  errorMessage,
  displayError,
}) => {
  const { setValues, setValidInputs } = useForm();

  const children = [
    <Input
      key={FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      setValue={setValues}
      name={FORM.FIRST_NAME}
      title={FORM.FIRST_NAME_TITLE}
      placeholder={FORM.FIRST_NAME_PLACEHOLDER}
      displayError={displayError}
    />,

    <Input
      key={FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      setValue={setValues}
      name={FORM.LAST_NAME}
      title={FORM.LAST_NAME_TITLE}
      placeholder={FORM.LAST_NAME_PLACEHOLDER}
      displayError={displayError}
    />,

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

  const otherOptions = (
    <div>
      <div className='c-other-options'>
        <p>{EN_STRINGS.REGISTER.HAVE_ACCOUNT}</p>
        <Link to='/login'>{EN_STRINGS.REGISTER.LOGIN}!</Link>
      </div>
    </div>
  );

  useEffect(() => {
    setValidInputs({
      firstName: {
        valid: false,
        message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
      },
      lastName: {
        valid: false,
        message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
      },
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
        buttonText={EN_STRINGS.REGISTER.REGISTER}
        otherOptions={otherOptions}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default RegisterForm;
