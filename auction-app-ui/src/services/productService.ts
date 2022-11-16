import { Product } from 'models/product';
import agent from 'lib/agent';

const productsService = {
    getAll: () => agent.get<Product[]>('/products'),
    getSingleProduct: (id: string) => agent.get<Product>(`/products/${id}`),
    getRandomProduct: () => agent.get<Product>('/products/random'),
    search: (queryParam: string) =>
      agent.get<any>(`/products/search?criteria=${queryParam}`),
  };

export default productsService