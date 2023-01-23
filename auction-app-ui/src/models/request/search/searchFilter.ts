import { ProductSort } from 'models/enum/productSort';

type Category = {
  name: string;
  id: string;
}

export type SearchFilter = {
  name?: string;
  category?: Category;
  subcategories?: Category[];
  minPrice?: number;
  maxPrice?: number;
  productSort?: ProductSort;
};
