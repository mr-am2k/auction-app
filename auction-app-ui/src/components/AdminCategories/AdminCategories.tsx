import { useEffect, useState } from 'react';

import { useForm } from 'hooks/useForm';

import categoryService from 'services/categoryService';

import { Input } from 'components';
import { SubCategory } from 'models/subCategory';
import { CreateCategoryRequest } from 'models/request/create/createCategoryRequest';
import { Category } from 'models/category';
import { organizeCategories } from 'util/categoryUtils';
import { INPUT_TYPE_TEXT, MY_ACCOUNT_ADMIN } from 'util/constants';
import { ADMIN_MY_ACCOUNT } from 'translation/en';

import './admin-categories.scss';

import { CloseIcon } from 'assets/icons';

type CategoryError = {
  type: string;
  message: string;
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubcategory, setAddSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [errorMessage, setErrorMessage] = useState<CategoryError>();

  const { fieldValues, setFieldValues } = useForm();

  const fetchCategories = () => {
    categoryService.getCategories().then(categories => {
      const organizedCategories = organizeCategories(categories);

      setCategories(organizedCategories);
    });
  };

  const handleCategorySelect = (category: SubCategory) => {
    const choseCategory: Category = {
      id: category.categoryId,
      name: category.name,
    };

    setSubcategories(category.subcategories);

    setSelectedCategory(choseCategory);
  };

  const handleAddCategory = () => {
    const { category } = fieldValues;

    const createCategoryRequest: CreateCategoryRequest = {
      name: category,
      parentCategoryId: null,
    };

    categoryService.addCategory(createCategoryRequest).then(response => {
      fetchCategories();
      setFieldValues({});
      setAddCategory(false);
      setErrorMessage(undefined);
    });
  };

  const handleAddSubcategory = (category: Category) => {
    const { subcategory } = fieldValues;

    const createCategoryRequest: CreateCategoryRequest = {
      name: subcategory,
      parentCategoryId: category.id,
    };

    categoryService.addCategory(createCategoryRequest).then(createdCategory => {
      const updatedCategories = categories.map(c => {
        if (c.categoryId === category.id) {
          c.subcategories.push(createdCategory);
          return c;
        }

        return c;
      });

      setCategories(updatedCategories);
      setFieldValues({});
      setAddSubcategory(false);
      setErrorMessage(undefined);
    });
  };

  const handleCategoryRemove = (categoryId: string, category: boolean, parentCategoryId?: string) => {
    categoryService
      .deleteCategory(categoryId)
      .then(() => {
        fetchCategories();
        if (!category) {
          const parentCategory = categories.filter(category => category.categoryId === parentCategoryId);

          const updatedSubcategories = parentCategory[0].subcategories.filter(subcategory => subcategory.id !== categoryId);

          setSubcategories(updatedSubcategories);
          setErrorMessage(undefined);
        }
      })
      .catch(error => {
        setErrorMessage({
          type: category ? MY_ACCOUNT_ADMIN.CATEGORY : MY_ACCOUNT_ADMIN.SUBCATEGORY,
          message: error.response.data.message,
        });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='c-admin-categories-wrapper'>
      <div className='c-admin-categories-manage'>
        <h4>{ADMIN_MY_ACCOUNT.PRODUCT_CATEGORIES}</h4>

        {categories.map((category, index) => (
          <div className='c-admin-category-element' key={index}>
            <p onClick={() => handleCategorySelect(category)}>{category?.name}</p>
            <span onClick={() => handleCategoryRemove(category.categoryId, true)}>
              <CloseIcon />
            </span>
          </div>
        ))}

        <div className='c-admin-category-add'>
          {addCategory && (
            <div className='c-admin-category-add-input'>
              <Input
                key={MY_ACCOUNT_ADMIN.CATEGORY}
                type={INPUT_TYPE_TEXT}
                name={MY_ACCOUNT_ADMIN.CATEGORY}
                placeholder={MY_ACCOUNT_ADMIN.CATEGORY_PLACEHOLDER}
              />
              <span onClick={handleAddCategory}>+</span>
            </div>
          )}

          <p onClick={() => setAddCategory(prevCategory => !prevCategory)}>{ADMIN_MY_ACCOUNT.ADD_CATEGORY}</p>
        </div>

        {errorMessage?.type === MY_ACCOUNT_ADMIN.CATEGORY && (
          <div className='c-admin-categories-error'>
            <p>{errorMessage.message}</p>
          </div>
        )}
      </div>

      {selectedCategory && (
        <div className='c-admin-subcategories-manage'>
          <h4>{selectedCategory?.name}</h4>

          {subcategories.map((subcategory, index) => (
            <div className='c-admin-subcategory-element' key={index}>
              <p>{subcategory.name}</p>
              <span onClick={() => handleCategoryRemove(subcategory.id, false, subcategory.parentCategoryId!)}>
                <CloseIcon />
              </span>
            </div>
          ))}

          <div className='c-admin-subcategories-add'>
            {addSubcategory && (
              <div className='c-admin-subcategory-add-input'>
                <Input
                  key={MY_ACCOUNT_ADMIN.SUBCATEGORY}
                  type={INPUT_TYPE_TEXT}
                  name={MY_ACCOUNT_ADMIN.SUBCATEGORY}
                  placeholder={MY_ACCOUNT_ADMIN.CATEGORY_PLACEHOLDER}
                />
                <span onClick={() => handleAddSubcategory(selectedCategory)}>+</span>
              </div>
            )}

            <p onClick={() => setAddSubcategory(prevSubcategory => !prevSubcategory)}>{ADMIN_MY_ACCOUNT.ADD_CATEGORY}</p>
          </div>

          {errorMessage?.type === MY_ACCOUNT_ADMIN.SUBCATEGORY && (
            <div className='c-admin-categories-error'>
              <p>{errorMessage.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
