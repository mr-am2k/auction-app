import { useForm } from 'hooks/useForm';

import {Input, Form} from 'components/index'
import EN_STRINGS from 'util/en_strings';
import { TEXT_TYPE, PASSWORD_TYPE, EMAIL_TYPE } from 'util/constants';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
};

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const { setFormValues } = useForm();
  const children = [
    <Input
      key={EN_STRINGS.FORM.FIRST_NAME}
      placeholder={EN_STRINGS.FORM.FIRST_NAME_PLACEHOLDER}
      name={EN_STRINGS.FORM.FIRST_NAME}
      type={TEXT_TYPE}
      title={EN_STRINGS.FORM.FIRST_NAME_TITLE}
      setValue={setFormValues}
    />,

    <Input
      key={EN_STRINGS.FORM.LAST_NAME}
      placeholder={EN_STRINGS.FORM.LAST_NAME_PLACEHOLDER}
      name={EN_STRINGS.FORM.LAST_NAME}
      type={TEXT_TYPE}
      title={EN_STRINGS.FORM.LAST_NAME_TITLE}
      setValue={setFormValues}
    />,

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
        buttonText={EN_STRINGS.REGISTER.REGISTER}
      />
    </div>
  );
};

export default RegisterForm;
