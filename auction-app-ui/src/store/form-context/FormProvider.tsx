import { useState } from 'react';

import FormContext from './form-context';

import EN_STRINGS from 'translation/en';
import { checkIfStringIsEmpty } from 'util/stringUtils';
import { FormValidInputs } from 'models/formValidInputs';
import { Form } from 'models/form';

type Props = {
  children?: React.ReactNode;
};

const FormProvider: React.FC<Props> = ({ children }) => {
  const [fieldValues, setFieldValues] = useState<Form>({});
  const [validInputs, setValidInputs] = useState<FormValidInputs>({});
  const [isValid, setIsValid] = useState(false);

  const validateSingleField = (
    name: string,
    value: string | undefined,
    pattern?: string | undefined,
    validator?: (param: string) => void
  ) => {
    if (!checkIfStringIsEmpty(value) || value === undefined) {
      return {
        valid: false,
        message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
        displayed: true,
      };
    }

    if (pattern !== undefined && validator !== undefined) {
      return validator(value);
    }

    return { valid: true, displayed: true };
  };

  const validateForm = () => {
    let invalidForm = false;
    let validInputsObject: FormValidInputs = {};

    type FormValuesObjectKey = keyof typeof fieldValues;
    type ValidInputsObjectKey = keyof typeof validInputsObject;
    const valuesKeys = Object.keys(fieldValues);
    const validInputsKeys = Object.keys(fieldValues);

    valuesKeys.forEach((key) => {
      validInputsObject = {
        ...validInputsObject,
        [key]: validateSingleField(
          key,
          fieldValues[key as FormValuesObjectKey]?.value,
          fieldValues[key as FormValuesObjectKey]?.pattern,
          fieldValues[key as FormValuesObjectKey]?.validator
        ),
      };
    });

    setValidInputs(validInputsObject);

    validInputsKeys.forEach((key) => {
      if (!validInputsObject[key as ValidInputsObjectKey]?.valid) {
        setIsValid(false);
        invalidForm = true;
        return;
      }
    });

    if (invalidForm) {
      return;
    }

    setIsValid(true);
  };

  return (
    <FormContext.Provider
      value={{
        fieldValues,
        setFieldValues,
        validInputs,
        setValidInputs,
        validateSingleField,
        isValid,
        validateForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
