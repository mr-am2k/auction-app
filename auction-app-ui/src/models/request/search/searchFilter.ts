import { ProductSort } from 'models/enum/productSort';

export type SearchFilter = {
  name?: string;
  categoryId?: string;
  subcategoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  productSort?: ProductSort;
};
