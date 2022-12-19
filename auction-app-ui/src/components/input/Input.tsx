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
  displayError: boolean;
};

const Input: React.FC<Props> = ({
  placeholder,
  name,
  type,
  title,
  pattern,
  setValue,
  displayError,
}) => {
  type ObjectKey = keyof typeof validInputs;

  const { values, validInputs, validateSingleField } = useForm();
  const [errorDisplay, setErrorDisplay] = useState(false);

  const inputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setValue({
      ...values,
      [name]: value,
    });

    validateSingleField(name, value, pattern);
    setErrorDisplay(true);
  };

  useEffect(() => {
    if (displayError) {
      setErrorDisplay(true);
    }
  }, [displayError]);

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{title}</p>

      <input
        className={classNames({
          'c-input-error':
            !validInputs[name as ObjectKey]?.valid && errorDisplay,
        })}
        placeholder={placeholder}
        type={type}
        name={name}
        pattern={pattern}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(event);
        }}
      />

      {!validInputs[name as ObjectKey]?.valid && errorDisplay && (
        <p>{validInputs[name as ObjectKey]!.message}</p>
      )}
    </div>
  );
};

export default Input;
