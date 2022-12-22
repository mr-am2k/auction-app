import { createContext } from 'react';

interface FormContextInterface {
  fieldValues: any;
  setFieldValues: (values: {}) => void;
  fieldValidationResults: any;
  setFieldValidationResults: (values: {}) => void;
  validateSingleField: (
    name: string,
    value: string | undefined,
    pattern?: string | undefined,
    validator?: (param: string) => void
  ) => void;
  isValid: boolean;
  validateForm: () => void;
  additionalFieldsInfo: any;
  setAdditionalFieldsInfo: (values: {}) => void;
}

const FormContext = createContext<FormContextInterface>({
  fieldValues: {},
  setFieldValues: () => {},
  fieldValidationResults: {},
  setFieldValidationResults: () => {},
  validateSingleField: () => {},
  isValid: false,
  validateForm: () => {},
  additionalFieldsInfo: {},
  setAdditionalFieldsInfo: () => {},
});

export default FormContext;
