import { useForm } from 'hooks/useForm';

import { Input, Form } from '../index';
import { User } from 'models/user';
import { INPUT_TYPE_TEXT, INPUT_TYPE_PASSWORD, CREDIT_CARD_FORM, INPUT_TYPE_DATE, INPUT_TYPE_NUMBER } from 'util/constants';
import { validate as validateCardNumber } from 'validators/validateCardNumber';
import { validate as validateCardCVV } from 'validators/validateCardCVV';
import { validate as validateCardExpirationDate } from 'validators/validateCardExpirationDate';
import { CREDIT_CARD } from 'translation/en';

import '../form/form.scss';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
  required?: boolean;
};

const CreditCardForm: React.FC<Props> = ({ user, required }) => {
  const { fieldValues } = useForm();

  const children = [
    <Input
      key={CREDIT_CARD_FORM.CREDIT_CARD_NAME}
      type={INPUT_TYPE_TEXT}
      name={CREDIT_CARD_FORM.CREDIT_CARD_NAME}
      title={CREDIT_CARD.CREDIT_CARD_NAME_TITLE}
      placeholder={user?.card?.holderFullName ? user.card.holderFullName : CREDIT_CARD_FORM.CREDIT_CARD_NAME_PLACEHOLDER}
      value={fieldValues[CREDIT_CARD_FORM.CREDIT_CARD_NAME]}
      required={required ? !user?.card?.holderFullName : false}
    />,

    <Input
      key={CREDIT_CARD_FORM.CREDIT_CARD_NUMBER}
      type={INPUT_TYPE_NUMBER}
      name={CREDIT_CARD_FORM.CREDIT_CARD_NUMBER}
      title={CREDIT_CARD.CREDIT_CARD_NUMBER_TITLE}
      placeholder={user?.card?.number ? user.card.number.toString() : CREDIT_CARD_FORM.CREDIT_CARD_NUMBER_PLACEHOLDER}
      value={fieldValues[CREDIT_CARD_FORM.CREDIT_CARD_NUMBER]}
      required={required ? !user?.card?.number : false}
      validator={validateCardNumber}
    />,

    <Input
      key={CREDIT_CARD_FORM.CREDIT_CARD_EXPIRATION_DATE}
      type={INPUT_TYPE_DATE}
      name={CREDIT_CARD_FORM.CREDIT_CARD_EXPIRATION_DATE}
      title={CREDIT_CARD.CREDIT_CARD_EXPIRATION_DATE_TITLE}
      value={fieldValues[CREDIT_CARD_FORM.CREDIT_CARD_EXPIRATION_DATE]}
      required={required ? !user?.card?.expirationDate : false}
      validator={validateCardExpirationDate}
    />,

    <Input
      key={CREDIT_CARD_FORM.CREDIT_CARD_CVV}
      type={INPUT_TYPE_PASSWORD}
      name={CREDIT_CARD_FORM.CREDIT_CARD_CVV}
      title={CREDIT_CARD.CREDIT_CARD_CVV_TITLE}
      placeholder={user?.card?.verificationValue ? user.card.verificationValue.toString() : CREDIT_CARD_FORM.CREDIT_CARD_CVV_PLACEHOLDER}
      value={fieldValues[CREDIT_CARD_FORM.CREDIT_CARD_CVV]}
      required={required ? !user?.card?.verificationValue : false}
      validator={validateCardCVV}
    />,
  ];

  return <Form children={children} />;
};

export default CreditCardForm;
