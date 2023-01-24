import { SortingOption } from 'models/enum/sortingOption';

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
  productSort?: SortingOption;
};
