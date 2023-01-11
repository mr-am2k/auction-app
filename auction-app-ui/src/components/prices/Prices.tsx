import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'hooks/useForm';

import { Form, Input } from '../index';
import {
  PRODUCT_FORM,
  INPUT_TYPE_DATE,
  INPUT_TYPE_NUMBER,
} from 'util/constants';
import { ROUTES } from 'util/routes';
import { validate as validateProductStartPrice } from 'validators/validateProductStartPrice';
import { validate as validateDateIsInPast } from 'validators/validateDateIsInPast';
import { EN_STRINGS, PRODUCT } from 'translation/en';

import './prices.scss';
import 'scss/settings.scss';

type Props = {
  children?: React.ReactNode;
  handleNextStep: () => void;
  handleBackStep: () => void;
};

const Prices: React.FC<Props> = ({ handleNextStep, handleBackStep }) => {
  const { fieldValues } = useForm();

  const children = [
    <Input
      key={PRODUCT_FORM.PRICE}
      type={INPUT_TYPE_NUMBER}
      name={PRODUCT_FORM.PRICE}
      title={PRODUCT.PRICE_TITLE}
      placeholder={PRODUCT_FORM.PRICE_PLACEHOLDER}
      validator={validateProductStartPrice}
      value={fieldValues[PRODUCT_FORM.PRICE]}
      required
    />,

    <Input
      key={PRODUCT_FORM.START_DATE}
      type={INPUT_TYPE_DATE}
      name={PRODUCT_FORM.START_DATE}
      title={PRODUCT.START_DATE_TITLE}
      validator={validateDateIsInPast}
      value={fieldValues[PRODUCT_FORM.START_DATE]}
      required
    />,

    <Input
      key={PRODUCT_FORM.END_DATE}
      type={INPUT_TYPE_DATE}
      name={PRODUCT_FORM.END_DATE}
      title={PRODUCT.END_DATE_TITLE}
      optionalValidator={fieldValues[PRODUCT_FORM.START_DATE]}
      validator={validateDateIsInPast}
      value={fieldValues[PRODUCT_FORM.END_DATE]}
      required
    />,
  ];

  return (
    <div className='c-prices-page'>
      <h3>{EN_STRINGS.PRICES_FORM.SET_PRICES}</h3>

      <Form children={children} />
      <p>{EN_STRINGS.PRICES_FORM.MESSAGE}</p>

      <div className='c-prices-buttons'>
        <Link to={ROUTES.MY_ACCOUNT}>
          <button>{EN_STRINGS.PRICES_FORM.CANCEL_BUTTON}</button>
        </Link>

        <div className='c-control-buttons'>
          <button className='c-default-button' onClick={handleBackStep}>
            {EN_STRINGS.PRICES_FORM.BACK_BUTTON}
          </button>

          <button
            className='c-next-button c-default-button'
            onClick={handleNextStep}
          >
            {EN_STRINGS.PRICES_FORM.NEXT_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prices;
