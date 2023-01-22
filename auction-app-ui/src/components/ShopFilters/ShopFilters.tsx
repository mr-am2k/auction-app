import CategoryFilters from 'components/CategoryFilters/CategoryFilters';

import './shop-filters.scss';
import PriceFilters from 'components/PriceFilters/PriceFilters';

const ShopFilters = () => {
  return (
    <div className='c-shop-filters-wrapper'>
      <CategoryFilters />
      <PriceFilters />
    </div>
  );
};

export default ShopFilters;
