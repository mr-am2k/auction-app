import { Input, Form } from 'components/index';
import { User } from 'models/user';
import {
  INPUT_TYPE_TEXT,
  FORM,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_DATE,
} from 'util/constants';
import { validate as validateDateOfBirth } from 'validators/validateDateOfBirth';

type Props = {
  children?: React.ReactNode;
  errorMessage: JSX.Element | string;
  user: User | undefined;
};

const PersonalForm: React.FC<Props> = ({ errorMessage, user }) => {
  const children = [
    <Input
      key={FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      name={FORM.FIRST_NAME}
      title={FORM.FIRST_NAME_TITLE}
      placeholder={
        user?.firstName ? user.firstName : FORM.FIRST_NAME_PLACEHOLDER
      }
    />,

    <Input
      key={FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      name={FORM.LAST_NAME}
      title={FORM.LAST_NAME_TITLE}
      placeholder={user?.lastName ? user.lastName : FORM.LAST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      name={FORM.EMAIL}
      title={FORM.EMAIL_TITLE}
      placeholder={user?.email ? user.email : FORM.EMAIL_PLACEHOLDER}
      disabled
    />,

    <Input
      key={FORM.DATE}
      type={INPUT_TYPE_DATE}
      name={FORM.DATE}
      title={FORM.DATE_TITLE}
      placeholder={''}
      validator={validateDateOfBirth}
    />,

    <Input
      key={FORM.PHONE_NUMBER}
      type={INPUT_TYPE_TEXT}
      name={FORM.PHONE_NUMBER}
      title={FORM.PHONE_NUMBER_TITLE}
      placeholder={
        user?.phoneNumber ? user.phoneNumber : FORM.PHONE_NUMBER_PLACEHOLDER
      }
    />,
  ];

  return (
    <div>
      <Form children={children} errorMessage={errorMessage} />
    </div>
  );
};

export default PersonalForm;
