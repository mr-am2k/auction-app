import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import EN_STRINGS from 'util/en_strings';
import { PASSWORD_TYPE, EMAIL_TYPE } from 'util/constants';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { setFormValues } = useForm();

  const children = [
    <Input
      key={EN_STRINGS.FORM.EMAIL}
      placeholder={EN_STRINGS.FORM.EMAIL_PLACEHOLDER}
      name={EN_STRINGS.FORM.EMAIL}
      type={EMAIL_TYPE}
      title={EN_STRINGS.FORM.EMAIL_TITLE}
      setValue={setFormValues}
    />,

    <Input
      key={EN_STRINGS.FORM.PASSWORD}
      placeholder={EN_STRINGS.FORM.PASSWORD_PLACEHOLDER}
      name={EN_STRINGS.FORM.PASSWORD}
      type={PASSWORD_TYPE}
      title={EN_STRINGS.FORM.PASSWORD_TITLE}
      setValue={setFormValues}
    />,
  ];
  return (
    <div>
      <Form
        children={children}
        onSubmit={onSubmit}
        buttonText={EN_STRINGS.LOGIN.LOGIN}
      />
    </div>
  );
};

export default LoginForm;
