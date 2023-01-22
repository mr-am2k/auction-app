import { Input } from 'components';
import './price-filters.scss';
import { INPUT_TYPE_NUMBER, PRICE_FILTER } from 'util/constants';
import { useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import { PRICE_FILTERS } from 'translation/en';
import { useFilter } from 'hooks/useFilter';

const PriceFilters = () => {
  const { fieldValues } = useForm();
  const { searchFilterValues, setSearchFilterValues } = useFilter();

  useEffect(() => {
    setSearchFilterValues({
      ...searchFilterValues,
      minPrice: fieldValues[PRICE_FILTER.MIN_PRICE],
      maxPrice: fieldValues[PRICE_FILTER.MAX_PRICE],
    });
  }, [fieldValues]);

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
          />
        </div>
        <span>-</span>
        <div className='c-input-field'>
          <Input
            key={PRICE_FILTER.MAX_PRICE}
            type={INPUT_TYPE_NUMBER}
            name={PRICE_FILTER.MAX_PRICE}
            placeholder={PRICE_FILTER.MAX_PRICE_PLACEHOLDER}
          />
        </div>
      </div>
      <div className='c-slider'>
      </div>
    </div>
  );
};

export default PriceFilters;
