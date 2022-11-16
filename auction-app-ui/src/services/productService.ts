import axios from 'axios';
import { Product } from 'models/product';
import agent from 'lib/agent';

axios.defaults.baseURL = 'http://localhost:8080/api/v1/';

const productsService = {
    getAll: () => agent.get<Product[]>('/products'),
    getSingleProduct: (id: string) => agent.get<Product>(`/products/${id}`),
    getRandomProduct: () => agent.get<Product>('/products/random'),
    search: (queryParam: string) =>
      agent.get<any>(`/products/search?criteria=${queryParam}`),
  };

export default productsService