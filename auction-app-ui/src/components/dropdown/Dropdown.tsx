import { useEffect, useState } from 'react';

import { useForm } from 'hooks/useForm';

import { Option } from 'models/option';
import { v4 } from 'uuid';

import './dropdown.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  name: string;
  options: Option[];
  placeholder: string;
  required: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown: React.FC<Props> = ({
  name,
  options,
  placeholder,
  required,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const {
    fieldValues,
    fieldValidationResults,
    additionalFieldsInfo,
    setFieldValues,
    setFieldValidationResults,
    setAdditionalFieldsInfo,
    validateSingleField,
  } = useForm();

  type ObjectKey = keyof typeof fieldValidationResults;

  const hasError = !fieldValidationResults[name as ObjectKey]?.valid;

  const onDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValues({
      ...fieldValues,
      [name]: event.target.value,
    });

    setSelectedOption(event.target.value);

    setFieldValidationResults({
      ...fieldValidationResults,
      [name]: validateSingleField(
        name,
        event.target.value,
        additionalFieldsInfo[name]?.pattern,
        required
      ),
    });

    if (onChange) {
      onChange(event);
    }
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
    <div className='c-dropdown-wrapper'>
      <select
        className={classNames({
          'c-dropdown': true,
          'c-dropdown-error-border': hasError,
        })}
        value={selectedOption ? selectedOption : placeholder}
        onChange={onDropdownChange}
      >
        <option disabled>{placeholder}</option>

        {options.map((option) => (
          <option className='c-option' key={v4()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <p className='c-dropdown-error-message'>
          {fieldValidationResults[name as ObjectKey]?.message}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
