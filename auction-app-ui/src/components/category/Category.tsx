import React from 'react';
import { Link } from 'react-router-dom';

import { useFilter } from 'hooks/useFilter';

import { ROUTES } from 'util/routes';

import './category.scss';

type Props = {
  children?: React.ReactNode;
  categoryName: string;
  categoryId: string;
};

const Category: React.FC<Props> = ({ categoryName, categoryId }) => {
  const { setSearchFilterValues } = useFilter();
  return (
    <div className='c-category-wrapper'>
      <Link to={ROUTES.SHOP}>
        <p onClick={() => setSearchFilterValues({ category: { name: categoryName, id: categoryId } })}>{categoryName}</p>
      </Link>
    </div>
  );
};

export default Category;
