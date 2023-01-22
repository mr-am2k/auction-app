import { Categories } from 'models/categories';
import { Category } from 'models/category';

export const organizeCategories = (categories: Category[]) => {
  const organizedCategories: Categories[] = [];

  for (const category of categories) {
    if (category.parentCategoryId === null) {
      const newCategory: Categories = {
        categoryId: category.id,
        name: category.name,
        subcategories: [],
      };

      organizedCategories.push(newCategory);
    } else {
      for (const subcategory of organizedCategories) {
        if (subcategory.categoryId === category.parentCategoryId) {
          const newSubcategory: Category = {
            id: category.id,
            name: category.name,
            numberOfProducts: category.numberOfProducts,
            parentCategoryId: category.parentCategoryId,
          };

          subcategory.subcategories.push(newSubcategory);
        }
      }
    }
  }
  return organizedCategories;
};
