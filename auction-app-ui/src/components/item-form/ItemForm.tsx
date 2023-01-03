import { useEffect, useState } from 'react';

import categoryService from 'services/categoryService';

import { useForm } from 'hooks/useForm';

import { Dropdown, ImageUploader, Textarea } from 'components';
import Input from 'components/input/Input';
import Form from 'components/form/Form';
import { FORM, INPUT_TYPE_TEXT } from 'util/constants';
import { Category } from 'models/category';
import { Option } from 'models/option';

import './item-form.scss';
import EN_STRINGS from 'translation/en';

const ItemForm = () => {
  const { validateForm, fieldValidationResults, fieldValues } = useForm();

  const [allCategories, setAllCategories] = useState<Category[]>();
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [subCategoryOptions, setSubcategoryOptions] = useState<Option[]>([]);

  const getCategories = () => {
    categoryService.getCategories().then((categories) => {
      setAllCategories(categories);

      categories.forEach((category) => {
        if (category.parentCategoryId === null) {
          const option: Option = {
            value: category.id,
            label: category.name,
          };

          setCategoryOptions((prevValue) => [...prevValue, option]);
        }
      });
    });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    allCategories?.forEach((category) => {
      if (category.parentCategoryId === event.target.value) {
        const option: Option = {
          value: category.id,
          label: category.name,
        };

        setSubcategoryOptions((prevValue) => [...prevValue, option]);
      }
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='c-item-form-wrapper'>
      <div className='c-item-form-part'>
        <h3>{EN_STRINGS.ITEM_FORM.ADD_ITEM}</h3>

        <Form children={nameInput} />

        <div className='c-select-category'>
          <Dropdown
            options={categoryOptions}
            name={FORM.CATEGORY}
            placeholder={FORM.CATEGORY_PLACEHOLDER}
            required={true}
            onChange={handleCategoryChange}
          />
          <Dropdown
            options={subCategoryOptions}
            name={FORM.SUBCATEGORY}
            placeholder={FORM.SUBCATEGORY_PLACEHOLDER}
            required={true}
            onChange={() => {}}
          />
        </div>

        <Textarea
          maxLength={700}
          title={FORM.DESCRIPTION_TITLE}
          name={FORM.DESCRIPTION}
          required={true}
          message={EN_STRINGS.ITEM_FORM.DESCRIPTION_MESSAGE}
        />
      </div>

      <ImageUploader name='images'/>

      <button onClick={response}>Click me</button>
    </div>
  );
};

export default ItemForm;
