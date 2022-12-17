import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'hooks/useForm';

import { FORM } from 'util/constants';
import { validateFields } from 'util/helperFunctions';

import './input.scss';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  type: string;
  title: string;
  setValue: Dispatch<SetStateAction<{}>>;
  setValidInputs: Dispatch<SetStateAction<{}>>;
};

const Input: React.FC<Props> = ({
  placeholder,
  name,
  type,
  title,
  setValue,
  setValidInputs,
}) => {
  type ObjectKey = keyof typeof formValidInputs;

  const { formValues, formValidInputs } = useForm();

  const inputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setValue({
      ...formValues,
      [name]: value,
    });

    if (name === FORM.EMAIL) {
      setValidInputs({
        ...formValidInputs,
        [name]: validateFields(value, FORM.EMAIL),
      });
    } else if (name === FORM.PASSWORD) {
      setValidInputs({
        ...formValidInputs,
        [name]: validateFields(value, FORM.PASSWORD),
      });
    } else {
      setValidInputs({
        ...formValidInputs,
        [name]: validateFields(value),
      });
    }
  };

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{title}</p>

      <input
        className={
          !formValidInputs[name as ObjectKey]?.valid ? 'c-input-error' : ''
        }
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(e);
        }}
      />
      {!formValidInputs[name as ObjectKey]?.valid ? (
        <p>{formValidInputs[name as ObjectKey]?.message}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Input;
