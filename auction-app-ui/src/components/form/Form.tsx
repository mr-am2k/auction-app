import { useForm } from 'hooks/useForm';

import FormContext from 'store/form-context/form-context';

import './form.scss';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  primaryActionLabel: string;
  errorMessage: JSX.Element | string;
  otherOptions?: JSX.Element;
};

export const Form: React.FC<Props> = ({
  children,
  onSubmit,
  primaryActionLabel,
  otherOptions,
  errorMessage,
}) => {
  const {
    fieldValues,
    setFieldValues,
    fieldValidationResults,
    setFieldValidationResults,
    validateSingleField,
    isValid,
    validateForm,
    additionalFieldsInfo,
    setAdditionalFieldsInfo,
  } = useForm();

  return (
    <div className='c-form-component'>
      <form className='c-form'>
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
          }}
        >
          {children}
        </FormContext.Provider>

        {errorMessage}

        <button
          onClickCapture={validateForm}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {primaryActionLabel}
        </button>

        {otherOptions}
      </form>
    </div>
  );
};

export default Form;
