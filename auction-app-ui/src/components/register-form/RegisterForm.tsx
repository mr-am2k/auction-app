import { Link } from 'react-router-dom';

import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import EN_STRINGS from 'util/en_strings';
import {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_PASSWORD,
} from 'util/constants';
import { FORM } from 'util/constants';
import { useEffect } from 'react';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const RegisterForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { formValues, setFormValues, setFormValidInputs } = useForm();

  const children = [
    <Input
      key={FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      setValue={setFormValues}
      setValidInputs={setFormValidInputs}
      name={FORM.FIRST_NAME}
      title={FORM.FIRST_NAME_TITLE}
      placeholder={FORM.FIRST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      setValue={setFormValues}
      setValidInputs={setFormValidInputs}
      name={FORM.LAST_NAME}
      title={FORM.LAST_NAME_TITLE}
      placeholder={FORM.LAST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      setValue={setFormValues}
      setValidInputs={setFormValidInputs}
      name={FORM.EMAIL}
      title={FORM.EMAIL_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
    />,

    <Input
      key={FORM.PASSWORD}
      type={INPUT_TYPE_PASSWORD}
      setValue={setFormValues}
      setValidInputs={setFormValidInputs}
      name={FORM.PASSWORD}
      title={FORM.PASSWORD_TITLE}
      placeholder={FORM.PASSWORD_PLACEHOLDER}
    />,
  ];

  const otherOptions = (
    <div>
      <div className='c-other-options'>
        <p>{EN_STRINGS.REGISTER.HAVE_ACCOUNT}</p>
        <Link to='/login'>{EN_STRINGS.REGISTER.LOGIN}</Link>
      </div>
    </div>
  );

  useEffect(() => {
    setFormValidInputs({
      firstName: { valid: false, message: 'This field is required' },
      lastName: { valid: false, message: 'This field is required' },
      email: { valid: false, message: 'This field is required' },
      password: { valid: false, message: 'This field is required' },
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
