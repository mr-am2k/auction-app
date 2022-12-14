import { Dispatch, SetStateAction, useState } from 'react';
import './input.scss';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  isEmpty: boolean;
  errorMessage: string;
  type:string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const Input: React.FC<Props> = ({
  placeholder,
  name,
  isEmpty,
  errorMessage,
  type,
  value,
  setValue,
}) => {
  const inputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{name}</p>

      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(e);
        }}
      />
      {isEmpty && <p>{errorMessage}</p>}
    </div>
  );
};

export default Input;
