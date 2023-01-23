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

  useEffect(() => {
    setSearchFilterValues({
      ...searchFilterValues,
      minPrice: fieldValues[PRICE_FILTER.MIN_PRICE],
      maxPrice: fieldValues[PRICE_FILTER.MAX_PRICE],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValues]);

  useEffect(() => {
    setFieldValues({
      ...fieldValues,
      minPrice: searchFilterValues.minPrice ? searchFilterValues.minPrice : undefined,
      maxPrice: searchFilterValues.maxPrice ? searchFilterValues.maxPrice : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilterValues.minPrice, searchFilterValues.maxPrice]);

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
            value={fieldValues[PRICE_FILTER.MIN_PRICE] ? fieldValues[PRICE_FILTER.MIN_PRICE] : ''}
          />
        </div>

        <span>-</span>

        <div className='c-input-field'>
          <Input
            key={PRICE_FILTER.MAX_PRICE}
            type={INPUT_TYPE_NUMBER}
            name={PRICE_FILTER.MAX_PRICE}
            placeholder={PRICE_FILTER.MAX_PRICE_PLACEHOLDER}
            value={fieldValues[PRICE_FILTER.MAX_PRICE] ? fieldValues[PRICE_FILTER.MAX_PRICE] : ''}
          />
        </div>
      </div>
      <div className='c-slider'></div>
    </div>
  );
};

export default PriceFilters;
