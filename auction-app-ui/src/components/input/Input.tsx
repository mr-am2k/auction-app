import { useForm } from 'hooks/useForm';
import { Dispatch, SetStateAction } from 'react';

import './input.scss';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  type: string;
  title: string;
  setValue: Dispatch<SetStateAction<{}>>;
};

const Input: React.FC<Props> = ({
  placeholder,
  name,
  type,
  title,
  setValue,
}) => {
  const { formValues } = useForm();
  const inputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValue({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{title}</p>

      <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(e);
        }}
      />
    </div>
  );
};

export default Input;
