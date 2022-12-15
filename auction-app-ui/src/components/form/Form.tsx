import { useForm } from 'hooks/useForm';

import FormContext from 'store/form-context/form-context';

import './form.scss';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  buttonText: string;
};

export const Form: React.FC<Props> = ({ children, onSubmit, buttonText }) => {
  const { formValues, setFormValues } = useForm();
  return (
    <div className='c-form-component'>
      <form className='c-form'>
        <FormContext.Provider value={{ formValues, setFormValues }}>
          {children}
        </FormContext.Provider>
        <button type='button' onClick={onSubmit}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Form;
