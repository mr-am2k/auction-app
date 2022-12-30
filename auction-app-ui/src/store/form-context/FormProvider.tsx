import { useState } from 'react';

import FormContext from './form-context';

import EN_STRINGS from 'translation/en';
import { isEmptyString } from 'util/stringUtils';

type Props = {
  children?: React.ReactNode;
};

const FormProvider: React.FC<Props> = ({ children }) => {
  const [fieldValues, setFieldValues] = useState<any>({});
  const [fieldValidationResults, setFieldValidationResults] = useState<any>({});
  const [isValid, setIsValid] = useState(true);
  const [additionalFieldsInfo, setAdditionalFieldsInfo] = useState<any>({});

  const resetFieldValues = () => {
    setFieldValues({});
  };

  const validateSingleField = (
    name: string,
    value: string | undefined,
    pattern?: string | undefined,
    required?: boolean | undefined,
    validator?: (param: string) => void
  ) => {
    if (!required && !validator) {
      return {
        valid: true,
      };
    }

    if (value === undefined || !isEmptyString(value)) {
      if (required) {
        return {
          valid: false,
          message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
        };
      }
    }

    if (pattern !== undefined && validator !== undefined) {
      return validator(value!);
    }

    if (validator !== undefined && value!.length > 0) {
      return validator(value!);
    }

    return { valid: true };
  };

  const validateForm = () => {
    let invalidForm = false;
    let validInputsObject: any = {};

    type FormValuesObjectKey = keyof typeof fieldValues;
    type ValidInputsObjectKey = keyof typeof validInputsObject;
    type AdditionalFieldsObjectKey = keyof typeof additionalFieldsInfo;

    const validInputsKeys = Object.keys(fieldValidationResults);

    validInputsKeys.forEach((key) => {
      validInputsObject = {
        ...validInputsObject,
        [key]: validateSingleField(
          key,
          fieldValues[key as FormValuesObjectKey]
            ? fieldValues[key as FormValuesObjectKey]
            : '',
          additionalFieldsInfo[key as AdditionalFieldsObjectKey]?.patter,
          additionalFieldsInfo[key as AdditionalFieldsObjectKey]?.required,
          additionalFieldsInfo[key as AdditionalFieldsObjectKey]?.validator
        ),
      };
    });

    setFieldValidationResults(validInputsObject);
    validInputsKeys.forEach((key) => {
      if (!validInputsObject[key as ValidInputsObjectKey]?.valid) {
        setIsValid(false);
        invalidForm = true;
        return;
      }
    });

    if (invalidForm) {
      return false;
    }

    setIsValid(true);
    return true;
  };

  return (
    <FormContext.Provider
      value={{
        fieldValues,
        setFieldValues,
        fieldValidationResults,
        setFieldValidationResults,
        validateSingleField,
        isValid,
        validateForm,
        additionalFieldsInfo,
        setAdditionalFieldsInfo,
        resetFieldValues,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
