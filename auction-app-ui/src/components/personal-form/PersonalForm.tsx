import { Input, Form } from 'components/index';
import {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_PASSWORD,
  FORM,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_DATE,
} from 'util/constants';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  errorMessage: JSX.Element | string;
};

const PersonalForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const children = [
    <Input
      key={FORM.FIRST_NAME}
      type={INPUT_TYPE_TEXT}
      name={FORM.FIRST_NAME}
      title={FORM.FIRST_NAME_TITLE}
      placeholder={FORM.FIRST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.LAST_NAME}
      type={INPUT_TYPE_TEXT}
      name={FORM.LAST_NAME}
      title={FORM.LAST_NAME_TITLE}
      placeholder={FORM.LAST_NAME_PLACEHOLDER}
    />,

    <Input
      key={FORM.EMAIL}
      type={INPUT_TYPE_EMAIL}
      name={FORM.EMAIL}
      title={FORM.EMAIL_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
    />,

    <Input
      key={FORM.DATE}
      type={INPUT_TYPE_DATE}
      name={FORM.DATE}
      title={FORM.DATE_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
    />,

    <Input
      key={FORM.PHONE_NUMBER}
      type={INPUT_TYPE_TEXT}
      name={FORM.PHONE_NUMBER}
      title={FORM.PHONE_NUMBER_TITLE}
      placeholder={FORM.PHONE_NUMBER_PLACEHOLDER}
    />,
  ];

  return (
    <div>
      <Form
        children={children}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default PersonalForm;
