import agent from 'lib/agent';
import { Category } from 'models/category';
import { CreateCategoryRequest } from 'models/request/create/createCategoryRequest';

const BASE_URL = '/categories';

const categoryService = {
  getCategories: () => agent.get<Category[]>(BASE_URL),
  addCategory: (createCategoryRequest: CreateCategoryRequest) => agent.post<any>(BASE_URL, createCategoryRequest),
  deleteCategory: (categoryId: string) => agent.delete<any>(`${BASE_URL}/${categoryId}`),
};

export default categoryService;
