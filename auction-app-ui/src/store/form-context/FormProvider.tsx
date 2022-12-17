import { useState } from 'react';

import FormContext from './form-context';

type Props = {
  children?: React.ReactNode;
};

const FormProvider: React.FC<Props> = ({ children }) => {
  const [values, setValues] = useState({});

  const [validInputs, setValidInputs] = useState({});

  return (
    <FormContext.Provider
      value={{ values, setValues, validInputs, setValidInputs }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
