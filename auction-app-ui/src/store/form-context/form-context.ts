import { registerForm } from 'models/registerForm';
import { createContext } from 'react';

interface FormContextInterface {
  formValues: registerForm;
  setFormValues: (values: {}) => void;
}

const FormContext = createContext<FormContextInterface>({
  formValues: {},
  setFormValues: () => {},
});

export default FormContext;
