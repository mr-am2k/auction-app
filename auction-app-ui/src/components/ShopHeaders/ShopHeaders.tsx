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

  useEffect(() => {
    setSearchFilterValues({ ...searchFilterValues, productSort: fieldValues[SORTING.SORTING] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValues[SORTING.SORTING]]);

  return (
    <div className='c-shop-headers-wrapper'>
      <div className='c-selected-filters'></div>
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
