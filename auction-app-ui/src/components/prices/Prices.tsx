
import React from 'react';

import './prices.scss';
import { Form, Input } from 'components';
import { FORM, INPUT_TYPE_DATE, INPUT_TYPE_NUMBER } from 'util/constants';
import { validate as validateStartPrice } from 'validators/validateStartPrice';
import { validate as validateStartDate } from 'validators/validateStartDate';
import { validate as validateEndDate } from 'validators/validateEndDate';

import EN_STRINGS from 'translation/en';
import { useForm } from 'hooks/useForm';

type Props = {
    children?: React.ReactNode;
    handleNext: () => void;
    handlePrevious: () => void;
  };
  

const Prices:React.FC<Props> = ({handleNext, handlePrevious}) => {

  const {fieldValues} = useForm();

  const children = [
    <Input
      key={FORM.PRICE}
      type={INPUT_TYPE_NUMBER}
      name={FORM.PRICE}
      title={FORM.PRICE_TITLE}
      placeholder={FORM.PRICE_PLACEHOLDER}
      validator={validateStartPrice}
      value={fieldValues[FORM.PRICE]}
      required
    />,

    <Input
      key={FORM.START_DATE}
      type={INPUT_TYPE_DATE}
      name={FORM.START_DATE}
      title={FORM.START_DATE_TITLE}
      placeholder={''}
      validator={validateStartDate}
      value={fieldValues[FORM.START_DATE]}
      required
    />,

    <Input
      key={FORM.END_DATE}
      type={INPUT_TYPE_DATE}
      name={FORM.END_DATE}
      title={FORM.END_DATE_TITLE}
      placeholder={''}
      optionalValidator={FORM.START_DATE}
      validator={validateEndDate}
      value={fieldValues[FORM.END_DATE]}
      required
    />,
  ];

  return (
    <div className='c-prices-page'>
      <h3>{EN_STRINGS.PRICES_FORM.SET_PRICES}</h3>

      <Form children={children} />
      <p>{EN_STRINGS.PRICES_FORM.MESSAGE}</p>

      <div className='c-prices-buttons'>
        <button>{EN_STRINGS.PRICES_FORM.CANCEL_BUTTON}</button>
        <div className='c-control-buttons'>
          <button onClick={handlePrevious}>{EN_STRINGS.PRICES_FORM.BACK_BUTTON}</button>
          <button className='c-next-button' onClick={handleNext}>
            {EN_STRINGS.PRICES_FORM.NEXT_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prices;
