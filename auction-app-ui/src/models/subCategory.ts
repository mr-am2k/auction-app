import { Category } from './category';

export type SubCategory = {
  categoryId: string;
  name: string;
  subcategories: Category[];
};
