import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import { User } from 'models/user';
import {
  INPUT_TYPE_TEXT,
  INPUT_TYPE_PASSWORD,
  FORM,
  INPUT_TYPE_DATE,
  INPUT_TYPE_NUMBER,
} from 'util/constants';
import { validate as validateCardNumber } from 'validators/validateCardNumber';
import { validate as validateCardCVV } from 'validators/validateCardCVV';
import { validate as validateCardExpirationDate } from 'validators/validateCardExpirationDate';
import '../form/form.scss';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
  required?: boolean;
};

const CardForm: React.FC<Props> = ({ user, required }) => {
  const { fieldValues } = useForm();

  const children = [
    <Input
      key={FORM.CARD}
      type={INPUT_TYPE_TEXT}
      name={FORM.CARD}
      title={FORM.CARD_TITLE}
      placeholder={
        user?.card.holderName ? user.card.holderName : FORM.CARD_PLACEHOLDER
      }
      value={fieldValues[FORM.CARD]}
      required={required ? user?.card.holderName === null : undefined}
    />,

    <Input
      key={FORM.CARD_NUMBER}
      type={INPUT_TYPE_NUMBER}
      name={FORM.CARD_NUMBER}
      title={FORM.CARD_NUMBER_TITLE}
      placeholder={
        user?.card.number
          ? user.card.number.toString()
          : FORM.CARD_NUMBER_PLACEHOLDER
      }
      value={fieldValues[FORM.CARD_NUMBER]}
      required={required ? user?.card.number === null : undefined}
      validator={validateCardNumber}
    />,

    <Input
      key={FORM.CARD_EXPIRATION_DATE}
      type={INPUT_TYPE_DATE}
      name={FORM.CARD_EXPIRATION_DATE}
      title={FORM.CARD_EXPIRATION_DATE_TITLE}
      placeholder={''}
      value={fieldValues[FORM.CARD_EXPIRATION_DATE]}
      required={required ? user?.card.expirationDate === null : undefined}
      validator={validateCardExpirationDate}
    />,
    <Input
      key={FORM.CARD_CVV}
      type={INPUT_TYPE_PASSWORD}
      name={FORM.CARD_CVV}
      title={FORM.CARD_CVV_TITLE}
      placeholder={
        user?.card.verificationValue
          ? user.card.verificationValue.toString()
          : FORM.CARD_CVV_PLACEHOLDER
      }
      value={fieldValues[FORM.CARD_CVV]}
      required={required ? user?.card.verificationValue === null : undefined}
      validator={validateCardCVV}
    />,
  ];

  return <Form children={children} />;
};

export default CardForm;
