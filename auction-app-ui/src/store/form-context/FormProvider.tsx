import { useState } from 'react';

import FormContext from './form-context';

type Props = {
  children?: React.ReactNode;
};

const FormProvider: React.FC<Props> = ({ children }) => {
  const [formValues, setFormValues] = useState({});

  const [formValidInputs, setFromValidInputs] = useState({});

  return (
    <FormContext.Provider
      value={{ formValues, setFormValues, formValidInputs }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
