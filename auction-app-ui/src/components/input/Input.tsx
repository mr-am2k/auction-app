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
  type ObjectKey = keyof typeof validInputs;

  const { values, validInputs } = useForm();

  const inputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setValue({
      ...values,
      [name]: value,
    });

    if (name === FORM.EMAIL) {
      setValidInputs({
        ...validInputs,
        [name]: validateFields(value, FORM.EMAIL),
      });
    } else if (name === FORM.PASSWORD) {
      setValidInputs({
        ...validInputs,
        [name]: validateFields(value, FORM.PASSWORD),
      });
    } else {
      setValidInputs({
        ...validInputs,
        [name]: validateFields(value),
      });
    }
  };

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{title}</p>

      <input
        className={
          !validInputs[name as ObjectKey]?.valid ? 'c-input-error' : ''
        }
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(event);
        }}
      />

      {!validInputs[name as ObjectKey]?.valid ? (
        <p>{validInputs[name as ObjectKey]?.message}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Input;
