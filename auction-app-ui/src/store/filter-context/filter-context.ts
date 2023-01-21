import { SearchFilter } from 'models/request/search/searchFilter';
import { createContext } from 'react';

interface FilterInterface {
  searchFilterValues: SearchFilter;
  setSearchFilterValues: (filters: {}) => void;
}

const FilterContext = createContext<FilterInterface>({
  searchFilterValues: {},
  setSearchFilterValues: () => {},
});

export default FilterContext;
