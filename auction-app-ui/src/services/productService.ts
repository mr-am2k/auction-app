import { Product } from 'models/product';
import agent from 'lib/agent';

const BASE_URL = '/products';

const productsService = {
  getAll: () => agent.get<Product[]>(BASE_URL),
  getSingleProduct: (id: string) => agent.get<Product>(`${BASE_URL}/${id}`),
  getRandomProduct: () => agent.get<any>(`${BASE_URL}/random`),
  search: (queryParam: string) =>
    agent.get<any>(`${BASE_URL}/search?criteria=${queryParam}`),
  getProductsForUse: () => agent.get<Product[]>(`${BASE_URL}/user-products`),
};

export default productsService;
