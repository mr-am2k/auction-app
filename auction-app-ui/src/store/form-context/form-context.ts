import { createContext } from 'react';

import { FormValidInputs } from 'models/formValidInputs';
import { RegisterForm } from 'models/registerForm';

interface FormContextInterface {
  formValues: RegisterForm;
  setFormValues: (values: {}) => void;
  formValidInputs: FormValidInputs
}

const FormContext = createContext<FormContextInterface>({
  formValues: {},
  setFormValues: () => {},
  formValidInputs: {}
});

export default FormContext;
