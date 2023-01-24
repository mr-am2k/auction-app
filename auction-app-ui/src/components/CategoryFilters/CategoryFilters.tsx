import React, { useEffect, useState } from 'react';

import { useFilter } from 'hooks/useFilter';

import categoryService from 'services/categoryService';

import { Categories } from 'models/categories';
import { organizeCategories } from 'util/categoryUtils';
import { CATEGORY_FILTERS } from 'translation/en';

import './category-filters.scss';

type CategoryShow = {
  id: number;
  active: boolean;
};

const CategoryFilters = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [displayCategories, setDisplayCategories] = useState<CategoryShow[]>([]);
  const { searchFilterValues, setSearchFilterValues } = useFilter();

  const fetchCategories = () => {
    categoryService.getCategories().then(categories => {
      const organizedCategories = organizeCategories(categories);

      setCategories(organizedCategories);

      const displayCategory: CategoryShow[] = [];

      organizedCategories.forEach((category, index) => {
        displayCategories.push({ id: index, active: false });
      });

      setDisplayCategories(displayCategory);
    });
  };

  const toggleShow = (index: number, show: boolean) => {
    let updatedDisplayCategories: CategoryShow[] = [];

    if (show) {
      updatedDisplayCategories = displayCategories.map(category => {
        return { ...category, active: category.id === index };
      });

      setSearchFilterValues({
        ...searchFilterValues,
        category: { name: categories[index].name, id: categories[index].categoryId },
        subcategories: undefined,
      });
    } else {
      updatedDisplayCategories = displayCategories.map(category => {
        return { ...category, active: false };
      });

      setSearchFilterValues({
        ...searchFilterValues,
        category: undefined,
        subcategories: undefined,
      });
    }

    setDisplayCategories(updatedDisplayCategories);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryIndex: number,
    subcategoryIndex: number,
    subcategoryId: string
  ) => {
    if (event.target.checked) {
      const previousSubcategories = searchFilterValues.subcategories || [];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchFilterValues.category) {
      const displayCategory: CategoryShow[] = [];

      categories.forEach((category, index) => {
        searchFilterValues.category!.id === category.categoryId ?
          displayCategory.push({ id: index, active: true }) :
          displayCategory.push({ id: index, active: false });
      });

      setDisplayCategories(displayCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilterValues.category, categories]);

  return (
    <div className='c-categories-wrapper'>
      <h4 className='c-categories-title'>{CATEGORY_FILTERS.PRODUCT_CATEGORIES}</h4>
      <div className='c-categories-list'>
        {categories.map((category, index) => (
          <div key={index}>
            <h4 className='c-category' key={category.categoryId}>
              {category.name}
              {displayCategories[index]?.active ? (
                <span onClick={() => toggleShow(index, false)}>-</span>
              ) : (
                <span onClick={() => toggleShow(index, true)}>+</span>
              )}
            </h4>

            {displayCategories[index]?.active && (
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
