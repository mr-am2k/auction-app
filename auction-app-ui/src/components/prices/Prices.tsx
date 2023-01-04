import { useForm } from 'hooks/useForm';
import React from 'react';

import './prices.scss'

const Prices = () => {
  const { fieldValidationResults, fieldValues } = useForm();
  const handleChange = () => {
    console.log(fieldValidationResults, fieldValues);
  };
  return (
    <div className='c-prices-page'>
      <button onClick={handleChange}>Ispisi</button>
    </div>
  );
};

export default Prices;
