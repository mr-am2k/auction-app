import { useState } from 'react';

import FilterContext from './filter-context';
import { SearchFilter } from 'models/request/search/searchFilter';

type Props = {
  children?: React.ReactNode;
};

const FilterProvider: React.FC<Props> = ({ children }) => {
  const [searchFilterValues, setSearchFilterValues] = useState<SearchFilter>({});

  return (
    <FilterContext.Provider
      value={{
        searchFilterValues,
        setSearchFilterValues,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
