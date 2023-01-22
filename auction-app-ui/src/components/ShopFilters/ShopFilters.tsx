import { useEffect, useState } from 'react';
import './shop-filters.scss';
import { Categories } from 'models/categories';
import categoryService from 'services/categoryService';
import { organizeCategories } from 'util/categoryUtils';
import { useFilter } from 'hooks/useFilter';

const ShopFilters = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const { searchFilterValues, setSearchFilterValues } = useFilter();

  const fetchCategories = () => {
    categoryService.getCategories().then(categories => {
      setCategories(organizeCategories(categories));
    });
  };

  useEffect(() => {
    fetchCategories();
  });

  return (
    <div>
      <button
        onClick={() => {
          setSearchFilterValues({ ...searchFilterValues, categoryId: categories[1].categoryId});
        }}
      >
        Click
      </button>
    </div>
  );
};

export default ShopFilters;
