import { useState } from 'react';

import FormContext from './form-context';

import { FORM } from 'util/constants';
import EN_STRINGS from 'translation/en';
import { checkIfStringIsEmpty } from 'util/stringUtils';
import { validate as validateEmail } from 'validators/validateEmail';
import { validate as validatePassword } from 'validators/validatePassword';

type Props = {
  children?: React.ReactNode;
};

const FormProvider: React.FC<Props> = ({ children }) => {
  const [values, setValues] = useState({});
  const [validInputs, setValidInputs] = useState({});

  const validateSingleField = (
    name: string,
    value: string | undefined,
    pattern?: string | undefined
  ) => {
    if (!checkIfStringIsEmpty(value) || value === undefined) {
      setValidInputs({
        ...validInputs,
        [name]: {
          valid: false,
          message: EN_STRINGS.ERROR_MESSAGE.REQUIRED,
          displayed: true,
        },
      });

      return;
    }

    if (pattern !== undefined) {
      switch (pattern) {
        case FORM.EMAIL_PATTERN:
          setValidInputs({
            ...validInputs,
            [name]: validateEmail(value),
          });
          break;

        case FORM.PASSWORD_PATTERN:
          setValidInputs({
            ...validInputs,
            [name]: validatePassword(value),
          });
          break;
      }

      return;
    }

    setValidInputs({
      ...validInputs,
      [name]: { valid: true, displayed: true },
    });
  };

  return (
    <FormContext.Provider
      value={{
        values,
        setValues,
        validInputs,
        setValidInputs,
        validateSingleField,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
