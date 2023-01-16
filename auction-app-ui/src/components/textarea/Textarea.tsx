import { useEffect } from 'react';

import { useForm } from 'hooks/useForm';

import './textarea.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  maxLength: number;
  title: string;
  name: string;
  required: boolean;
  message: string;
  value?: string;
};

const Textarea: React.FC<Props> = ({ maxLength, title, name, required, message, value }) => {
  const { 
    fieldValues, 
    fieldValidationResults, 
    setFieldValues, 
    setFieldValidationResults, 
    setAdditionalFieldsInfo, 
    validateSingleField 
  } = useForm();

  type ObjectKey = keyof typeof fieldValidationResults;

  const hasError = !fieldValidationResults[name as ObjectKey]?.valid;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValues({
      ...fieldValues,
      [name]: event.target.value,
    });

    setFieldValidationResults({
      ...fieldValidationResults,
      [name]: validateSingleField(name, event.target.value, undefined, required),
    });
  };

  useEffect(() => {
    setFieldValidationResults((fieldValidationResults: any) => {
      return {
        ...fieldValidationResults,
        [name]: { valid: true },
      };
    });

    setAdditionalFieldsInfo((additionalFieldsInfo: any) => {
      return {
        ...additionalFieldsInfo,
        [name]: {
          required: required,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-textarea'>
      <p className='c-title'>{title}</p>

      <textarea
        className={classNames({
          'c-textarea-error': hasError,
        })}
        maxLength={maxLength}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event)}
      />

      <p className='c-message'>{message}</p>

      {hasError && <p className='c-error-message'>{fieldValidationResults[name as ObjectKey]?.message}</p>}
    </div>
  );
};

export default Textarea;
