import agent from 'lib/agent';
import { Category } from 'models/category';

const BASE_URL = '/categories';

const categoryService = {
  getCategories: () => agent.get<Category[]>(BASE_URL),
};

export default categoryService;
