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

const AdminCategories = () => {
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubcategory, setAddSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

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

    categoryService.addCategory(createCategoryRequest).then(() => {
      fetchCategories();
      setFieldValues({});
      setAddCategory(false);
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
      </div>

      {selectedCategory && (
        <div className='c-admin-subcategories-manage'>
          <h4>{selectedCategory?.name}</h4>

          {subcategories.map((subcategory, index) => (
            <div className='c-admin-subcategory-element' key={index}>
              <p>{subcategory.name}</p>
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
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
