import { Category } from './category';

export type Categories = {
  categoryId: string;
  name: string;
  subcategories: Category[];
};
