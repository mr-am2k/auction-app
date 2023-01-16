import { createContext } from 'react';

interface FormInterface {
  fieldValues: any;
  setFieldValues: (values: {}) => void;
  fieldValidationResults: any;
  setFieldValidationResults: (values: {}) => void;
  validateSingleField: (
    name: string,
    value: string | undefined,
    pattern?: string | undefined,
    required?: boolean | undefined,
    optionalValidator?: string | undefined,
    validator?: (param: string, param2?: string) => void
  ) => void;
  isValid: boolean;
  validateForm: () => boolean;
  additionalFieldsInfo: any;
  setAdditionalFieldsInfo: (values: {}) => void;
  resetFieldValues: () => void;
}

const FormContext = createContext<FormInterface>({
  fieldValues: {},
  setFieldValues: () => {},
  fieldValidationResults: {},
  setFieldValidationResults: () => {},
  validateSingleField: () => {},
  isValid: false,
  validateForm: () => true,
  additionalFieldsInfo: {},
  setAdditionalFieldsInfo: () => {},
  resetFieldValues: () => {},
});

export default FormContext;
