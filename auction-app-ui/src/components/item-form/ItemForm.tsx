import Input from 'components/input/Input';
import './item-form.scss';
import { FORM, INPUT_TYPE_TEXT } from 'util/constants';
import Form from 'components/form/Form';
import { useForm } from 'hooks/useForm';
import { useState } from 'react';
import { Dropdown } from 'components';

const ItemForm = () => {
  const { fieldValues, fieldValidationResults, validateForm, setFieldValues } = useForm();
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setFieldValues({
      ...fieldValues,
      startDate: event.target.value,
    });
  };

  const nameInput = (
    <Input
      key={FORM.PRODUCT}
      type={INPUT_TYPE_TEXT}
      name={FORM.PRODUCT}
      title={FORM.PRODUCT_TITLE}
      placeholder={FORM.PRODUCT_PLACEHOLDER}
      required
    />
  );

  const response = () => {
    validateForm();
    console.log(fieldValues);
    console.log(fieldValidationResults);
  };
  return (
    <div className='c-item-form-wrapper'>
      <h3>ADD ITEM</h3>
      <Form children={nameInput} />
      <Dropdown
        options={[
          { value: 'Option 1', label: 'Option 1' },
          { value: 'Option 2', label: 'Option 2' },
          { value: 'Option 3', label: 'Option 3' },
        ]}
        value={selectedOption}
        placeholder={"Select category"}
        onChange={handleChange}
      />
      <button onClick={response}>Click me</button>
    </div>
  );
};

export default ItemForm;
