import { SortingOption } from 'models/enum/sortingOption';

export type SearchProductRequest = {
  pageNumber: number;
  name?: string;
  categoryId?: string;
  subcategoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  productSort?: SortingOption;
};
