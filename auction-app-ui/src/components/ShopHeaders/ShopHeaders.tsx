import { useEffect } from 'react';

import { useForm } from 'hooks/useForm';
import { useFilter } from 'hooks/useFilter';

import Dropdown from 'components/dropdown/Dropdown';
import { SortingOption, getSortingName } from 'models/enum/sortingOption';
import { Option } from 'models/option';
import { SHOP_HEADERS } from 'translation/en';
import { SHOP_HEADERS_PRICE, SORTING } from 'util/constants';

import './shop-headers.scss';

import classNames from 'classnames';

import { CloseIcon, GridIcon, ListOptionIcon } from 'assets/icons';

const sortingOptions: Option[] = [
  { label: SHOP_HEADERS.DEFAULT, value: getSortingName(SortingOption.DEFAULT) },
  { label: SHOP_HEADERS.NEWNESS, value: getSortingName(SortingOption.CREATED_DESC) },
  { label: SHOP_HEADERS.EXPIRATION, value: getSortingName(SortingOption.EXPIRATION_ASC) },
  { label: SHOP_HEADERS.CHEAPEST, value: getSortingName(SortingOption.PRICE_ASC) },
  { label: SHOP_HEADERS.MOST_EXPENSIVE, value: getSortingName(SortingOption.PRICE_DESC) },
];

type Props = {
  children?: React.ReactNode;
  gridViewActive: boolean;
  setGridViewActive: (value: boolean) => void;
};

const ShopHeaders: React.FC<Props> = ({ gridViewActive, setGridViewActive }) => {
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

  const isFilteredByPrice = () => {
    return searchFilterValues.minPrice || searchFilterValues.maxPrice;
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

        {isFilteredByPrice() && (
          <div className='c-selected-filter'>
            <h5>{SHOP_HEADERS.PRICE_RANGE}</h5>

            <p>
              <span>${searchFilterValues.minPrice || SHOP_HEADERS_PRICE.MIN_PRICE}</span>
              <span>-</span>
              <span>${searchFilterValues.maxPrice || SHOP_HEADERS_PRICE.MAX_PRICE}</span>
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
        <Dropdown name='sorting' options={sortingOptions} placeholder={SHOP_HEADERS.DEFAULT} required={true} />
        <div className='c-view-type'>
          <span
            onClick={() => setGridViewActive(true)}
            className={classNames({
              'c-view--active': gridViewActive,
            })}
          >
            <GridIcon isActive={gridViewActive} /> <p>{SHOP_HEADERS.GRID}</p>
          </span>

          <span
            onClick={() => setGridViewActive(false)}
            className={classNames({
              'c-view--active': !gridViewActive,
            })}
          >
            <ListOptionIcon isActive={!gridViewActive} /> <p>{SHOP_HEADERS.LIST}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopHeaders;
