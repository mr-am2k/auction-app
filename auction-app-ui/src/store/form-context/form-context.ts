import { createContext } from 'react';

import { FormValidInputs } from 'models/formValidInputs';
import { RegisterForm } from 'models/registerForm';

interface FormContextInterface {
  values: RegisterForm;
  setValues: (values: {}) => void;
  validInputs: FormValidInputs;
  setValidInputs: (values: {}) => void;
}

const FormContext = createContext<FormContextInterface>({
  values: {},
  setValues: () => {},
  validInputs: {},
  setValidInputs: () => {},
});

export default FormContext;
