import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import categoryService from 'services/categoryService';

import { useForm } from 'hooks/useForm';

import { Dropdown, ImageUploader, Textarea, Input, Form } from '../index';
import { PRODUCT_FORM, INPUT_TYPE_TEXT } from 'util/constants';
import { ROUTES } from 'util/routes';
import { Category } from 'models/category';
import { Option } from 'models/option';
import { EN_STRINGS, PRODUCT } from 'translation/en';

import './product-form.scss';

type Props = {
  children?: React.ReactNode;
  handleNextStep: () => void;
};

const ProductForm: React.FC<Props> = ({ handleNextStep }) => {
  const [allCategories, setAllCategories] = useState<Category[]>();
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [subCategoryOptions, setSubcategoryOptions] = useState<Option[]>([]);

  const { fieldValues } = useForm();

  const fetchCategories = () => {
    categoryService.getCategories().then(categories => {
      setAllCategories(categories);

      categories.forEach(category => {
        if (category.parentCategoryId === null) {
          const option: Option = {
            value: category.id,
            label: category.name,
          };

          setCategoryOptions(options => [...options, option]);
        }
      });
    });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubcategoryOptions([]);

    const availableOptions: Option[] = [];

    allCategories?.forEach(category => {
      if (category.parentCategoryId === event.target.value) {
        const option: Option = {
          value: category.id,
          label: category.name,
        };
        availableOptions.push(option);
      }
    });

    setSubcategoryOptions(availableOptions);
  };

  const nameInput = (
    <Input
      key={PRODUCT_FORM.PRODUCT}
      type={INPUT_TYPE_TEXT}
      name={PRODUCT_FORM.PRODUCT}
      title={PRODUCT.PRODUCT_TITLE}
      placeholder={PRODUCT_FORM.PRODUCT_PLACEHOLDER}
      value={fieldValues[PRODUCT_FORM.PRODUCT]}
      required
    />
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='c-item-form-wrapper'>
      <div className='c-item-form-part'>
        <h3>{EN_STRINGS.ITEM_FORM.ADD_ITEM}</h3>

        <Form children={nameInput} />

        <div className='c-select-category'>
          <Dropdown
            options={categoryOptions}
            name={PRODUCT_FORM.CATEGORY}
            placeholder={PRODUCT_FORM.CATEGORY_PLACEHOLDER}
            required={true}
            onChange={handleCategoryChange}
          />

          <Dropdown
            options={subCategoryOptions}
            name={PRODUCT_FORM.SUBCATEGORY}
            placeholder={PRODUCT_FORM.SUBCATEGORY_PLACEHOLDER}
            required={true}
          />
        </div>

        <Textarea
          maxLength={PRODUCT_FORM.TEXTAREA_MAX_LENGTH}
          title={PRODUCT.DESCRIPTION_TITLE}
          name={PRODUCT_FORM.DESCRIPTION}
          required={true}
          message={EN_STRINGS.ITEM_FORM.DESCRIPTION_MESSAGE}
          value={fieldValues[PRODUCT_FORM.DESCRIPTION]}
        />
      </div>

      <ImageUploader name={PRODUCT_FORM.IMAGES} value={fieldValues[PRODUCT_FORM.IMAGES] || []} />

      <div className='c-option-buttons'>
        <Link to={ROUTES.MY_ACCOUNT}>
          <button className='c-cancel-button c-default-button'>{EN_STRINGS.ITEM_FORM.CANCEL_BUTTON}</button>
        </Link>

        <button className='c-next-button c-default-button' onClick={handleNextStep}>
          {EN_STRINGS.ITEM_FORM.NEXT_BUTTON}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
