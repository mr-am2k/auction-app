import { useContext } from 'react';
import FormContext from 'store/form-context/form-context';

export const useForm = () => useContext(FormContext);
