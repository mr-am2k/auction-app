import { Input, Form } from 'components/index';
import {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_PASSWORD,
  FORM,
  INPUT_TYPE_DATE,
  INPUT_TYPE_NUMBER,
} from 'util/constants';

import '../form/form.scss';

type Props = {
  children?: React.ReactNode;
  errorMessage: JSX.Element | string;
};

const CardForm: React.FC<Props> = ({ errorMessage }) => {
  const children = [
    <Input
      key={FORM.CARD}
      type={INPUT_TYPE_TEXT}
      name={FORM.CARD}
      title={FORM.CARD_TITLE}
      placeholder={FORM.CARD_PLACEHOLDER}
    />,

    <Input
      key={FORM.CARD_NUMBER}
      type={INPUT_TYPE_NUMBER}
      name={FORM.CARD_NUMBER}
      title={FORM.CARD_NUMBER_TITLE}
      placeholder={FORM.CARD_NUMBER_PLACEHOLDER}
    />,

    <Input
      key={FORM.CARD_EXPIRATION_DATE}
      type={INPUT_TYPE_DATE}
      name={FORM.CARD_EXPIRATION_DATE}
      title={FORM.CARD_EXPIRATION_DATE_TITLE}
      placeholder={FORM.EMAIL_PLACEHOLDER}
    />,
    <Input
      key={FORM.CARD_CVV}
      type={INPUT_TYPE_PASSWORD}
      name={FORM.CARD_CVV}
      title={FORM.CARD_CVV_TITLE}
      placeholder={FORM.CARD_CVV_PLACEHOLDER}
    />,
  ];

  return (
    <Form
      children={children}
      errorMessage={errorMessage}
    />
  );
};

export default CardForm;
