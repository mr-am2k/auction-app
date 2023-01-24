import { createContext } from 'react';
import { SearchFilter } from 'models/request/search/searchFilter';

interface FilterInterface {
  searchFilterValues: SearchFilter;
  setSearchFilterValues: (filters: {}) => void;
}

const FilterContext = createContext<FilterInterface>({
  searchFilterValues: {},
  setSearchFilterValues: () => {},
});

export default FilterContext;
