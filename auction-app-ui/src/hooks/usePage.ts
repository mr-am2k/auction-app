import { useContext } from 'react';
import PageContext from 'store/page-context/page-context';

export const usePage = () => useContext(PageContext);
