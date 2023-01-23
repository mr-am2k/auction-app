import { useEffect } from 'react';

import { useForm } from 'hooks/useForm';
import { useFilter } from 'hooks/useFilter';

import Dropdown from 'components/dropdown/Dropdown';
import { ProductSort, getSortingName } from 'models/enum/productSort';
import { Option } from 'models/option';
import { SHOP_HEADERS } from 'translation/en';
import { SORTING } from 'util/constants';

import './shop-headers.scss';

import GridIcon from 'assets/icons/GridIcon';
import { CloseIcon } from 'assets/icons';

const sortingOptions: Option[] = [
  { label: SHOP_HEADERS.DEFAULT_SORTING, value: getSortingName(ProductSort.DEFAULT) },
  { label: SHOP_HEADERS.NEWNESS, value: getSortingName(ProductSort.CREATED_DESC) },
  { label: SHOP_HEADERS.EXPIRATION, value: getSortingName(ProductSort.EXPIRATION_ASC) },
  { label: SHOP_HEADERS.CHEAPEST, value: getSortingName(ProductSort.PRICE_ASC) },
  { label: SHOP_HEADERS.MOST_EXPENSIVE, value: getSortingName(ProductSort.PRICE_DESC) },
];

const ShopHeaders = () => {
  const { fieldValues } = useForm();
  const { searchFilterValues, setSearchFilterValues } = useFilter();

  const handleCloseCategories = () => {
    setSearchFilterValues({ ...searchFilterValues, category: undefined, subcategories: undefined });
  };

  const handleClosePriceRange = () => {
    setSearchFilterValues({ ...searchFilterValues, minPrice: undefined, maxPrice: undefined });
  };

  const handleClearAll = () => {
    setSearchFilterValues({
      ...searchFilterValues,
      category: undefined,
      subcategories: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  useEffect(() => {
    setSearchFilterValues({ ...searchFilterValues, productSort: fieldValues[SORTING.SORTING] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValues[SORTING.SORTING]]);

  return (
    <div className='c-shop-headers-wrapper'>
      <div className='c-selected-filters'>
        {searchFilterValues.category && (
          <div className='c-selected-filter'>
            <h5>{SHOP_HEADERS.CATEGORY}</h5>

            <p>
              {searchFilterValues.category?.name}
              {searchFilterValues.subcategories?.map((subcategory, index) => (
                <span key={index}>/{subcategory.name}</span>
              ))}
              <span className='c-close-icon' onClick={handleCloseCategories}>
                <CloseIcon />
              </span>
            </p>
          </div>
        )}

        {(searchFilterValues.minPrice || searchFilterValues.maxPrice) && (
          <div className='c-selected-filter'>
            <h5>{SHOP_HEADERS.PRICE_RANGE}</h5>

            <p>
              <span>${searchFilterValues.minPrice ? searchFilterValues.minPrice : '0'}</span>
              <span>-</span>
              <span>${searchFilterValues.maxPrice ? searchFilterValues.maxPrice : '10000'}</span>
              <span className='c-close-icon' onClick={handleClosePriceRange}>
                <CloseIcon />
              </span>
            </p>
          </div>
        )}

        {(searchFilterValues.category || searchFilterValues.minPrice || searchFilterValues.maxPrice) && (
          <div className='c-clear-button'>
            <button onClick={handleClearAll}>
              {SHOP_HEADERS.CLEAR_ALL} <CloseIcon />
            </button>
          </div>
        )}
      </div>

      <div className='c-sorting-header'>
        <Dropdown name='sorting' options={sortingOptions} placeholder={SHOP_HEADERS.DEFAULT_SORTING} required={true} />
        <div className='c-view-type'>
          <GridIcon /> <p>{SHOP_HEADERS.GRID}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopHeaders;
