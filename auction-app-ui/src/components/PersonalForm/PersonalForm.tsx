import { useForm } from 'hooks/useForm';

import { Input, Form } from '../index';
import { User } from 'models/user';
import { INPUT_TYPE_TEXT, USER_FORM, INPUT_TYPE_EMAIL, INPUT_TYPE_DATE, INPUT_TYPE_NUMBER } from 'util/constants';
import { validate as validateDateOfBirth } from 'validators/validateDateOfBirth';
import { validate as validatePhoneNumber } from 'validators/validatePhoneNumber';
import { USER } from 'translation/en';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
};

const PersonalForm: React.FC<Props> = ({ user }) => {
  const { fieldValues } = useForm();

  const children = [
    <Input
      key={USER_FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      name={USER_FORM.FIRST_NAME}
      title={USER.FIRST_NAME_TITLE}
      placeholder={user?.firstName ? user.firstName : USER_FORM.FIRST_NAME_PLACEHOLDER}
      value={fieldValues[USER_FORM.FIRST_NAME]}
    />,

    <Input
      key={USER_FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      name={USER_FORM.LAST_NAME}
      title={USER.LAST_NAME_TITLE}
      placeholder={user?.lastName ? user.lastName : USER_FORM.LAST_NAME_PLACEHOLDER}
      value={fieldValues[USER_FORM.LAST_NAME]}
    />,

    <Input
      key={USER_FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      name={USER_FORM.EMAIL}
      title={USER.EMAIL_TITLE}
      placeholder={user?.email ? user.email : USER_FORM.EMAIL_PLACEHOLDER}
      disabled
    />,

    <Input
      key={USER_FORM.DATE}
      type={INPUT_TYPE_DATE}
      name={USER_FORM.DATE}
      title={USER.DATE_TITLE}
      value={fieldValues[USER_FORM.DATE]}
      validator={validateDateOfBirth}
    />,

    <Input
      key={USER_FORM.PHONE_NUMBER}
      type={INPUT_TYPE_NUMBER}
      name={USER_FORM.PHONE_NUMBER}
      title={USER.PHONE_NUMBER_TITLE}
      placeholder={user?.phoneNumber ? user.phoneNumber : USER_FORM.PHONE_NUMBER_PLACEHOLDER}
      value={fieldValues[USER_FORM.PHONE_NUMBER]}
      validator={validatePhoneNumber}
    />,
  ];

  return (
    <div>
      <Form children={children} />
    </div>
  );
};

export default PersonalForm;
