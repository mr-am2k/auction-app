import { ProductSort } from './enum/productSort';

export type Option = {
  value: string | undefined | ProductSort;
  label: string;
};
