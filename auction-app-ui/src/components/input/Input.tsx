import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useForm } from 'hooks/useForm';

import './input.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  name: string;
  type: string;
  title: string;
  pattern?: string;
  setValue: Dispatch<SetStateAction<{}>>;
  validator?: (param: string) => void;
};

const Input: React.FC<Props> = ({
  placeholder,
  name,
  type,
  title,
  pattern,
  setValue,
  validator,
}) => {
  type ObjectKey = keyof typeof validInputs;

  const { fieldValues, validInputs, setValidInputs, validateSingleField } =
    useForm();

  const inputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setValue({
      ...fieldValues,
      [name]: {
        value: value,
        pattern: pattern,
        validator: validator,
      },
    });
    setValidInputs({
      ...validInputs,
      [name]: validateSingleField(name, value, pattern, validator),
    });
  };

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{title}</p>

      <input
        className={classNames({
          'c-input-error':
            !validInputs[name as ObjectKey]?.valid &&
            validInputs[name as ObjectKey]?.message,
        })}
        placeholder={placeholder}
        type={type}
        name={name}
        pattern={pattern}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(event);
        }}
      />

      {!validInputs[name as ObjectKey]?.valid &&
        validInputs[name as ObjectKey]?.message && (
          <p>{validInputs[name as ObjectKey]!.message}</p>
        )}
    </div>
  );
};

export default Input;
