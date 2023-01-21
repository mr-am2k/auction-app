import { useEffect, useState } from 'react';
import './shop-filters.scss';
import { Categories } from 'models/categories';
import categoryService from 'services/categoryService';
import { organizeCategories } from 'util/categoryUtils';

const ShopFilters = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  const fetchCategories = () => {
    categoryService.getCategories().then(categories => {
      console.log(organizeCategories(categories));
    });
  };

  useEffect(() => {
    fetchCategories()
  })

  return <div>ShopFilters</div>;
};

export default ShopFilters;
