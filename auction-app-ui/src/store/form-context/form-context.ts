import { createContext } from 'react';

import { FormValidInputs } from 'models/formValidInputs';
import { RegisterForm } from 'models/registerForm';

interface FormContextInterface {
  formValues: RegisterForm;
  setFormValues: (values: {}) => void;
  formValidInputs: FormValidInputs;
  setFormValidInputs: (values: {}) => void;
}

const FormContext = createContext<FormContextInterface>({
  formValues: {},
  setFormValues: () => {},
  formValidInputs: {},
  setFormValidInputs: () => {},
});

export default FormContext;
