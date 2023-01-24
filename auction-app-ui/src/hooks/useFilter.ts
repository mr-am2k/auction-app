import { useContext } from 'react';
import FilterContext from 'store/filter-context/filter-context';

export const useFilter = () => useContext(FilterContext);
