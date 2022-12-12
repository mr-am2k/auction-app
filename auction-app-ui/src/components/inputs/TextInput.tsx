import e from 'express';
import { Dispatch, SetStateAction, useState } from 'react';
import './text-input.scss';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  isEmpty: boolean;
  errorMessage: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const TextInput: React.FC<Props> = ({ placeholder, name, isEmpty, errorMessage, setValue }) => {
  const inputFieldChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className='c-text-input'>
      <label>
        <p>{name}</p>
      </label>
      <input
        placeholder={placeholder}
        type='text'
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          inputFieldChange(e);
        }}
      />
      {isEmpty && <p>{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
