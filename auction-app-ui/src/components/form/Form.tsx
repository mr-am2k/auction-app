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
  const { formValues, setFormValues, formValidInputs } = useForm();
  return (
    <div className='c-form-component'>
      <form className='c-form'>
        <FormContext.Provider value={{ formValues, setFormValues, formValidInputs }}>
          {children}
        </FormContext.Provider>
        {errorMessage}
        <button type='button' onClick={onSubmit}>
          {buttonText}
        </button>
        {otherOptions}
      </form>
    </div>
  );
};

export default Form;
