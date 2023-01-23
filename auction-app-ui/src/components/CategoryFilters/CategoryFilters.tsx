import React, { useEffect, useState } from 'react';

import { useFilter } from 'hooks/useFilter';

import categoryService from 'services/categoryService';

import { Categories } from 'models/categories';
import { organizeCategories } from 'util/categoryUtils';
import { CATEGORY_FILTERS } from 'translation/en';

import './category-filters.scss';

type CategoryShow = {
  id: number;
  state: boolean;
};

const CategoryFilters = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [displayCategories, setDisplayCategories] = useState<CategoryShow[]>([]);
  const { searchFilterValues, setSearchFilterValues } = useFilter();

  const fetchCategories = () => {
    categoryService.getCategories().then(categories => {
      const organizedCategories = organizeCategories(categories);

      setCategories(organizedCategories);

      let displayCategory: CategoryShow[] = [];

      for (let i = 0; i < organizedCategories.length; i++) {
        displayCategory.push({ id: i, state: false });
      }

      setDisplayCategories(displayCategory);
    });
  };

  const toggleShowSubcategories = (index: number) => {
    const updatedDisplayCategories = displayCategories.map(category =>
      category.id === index ? { ...category, state: true } : { ...category, state: false }
    );

    setSearchFilterValues({ ...searchFilterValues, category: { name: categories[index].name, id: categories[index].categoryId } });

    setDisplayCategories(updatedDisplayCategories);
  };

  const toggleHideSubcategories = (index: number) => {
    const updatedDisplayCategories = displayCategories.map(category =>
      category.id === index ? { ...category, state: false } : { ...category, state: false }
    );

    setSearchFilterValues({ ...searchFilterValues, categoryId: null, subcategoryIds: null });

    setDisplayCategories(updatedDisplayCategories);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryIndex: number,
    subcategoryIndex: number,
    subcategoryId: string
  ) => {
    if (event.target.checked) {
      const previousSubcategories = searchFilterValues.subcategories ? searchFilterValues.subcategories : [];

      setSearchFilterValues({
        ...searchFilterValues,
        subcategories: [
          ...previousSubcategories,
          {
            name: categories[categoryIndex].subcategories[subcategoryIndex].name,
            id: categories[categoryIndex].subcategories[subcategoryIndex].id,
          },
        ],
      });
    } else {
      const updatedSubcategories = searchFilterValues.subcategories?.filter(subcategory => subcategory.id !== subcategoryId);

      setSearchFilterValues({
        ...searchFilterValues,
        subcategories: updatedSubcategories,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!searchFilterValues.category) {
      let displayCategory: CategoryShow[] = [];

      for (let i = 0; i < categories.length; i++) {
        displayCategory.push({ id: i, state: false });
      }

      setDisplayCategories(displayCategory);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilterValues.category]);

  return (
    <div className='c-categories-wrapper'>
      <h4 className='c-categories-title'>{CATEGORY_FILTERS.PRODUCT_CATEGORIES}</h4>
      <div className='c-categories-list'>
        {categories.map((category, index) => (
          <div key={index}>
            <h4 className='c-category' key={category.categoryId}>
              {category.name}
              {displayCategories[index]?.state ? (
                <span onClick={() => toggleHideSubcategories(index)}>-</span>
              ) : (
                <span onClick={() => toggleShowSubcategories(index)}>+</span>
              )}
            </h4>
            {displayCategories[index]?.state && (
              <>
                {category.subcategories.map((subcategory, id) => (
                  <div className='c-subcategories' key={subcategory.id}>
                    <input type='checkbox' onChange={event => handleCheckboxChange(event, index, id, subcategory.id)} />
                    <p>{`${subcategory.name} (${subcategory.numberOfProducts})`}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
