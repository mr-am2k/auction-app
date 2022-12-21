import { createContext } from 'react';

import { FormValidInputs } from 'models/formValidInputs';
import { Form } from 'models/form';

interface FormContextInterface {
  fieldValues: Form;
  setFieldValues: (values: {}) => void;
  validInputs: FormValidInputs;
  setValidInputs: (values: {}) => void;
  validateSingleField: (
    name: string,
    value: string | undefined,
    pattern?: string | undefined,
    validator?: (param: string) => void
  ) => void;
  isValid: boolean;
  validateForm: () => void;
}

const FormContext = createContext<FormContextInterface>({
  fieldValues: {},
  setFieldValues: () => {},
  validInputs: {},
  setValidInputs: () => {},
  validateSingleField: () => {},
  isValid: false,
  validateForm: () => {},
});

export default FormContext;
