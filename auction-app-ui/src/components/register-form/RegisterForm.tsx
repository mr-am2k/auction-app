import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import EN_STRINGS from 'util/en_strings';
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
};

const RegisterForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { setValues, setValidInputs } = useForm();

  const children = [
    <Input
      key={FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      setValue={setValues}
      setValidInputs={setValidInputs}
      name={FORM.FIRST_NAME}
      title={FORM.FIRST_NAME_TITLE}
      placeholder={FORM.FIRST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      setValue={setValues}
      setValidInputs={setValidInputs}
      name={FORM.LAST_NAME}
      title={FORM.LAST_NAME_TITLE}
      placeholder={FORM.LAST_NAME_PLACEHOLDER}
    />,

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
      firstName: { valid: true },
      lastName: { valid: true },
      email: { valid: true },
      password: { valid: true },
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
