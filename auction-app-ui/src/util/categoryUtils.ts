import { SubCategory } from 'models/subCategory';
import { Category } from 'models/category';

export const organizeCategories = (categories: Category[]) => {
  const organizedCategories: SubCategory[] = [];

  for (const category of categories) {
    if (category.parentCategoryId === null) {
      organizedCategories.push({ categoryId: category.id, name: category.name, subcategories: [] });
    } else {
      for (const subcategory of organizedCategories) {
        if (subcategory.categoryId === category.parentCategoryId) {
          subcategory.subcategories.push({
            id: category.id,
            name: category.name,
            parentCategoryId: category.parentCategoryId,
            numberOfProducts: category.numberOfProducts,
          });
        }
      }
    }
  }
  return organizedCategories;
};
