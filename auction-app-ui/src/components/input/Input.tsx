import { useEffect } from 'react';

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
  validator?: (param: string) => void;
};

const Input: React.FC<Props> = ({
  placeholder,
  name,
  type,
  title,
  pattern,
  validator,
}) => {
  type ObjectKey = keyof typeof fieldValidationResults;

  const {
    fieldValues,
    fieldValidationResults,
    additionalFieldsInfo,
    setFieldValues,
    setFieldValidationResults,
    validateSingleField,
    setAdditionalFieldsInfo,
  } = useForm();

  const inputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setFieldValues({
      ...fieldValues,
      [name]: value,
    });

    setAdditionalFieldsInfo({
      ...additionalFieldsInfo,
      [name]: {
        pattern,
        validator,
      },
    });

    setFieldValidationResults({
      ...fieldValidationResults,
      [name]: validateSingleField(
        name,
        value,
        additionalFieldsInfo[name]?.pattern,
        additionalFieldsInfo[name]?.validator
      ),
    });
  };

  useEffect(() => {
    setFieldValidationResults((prevValue: any) => {
      return {
        ...prevValue,
        [name]: {valid: true},
      };
    });

    setAdditionalFieldsInfo((prevValue: any) => {
      return {
        ...prevValue,
        [name]: {
          pattern,
          validator,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-text-input'>
      <p className='c-header-text'>{title}</p>

      <input
        className={classNames({
          'c-input-error':
            !fieldValidationResults[name as ObjectKey]?.valid &&
            fieldValidationResults[name as ObjectKey]?.message,
        })}
        placeholder={placeholder}
        type={type}
        name={name}
        pattern={pattern}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          inputFieldChange(event);
        }}
      />

      {!fieldValidationResults[name as ObjectKey]?.valid &&
        fieldValidationResults[name as ObjectKey]?.message && (
          <p>{fieldValidationResults[name as ObjectKey]!.message}</p>
        )}
    </div>
  );
};

export default Input;
