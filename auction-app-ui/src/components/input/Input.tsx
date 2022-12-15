import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'hooks/useForm';

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
  const [onChangeValidation, setOnChangeValidation] = useState(false);

  const inputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setValue({
      ...formValues,
      [name]: value,
    });

    setValidInputs({
      ...formValidInputs,
      [name]: validateFields(value),
    });

    setOnChangeValidation(true);
  };

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{title}</p>

      <input
        className={
          onChangeValidation && !formValidInputs[name as ObjectKey]?.valid
            ? 'c-input-error'
            : ''
        }
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(e);
        }}
      />
      {onChangeValidation && !formValidInputs[name as ObjectKey]?.valid ? (
        <p>{formValidInputs[name as ObjectKey]?.message}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Input;
