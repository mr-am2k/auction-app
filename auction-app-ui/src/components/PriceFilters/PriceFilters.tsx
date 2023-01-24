import { useEffect } from 'react';

import { useForm } from 'hooks/useForm';
import { useFilter } from 'hooks/useFilter';

import { Input } from 'components';
import { INPUT_TYPE_NUMBER, PRICE_FILTER } from 'util/constants';
import { PRICE_FILTERS } from 'translation/en';

import './price-filters.scss';

const PriceFilters = () => {
  const { fieldValues, setFieldValues } = useForm();
  const { searchFilterValues, setSearchFilterValues } = useFilter();

  const { minPrice, maxPrice } = fieldValues;
  const { minPrice: searchMinPrice, maxPrice: searchMaxPrice } = searchFilterValues;

  useEffect(() => {
    setSearchFilterValues({
      ...searchFilterValues,
      minPrice,
      maxPrice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValues]);

  useEffect(() => {
    setFieldValues({
      ...fieldValues,
      minPrice: searchMinPrice,
      maxPrice: searchMaxPrice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMinPrice, searchMaxPrice]);

  return (
    <div className='c-price-filters-wrapper'>
      <h4>{PRICE_FILTERS.PRICE_RANGE}</h4>
      <div className='c-input-fields'>
        <div className='c-input-field'>
          <Input
            key={PRICE_FILTER.MIN_PRICE}
            type={INPUT_TYPE_NUMBER}
            name={PRICE_FILTER.MIN_PRICE}
            placeholder={PRICE_FILTER.MIN_PRICE_PLACEHOLDER}
            value={minPrice || ''}
          />
        </div>

        <span>-</span>

        <div className='c-input-field'>
          <Input
            key={PRICE_FILTER.MAX_PRICE}
            type={INPUT_TYPE_NUMBER}
            name={PRICE_FILTER.MAX_PRICE}
            placeholder={PRICE_FILTER.MAX_PRICE_PLACEHOLDER}
            value={maxPrice || ''}
          />
        </div>
      </div>
      <div className='c-slider'></div>
    </div>
  );
};

export default PriceFilters;
