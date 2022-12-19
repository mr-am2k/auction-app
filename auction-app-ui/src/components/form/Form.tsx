import { useForm } from 'hooks/useForm';

import FormContext from 'store/form-context/form-context';

import './form.scss';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  buttonText: string;
  errorMessage: JSX.Element | string;
  otherOptions?: JSX.Element;
};

export const Form: React.FC<Props> = ({
  children,
  onSubmit,
  buttonText,
  otherOptions,
  errorMessage,
}) => {
  const {
    values,
    setValues,
    validInputs,
    setValidInputs,
    validateSingleField,
  } = useForm();

  return (
    <div className='c-form-component'>
      <form className='c-form'>
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

        {errorMessage}

        <button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {buttonText}
        </button>

        {otherOptions}
      </form>
    </div>
  );
};

export default Form;
