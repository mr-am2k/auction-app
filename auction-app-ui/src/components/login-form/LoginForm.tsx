import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import EN_STRINGS from 'util/en_strings';
import { FORM } from 'util/constants';
import { INPUT_TYPE_EMAIL, INPUT_TYPE_PASSWORD } from 'util/constants';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const LoginForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const { setFormValues, setFormValidInputs } = useForm();

  const children = [
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
